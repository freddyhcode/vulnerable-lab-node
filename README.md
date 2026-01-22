<p align="center">
  <a href="https://nodejs.org/" target="blank"><img src="https://nodejs.org/static/images/logo.svg" width="200" alt="Node Logo" /></a>
</p>

# Vulnerable Node Lab

<div align="center">

[![NodeJS](https://img.shields.io/badge/NodeJS-Runtime-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-Framework-black?style=flat-square&logo=express)](https://expressjs.com/)
[![Vulnerable](https://img.shields.io/badge/Vulnerable-Intentionally-red?style=flat-square)](https://owasp.org/)

</div>

Laboratorio API minimalista diseñado intencionalmente con fallos de seguridad. Sirve como objetivo de pruebas para el scanner **PackOfKittens**.

> [!NOTE]
> **Notas:**
>
> - **Sin Base de Datos:** Todo el estado se almacena en memoria.
> - **Vulnerabilidades Reales:** Simula condiciones de carrera, tiempos de respuesta inseguros y agotamiento de recursos.
> - **Dependencias:** Solo requiere Express.js.

---

> [!WARNING]
> **Entorno de Riesgo**
>
> Esta aplicación es INSEGURA por diseño. NO la despliegues en servidores públicos ni redes de producción. Úsala solo en `localhost` o en una red aislada para pruebas de seguridad.

---

## Configuración y Ejecución

### Iniciar Laboratorio

```bash
npm install
npm run start
```

El servidor iniciará en: `http://localhost:3000`

---

## Referencia de API

### Resumen de Endpoints

| Método | Endpoint             | Vulnerabilidad (OWASP 2025)         | Descripción                            |
| :----- | :------------------- | :---------------------------------- | :------------------------------------- |
| POST   | `/api/user/login`    | **[A05] Broken Authentication**     | Timing Attack (Username Enumeration).  |
| POST   | `/api/shop/buy`      | **[A03] Security Misconfiguration** | Race Condition en stock de inventario. |
| POST   | `/api/user/register` | **[A03] Security Misconfiguration** | Rate Limit Bypass vía IP Spoofing.     |
| GET    | `/api/reports`       | **[A03] Resource Consumption**      | DoS por latencia acumulativa.          |

---

### Detalle de Vulnerabilidades

#### 1. Timing Attack

El endpoint tarda significativamente más cuando el usuario existe (`admin@empresa.com`), sumulando consulta a una base de datos.

```http
POST /api/user/login
{
  "email": "admin@empresa.com",
  "password": "123456"
}
```

#### 2. Inventory Race Condition

El stock se verifica y se resta en pasos separados con una latencia artificial, permitiendo comprar más items de los disponibles con concurrencia.

```http
POST /api/shop/buy
```

#### 3. Rate Limit Bypass

El limitador de peticiones confía ciegamente en el header `X-Forwarded-For`, permitiendo bypass mediante rotación de IPs falsas.

```http
POST /api/user/register
X-Forwarded-For: 1.2.3.4
```

#### 4. Resource Exhaustion

Causa una denegación de servicio (DoS) por acumulación de latencia en el servidor. Cada petición aumenta la carga simulada global.

```http
GET /api/reports
```
