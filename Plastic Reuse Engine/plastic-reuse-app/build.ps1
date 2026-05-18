# ============================================================
#  build.ps1 - Plastic Reuse Engine | Cordova Android Build
#  Uso:
#    .\build.ps1              -> APK debug (por defecto)
#    .\build.ps1 -Release     -> APK release (firmado con keystore)
#    .\build.ps1 -Clean       -> Limpia build antes de compilar
#    .\build.ps1 -Device      -> Instala directamente en dispositivo USB
# ============================================================
param(
    [switch]$Release,
    [switch]$Clean,
    [switch]$Device
)

$ErrorActionPreference = "Stop"

# -- Rutas del entorno --
$env:ANDROID_HOME  = "C:\Users\agente\AppData\Local\Android\Sdk"
$env:JAVA_HOME     = "C:\Program Files\Android\Android Studio\jbr"
$env:CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL = "file:///C:/Users/agente/Desktop/WellNestFamily/gradle-8.11.1-bin.zip"

$gradleHome = "C:\Users\agente\Desktop\WellNestFamily\gradle-8.9\gradle-8.9"
$env:GRADLE_HOME = $gradleHome

$env:PATH = "$env:ANDROID_HOME\platform-tools;" +
            "$env:ANDROID_HOME\tools;" +
            "$env:ANDROID_HOME\tools\bin;" +
            "$env:JAVA_HOME\bin;" +
            "$gradleHome\bin;" +
            $env:PATH

# -- Directorio del proyecto --
$projectDir = "C:\Users\agente\Downloads\Plastic Reuse Engine\Plastic Reuse Engine\plastic-reuse-app"
Set-Location $projectDir

# -- Helpers --
function Info  ($msg) { Write-Host "  >> $msg" -ForegroundColor Cyan }
function OK    ($msg) { Write-Host "  [OK] $msg" -ForegroundColor Green }
function Warn  ($msg) { Write-Host "  [!] $msg" -ForegroundColor Yellow }
function Fail  ($msg) { Write-Host "  [ERROR] $msg" -ForegroundColor Red; exit 1 }

function Check-Command($cmd) {
    if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
        Fail "'$cmd' no encontrado. Verifica que este instalado y en PATH."
    }
}

# -- Banner --
Write-Host ""
Write-Host "================================================" -ForegroundColor Magenta
Write-Host "   Plastic Reuse Engine - APK Build             " -ForegroundColor Magenta
Write-Host "================================================" -ForegroundColor Magenta
Write-Host ""

# -- Validar herramientas --
Info "Validando entorno de compilacion..."
Check-Command "pnpm"
Check-Command "java"

try { $javaRaw = (& "$env:JAVA_HOME\bin\java.exe" -version 2>&1)[0] } catch { $javaRaw = "desconocida" }
OK "Java detectado: $javaRaw"
OK "ANDROID_HOME : $env:ANDROID_HOME"
OK "JAVA_HOME    : $env:JAVA_HOME"

if (-not (Test-Path "$env:ANDROID_HOME\platform-tools\adb.exe")) {
    Warn "adb.exe no encontrado. La instalacion en dispositivo no estara disponible."
}

# -- Verificar plataforma Android --
Info "Verificando plataforma Android..."
if (-not (Test-Path "platforms\android")) {
    Info "Anadiendo plataforma Android..."
    pnpm exec cordova platform add android
    if ($LASTEXITCODE -ne 0) { Fail "No se pudo anadir la plataforma Android." }
} else {
    OK "Plataforma Android: lista"
}

# -- Limpiar si se pidio --
if ($Clean) {
    Info "Limpiando build anterior..."
    pnpm exec cordova clean android 2>&1 | Out-Null
    OK "Clean completado"
}

# -- Modo de compilacion --
$buildMode = if ($Release) { "release" } else { "debug" }
Info "Modo de compilacion: $buildMode"
Write-Host ""

# -- COMPILAR --
Info "Ejecutando: cordova build android --$buildMode"
$buildStart = Get-Date

if ($Release) {
    $keystorePath  = "$env:USERPROFILE\Desktop\plasticreuse.keystore"
    $keystoreAlias = "plasticreuse"

    if (-not (Test-Path $keystorePath)) {
        Warn "Keystore no encontrado. Generando keystore de desarrollo..."
        & "$env:JAVA_HOME\bin\keytool.exe" `
            -genkeypair -v `
            -keystore $keystorePath `
            -alias $keystoreAlias `
            -keyalg RSA -keysize 2048 -validity 10000 `
            -dname "CN=PlasticReuse, OU=Dev, O=PlasticReuse, L=Bogota, S=Cundinamarca, C=CO" `
            -storepass android -keypass android 2>&1 | Out-Null
        OK "Keystore generado: $keystorePath"
    }

    pnpm exec cordova build android --release -- `
        --keystore="$keystorePath" `
        --storePassword=android `
        --alias=$keystoreAlias `
        --password=android
} else {
    pnpm exec cordova build android --debug
}

if ($LASTEXITCODE -ne 0) {
    Fail "La compilacion fallo. Revisa los errores arriba."
}

$elapsed = [math]::Round(((Get-Date) - $buildStart).TotalSeconds, 1)
OK "Compilacion completada en ${elapsed}s"

# -- Localizar el APK generado --
$apkSearch = if ($Release) {
    "platforms\android\app\build\outputs\apk\release\app-release*.apk"
} else {
    "platforms\android\app\build\outputs\apk\debug\app-debug.apk"
}

$apkFile = Get-Item $apkSearch -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $apkFile) {
    Fail "APK no encontrado en: $apkSearch"
}

$apkSizeMB = [math]::Round($apkFile.Length / 1MB, 1)

# -- Copiar al Escritorio --
$timestamp = Get-Date -Format "yyyyMMdd_HHmm"
$destName  = "PlasticReuseEngine_${buildMode}_${timestamp}.apk"
$destPath  = "$env:USERPROFILE\Desktop\$destName"
Copy-Item -Path $apkFile.FullName -Destination $destPath -Force
OK "APK copiado al escritorio: $destName ($apkSizeMB MB)"

# -- Instalar en dispositivo si se pidio --
if ($Device) {
    Info "Buscando dispositivo Android conectado..."
    $adb = "$env:ANDROID_HOME\platform-tools\adb.exe"
    if (-not (Test-Path $adb)) {
        Warn "adb.exe no disponible. No se puede instalar automaticamente."
    } else {
        $devices = & $adb devices 2>&1 | Where-Object { $_ -match "device$" }
        if (-not $devices) {
            Warn "No se detecto ningun dispositivo. Activa USB Debugging y vuelve a intentar."
        } else {
            Info "Instalando en dispositivo..."
            & $adb install -r $destPath
            if ($LASTEXITCODE -eq 0) {
                OK "APK instalado exitosamente en el dispositivo."
            } else {
                Warn "Instalacion via adb fallo. Copia el APK manualmente."
            }
        }
    }
}

# -- Resumen --
Write-Host ""
Write-Host "================================================" -ForegroundColor Magenta
Write-Host "  BUILD EXITOSO" -ForegroundColor Green
Write-Host "  APK : $destPath" -ForegroundColor White
Write-Host "  Tam : $apkSizeMB MB  |  Modo: $buildMode" -ForegroundColor White
Write-Host "================================================" -ForegroundColor Magenta
Write-Host ""
