<?php
/**
 * Plastic Reuse Engine — PHP Backend
 * Deterministic rule-based analysis. Direct port from Python/FastAPI.
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") { http_response_code(200); exit; }
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["detail" => "Method not allowed"]);
    exit;
}

// ---- Constants ----
define("DISCLAIMER",
    "This tool provides an educational and engineering-oriented reuse recommendation " .
    "based on deterministic rules. It does not certify product safety, food safety, " .
    "structural integrity, or child-safe use. Any real-world manufacturing or reuse " .
    "process requires material validation and appropriate safety review."
);

$CONTAMINATION_PENALTIES = ["none" => 0, "low" => -5, "medium" => -15, "high" => -30];
$WASHABILITY_MODIFIERS    = ["yes" => 5, "no" => 0, "unknown" => 0];

$VERDICT_THRESHOLDS = [
    "REJECTED"           => [0,  24],
    "LIMITED_REUSE"      => [25, 49],
    "CONDITIONAL_REUSE"  => [50, 74],
    "GOOD_CANDIDATE"     => [75, 100],
];

$REUSE_COMPATIBILITY = [
    "modular_block"          => ["good" => 10, "moderate" => 0,  "poor" => -20, "very_poor" => -35, "unknown" => -20],
    "decorative_piece"       => ["good" => 8,  "moderate" => 5,  "poor" => -5,  "very_poor" => -15, "unknown" => -10],
    "non_structural_panel"   => ["good" => 8,  "moderate" => 3,  "poor" => -8,  "very_poor" => -20, "unknown" => -10],
    "filament_candidate"     => ["good" => 5,  "moderate" => 0,  "poor" => -15, "very_poor" => -30, "unknown" => -20],
    "experimental_prototype" => ["good" => 5,  "moderate" => 5,  "poor" => 0,   "very_poor" => -10, "unknown" => -5],
];

// ---- Plastic profiles ----
$PLASTICS = [
    "PET" => [
        "full_name" => "Polyethylene Terephthalate", "structural_score_base" => 45,
        "modular_block_suitability" => "poor", "decorative_suitability" => "moderate",
        "non_structural_panel_suitability" => "moderate", "filament_suitability" => "moderate",
        "experimental_prototype_suitability" => "moderate",
        "default_recommended_use" => "decorative_piece",
        "warnings" => ["PET degrades with repeated heat exposure", "Not suitable for food-contact reuse without certified processing", "Structural integrity decreases significantly after contamination"],
        "allowed_processes" => ["sorting", "washing", "shredding", "decorative_molding"],
    ],
    "HDPE" => [
        "full_name" => "High-Density Polyethylene", "structural_score_base" => 72,
        "modular_block_suitability" => "good", "decorative_suitability" => "good",
        "non_structural_panel_suitability" => "good", "filament_suitability" => "moderate",
        "experimental_prototype_suitability" => "good",
        "default_recommended_use" => "modular_block",
        "warnings" => ["Not suitable for food-contact reuse without certified processing", "Structural reliability not guaranteed for load-bearing applications"],
        "allowed_processes" => ["sorting", "washing", "shredding", "low_risk_remolding", "compression_molding"],
    ],
    "PVC" => [
        "full_name" => "Polyvinyl Chloride", "structural_score_base" => 20,
        "modular_block_suitability" => "very_poor", "decorative_suitability" => "poor",
        "non_structural_panel_suitability" => "poor", "filament_suitability" => "very_poor",
        "experimental_prototype_suitability" => "poor",
        "default_recommended_use" => "experimental_prototype",
        "warnings" => ["PVC releases toxic chlorine compounds when heated or burned", "Not recommended for any heat-based reuse process", "Requires specialized handling and disposal", "Not suitable for child-safe applications", "Avoid mixing with other plastics in reuse streams"],
        "allowed_processes" => ["sorting", "cold_forming_only"],
    ],
    "LDPE" => [
        "full_name" => "Low-Density Polyethylene", "structural_score_base" => 40,
        "modular_block_suitability" => "poor", "decorative_suitability" => "moderate",
        "non_structural_panel_suitability" => "moderate", "filament_suitability" => "poor",
        "experimental_prototype_suitability" => "moderate",
        "default_recommended_use" => "non_structural_panel",
        "warnings" => ["Low structural strength limits load-bearing applications", "Melts at relatively low temperatures", "Not suitable for structural or safety-critical reuse"],
        "allowed_processes" => ["sorting", "washing", "shredding", "sheet_pressing"],
    ],
    "PP" => [
        "full_name" => "Polypropylene", "structural_score_base" => 65,
        "modular_block_suitability" => "moderate", "decorative_suitability" => "good",
        "non_structural_panel_suitability" => "moderate", "filament_suitability" => "moderate",
        "experimental_prototype_suitability" => "good",
        "default_recommended_use" => "modular_block",
        "warnings" => ["Not suitable for food-contact reuse without certified processing", "Structural reliability not guaranteed for load-bearing applications"],
        "allowed_processes" => ["sorting", "washing", "shredding", "low_risk_remolding", "injection_prototype"],
    ],
    "PS" => [
        "full_name" => "Polystyrene", "structural_score_base" => 25,
        "modular_block_suitability" => "very_poor", "decorative_suitability" => "poor",
        "non_structural_panel_suitability" => "poor", "filament_suitability" => "very_poor",
        "experimental_prototype_suitability" => "poor",
        "default_recommended_use" => "experimental_prototype",
        "warnings" => ["PS is brittle and fractures easily under stress", "Releases styrene vapors when heated — requires ventilation", "Not suitable for structural applications", "Not recommended for child-safe applications"],
        "allowed_processes" => ["sorting", "cold_compaction", "experimental_only"],
    ],
    "OTHER" => [
        "full_name" => "Other / Mixed Plastic", "structural_score_base" => 30,
        "modular_block_suitability" => "poor", "decorative_suitability" => "poor",
        "non_structural_panel_suitability" => "poor", "filament_suitability" => "very_poor",
        "experimental_prototype_suitability" => "poor",
        "default_recommended_use" => "experimental_prototype",
        "warnings" => ["Mixed or unidentified plastic composition increases processing risk", "Unknown chemical additives may be present", "Not suitable for food-contact or child-safe applications"],
        "allowed_processes" => ["sorting", "experimental_only"],
    ],
    "UNKNOWN" => [
        "full_name" => "Unknown Plastic Type", "structural_score_base" => 20,
        "modular_block_suitability" => "very_poor", "decorative_suitability" => "very_poor",
        "non_structural_panel_suitability" => "very_poor", "filament_suitability" => "very_poor",
        "experimental_prototype_suitability" => "unknown",
        "default_recommended_use" => "experimental_prototype",
        "warnings" => ["Plastic type is unknown — all assessments are highly conservative", "Do not apply heat without material identification", "Unknown polymer composition significantly increases uncertainty", "Not suitable for any safety-critical application"],
        "allowed_processes" => ["sorting", "visual_identification_first"],
    ],
];

// ---- Input parsing ----
$plastic_type      = strtoupper(trim($_POST["plastic_type"] ?? "UNKNOWN"));
$source_type       = trim($_POST["source_type"] ?? "unknown");
$contamination     = strtolower(trim($_POST["contamination_level"] ?? "none"));
$washable          = strtolower(trim($_POST["washable"] ?? "unknown"));
$intended_reuse    = strtolower(trim($_POST["intended_reuse"] ?? "experimental_prototype"));
$notes             = trim($_POST["notes"] ?? "");
$image_received    = isset($_FILES["image"]) && $_FILES["image"]["error"] === UPLOAD_ERR_OK;

// Validate
$valid_plastics     = ["PET","HDPE","PVC","LDPE","PP","PS","OTHER","UNKNOWN"];
$valid_contamination = ["none","low","medium","high"];
$valid_washable     = ["yes","no","unknown"];
$valid_reuse        = ["modular_block","decorative_piece","non_structural_panel","filament_candidate","experimental_prototype"];

if (!in_array($plastic_type, $valid_plastics))     $plastic_type  = "UNKNOWN";
if (!in_array($contamination, $valid_contamination)) $contamination = "none";
if (!in_array($washable, $valid_washable))          $washable      = "unknown";
if (!in_array($intended_reuse, $valid_reuse))       $intended_reuse = "experimental_prototype";

// ---- Scoring ----
$profile = $PLASTICS[$plastic_type] ?? $PLASTICS["UNKNOWN"];
$score   = $profile["structural_score_base"];

$contamination_penalty  = $CONTAMINATION_PENALTIES[$contamination] ?? 0;
$score += $contamination_penalty;

$washability_modifier = $WASHABILITY_MODIFIERS[$washable] ?? 0;
if ($washable === "no" && in_array($contamination, ["medium","high"])) $washability_modifier = -10;
$score += $washability_modifier;

$suitability_key_map = [
    "modular_block"          => "modular_block_suitability",
    "decorative_piece"       => "decorative_suitability",
    "non_structural_panel"   => "non_structural_panel_suitability",
    "filament_candidate"     => "filament_suitability",
    "experimental_prototype" => "experimental_prototype_suitability",
];
$suitability_key = $suitability_key_map[$intended_reuse] ?? ($intended_reuse . "_suitability");
$suitability     = $profile[$suitability_key] ?? "unknown";
$reuse_map       = $REUSE_COMPATIBILITY[$intended_reuse] ?? [];
$reuse_modifier  = $reuse_map[$suitability] ?? ($reuse_map["unknown"] ?? -10);
$score += $reuse_modifier;

$score = max(0, min(100, $score));

// ---- Verdict ----
$verdict = "REJECTED";
foreach ($VERDICT_THRESHOLDS as $v => [$low, $high]) {
    if ($score >= $low && $score <= $high) { $verdict = $v; break; }
}

// ---- Reasons ----
$reasons = [];
$reasons[] = "{$plastic_type} has a base structural score of {$profile['structural_score_base']}/100 ({$profile['full_name']}).";
if ($contamination_penalty < 0)
    $reasons[] = ucfirst($contamination) . " contamination applies a {$contamination_penalty} point penalty to reuse viability.";
else
    $reasons[] = "No contamination detected — no penalty applied.";
if ($washability_modifier > 0)
    $reasons[] = "Item is washable, adding +{$washability_modifier} points to reuse readiness.";
elseif ($washable === "no" && in_array($contamination, ["medium","high"]))
    $reasons[] = "Item cannot be washed and has significant contamination, reducing reuse viability.";
else
    $reasons[] = "Washability is unknown — no bonus applied.";
if ($reuse_modifier > 0)
    $reasons[] = "{$plastic_type} has '{$suitability}' suitability for '{$intended_reuse}', adding +{$reuse_modifier} points.";
elseif ($reuse_modifier < 0)
    $reasons[] = "{$plastic_type} has '{$suitability}' suitability for '{$intended_reuse}', applying a {$reuse_modifier} point penalty.";
else
    $reasons[] = "{$plastic_type} has '{$suitability}' suitability for '{$intended_reuse}' — no modifier applied.";

// ---- Warnings ----
$warnings = $profile["warnings"];
$warnings[] = "Not suitable for food-contact use without specialized validation.";
$warnings[] = "Not recommended for child safety-critical applications without expert review.";
if ($contamination === "high")
    $warnings[] = "High contamination significantly reduces reuse viability and increases processing risk.";
if (in_array($contamination, ["medium","high"]) && $washable === "no")
    $warnings[] = "Item cannot be washed and has notable contamination — reuse is not recommended without decontamination.";
if ($plastic_type === "UNKNOWN")
    $warnings[] = "Unknown polymer composition increases uncertainty across all assessments.";
if ($intended_reuse === "modular_block")
    $warnings[] = "Modular block use requires tighter dimensional and mechanical reliability than this engine can verify.";
if ($intended_reuse === "filament_candidate")
    $warnings[] = "Filament production requires precise material characterization — do not attempt without proper equipment and testing.";
$warnings = array_values(array_unique($warnings));

// ---- Suggested process ----
$process = $profile["allowed_processes"];
if ($washable === "yes" && in_array($contamination, ["low","medium","high"]) && !in_array("washing", $process))
    array_splice($process, 1, 0, ["washing"]);
if ($score < 50) $process[] = "consider_blending_with_better_characterized_material";
if ($score < 30) $process = ["sorting", "prototype_only_use"];

// ---- Recommended use ----
$recommended_use = $score >= 25 ? $intended_reuse : ($profile["default_recommended_use"] ?? "experimental_prototype");

// ---- Response ----
echo json_encode([
    "request_summary" => [
        "plastic_type"       => $plastic_type,
        "source_type"        => $source_type,
        "contamination_level"=> $contamination,
        "washable"           => $washable,
        "intended_reuse"     => $intended_reuse,
        "notes"              => $notes ?: null,
        "image_received"     => $image_received,
    ],
    "reuse_score"      => $score,
    "verdict"          => $verdict,
    "recommended_use"  => $recommended_use,
    "confidence"       => "deterministic",
    "reasons"          => $reasons,
    "warnings"         => $warnings,
    "suggested_process"=> $process,
    "disclaimer"       => DISCLAIMER,
    "future_cv_ready"  => true,
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
