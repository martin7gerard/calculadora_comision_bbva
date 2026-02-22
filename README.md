# Calculadora de Comisiones BBVA (Reverse Commission)

Esta es una mini-plataforma web diseñada para vendedores y negocios que utilizan terminales punto de venta **BBVA**. Su objetivo principal es resolver el problema de "¿Cuánto debo cobrarle al cliente para recibir exactamente X cantidad después de comisiones e impuestos?".

## 🚀 ¿Para qué funciona?

Cuando realizas una venta con terminal, el banco retiene una comisión más el IVA sobre esa comisión. Si quieres recibir un monto neto exacto (ej. $100.00), no puedes simplemente sumar la comisión al precio base, ya que la retención final se aplica sobre el total cobrado. 

Esta herramienta utiliza el cálculo de **comisión inversa** para determinar el monto bruto exacto que debes ingresar en la terminal para que, tras los descuentos, tu saldo final sea el deseado.

## ✨ Características Principales

- **Cálculo en Tiempo Real:** Los resultados se actualizan instantáneamente mientras escribes el monto deseado.
- **Soporte para Contado y MSI:**
  - **Venta de Contado:** 2.25% + IVA.
  - **3 Meses sin Intereses (MSI):** 7.7% + IVA (Monto mínimo $300).
  - **6 Meses sin Intereses (MSI):** 10.7% + IVA (Monto mínimo $600).
  - **9 Meses sin Intereses (MSI):** 13.7% + IVA (Monto mínimo $900).
  - **12 Meses sin Intereses (MSI):** 16.7% + IVA (Monto mínimo $1,200).
- **Validación Automática:** Indica si el monto no cumple con el mínimo requerido para activar los meses sin intereses.
- **Desglose de Pago Mensual:** Calcula automáticamente cuánto pagará el cliente cada mes en los plazos de MSI.
- **Interfaz Moderna:** Diseño premium, responsivo y fácil de usar, adaptado tanto para móviles como para escritorio.

## 🛠️ Tecnologías

- **HTML5 & CSS3:** Diseño responsivo con Grid y Flexbox.
- **JavaScript (Vanilla):** Lógica de cálculo reactiva sin dependencias externas.
- **Google Fonts:** Tipografía "Outfit" para una lectura clara y profesional.

## 📂 Estructura del Proyecto

- `index.html`: Estructura y presentación.
- `style.css`: Identidad visual y diseño responsivo.
- `script.js`: El "motor" de cálculo y manipulación del DOM.

---
*Desarrollado para facilitar la administración de pequeños negocios y maximizar la precisión en los cobros con terminal.*
