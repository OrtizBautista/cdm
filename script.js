const factores = { /* Factores de conversión a metros */
            nm: 1e-9, um: 1e-6, mm: 1e-3, cm: 1e-2, m: 1, km: 1e3,
            in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.34, nmi: 1852
        };

        const nombres = { /* Nombres completos de las unidades */
            nm: "nanómetros", um: "micrómetros", mm: "milímetros", cm: "centímetros",
            m: "metros", km: "kilómetros", in: "pulgadas", ft: "pies",
            yd: "yardas", mi: "millas", nmi: "millas náuticas"
        };

        window.ultimaConversion = false; // Variable para saber si ya hubo una conversión
    
        function calcular() { // Función principal para convertir
            let valor = parseFloat(document.getElementById("medida").value); // Obtiene el número ingresado
            let origen = document.getElementById("unidad_de_origen").value; // Unidad origen
            let destino = document.getElementById("unidad_de_destino").value; // Unidad destino

            if (isNaN(valor) || !origen || !destino) { // Valida si falta algo
                document.getElementById("resultado").innerText = "⚠️ Completa todos los campos.";
                return; // Se corta la ejecución
            }

            let resultado = (valor * factores[origen]) / factores[destino]; // Fórmula de conversión

            let resultadoFormateado = (resultado > 1e9 || resultado < 1e-6) // Si es muy grande/pequeño
                ? resultado.toExponential(4) // Lo muestra en notación científica
                : resultado.toLocaleString('es-AR'); // Sino, lo muestra con formato local

                const resultadoDiv = document.getElementById("resultado");
                resultadoDiv.innerText =
                    `${valor} ${nombres[origen]} = ${resultadoFormateado} ${nombres[destino]}`;
            document.getElementById("resultado").innerText =
                `${valor} ${nombres[origen]} = ${resultadoFormateado} ${nombres[destino]}`; // Muestra el resultado

            agregarHistorial(valor, origen, resultadoFormateado, destino); // Agrega al historial
            window.ultimaConversion = true; // Marca que ya hubo conversión
             if (valor === 67) {
              resultadoDiv.innerText = "GMAAAAAAIL :)";
              const img = document.createElement("img");
              img.src = "./index/GMAIL.jpg";
              img.alt = "Easter Egg Gmail";
              img.style.maxWidth = "200px";
              resultadoDiv.appendChild(document.createElement("br")); // Salto de línea
              resultadoDiv.appendChild(img);
              return;
            }
        }
        function agregarHistorial(valor, origen, resultado, destino) { // Maneja el historial
            let hist = document.getElementById("historial"); // Obtiene la lista
            let item = document.createElement("li"); // Crea un ítem de lista
            item.textContent = `${valor} ${nombres[origen]} = ${resultado} ${nombres[destino]}`; // Texto
            hist.prepend(item); // Lo agrega al principio
            if (hist.childNodes.length > 10) hist.removeChild(hist.lastChild); // Mantiene solo 10 elementos
        }

        function copiarResultado() { // Copia el resultado al portapapeles
            let texto = document.getElementById("resultado").innerText;
            if (texto) {
                navigator.clipboard.writeText(texto); // Usa la API del portapapeles
                alert("Resultado copiado ✅"); // Muestra mensaje
            }
        }

        function invertir() { // Invierte origen y destino
            let origen = document.getElementById("unidad_de_origen");
            let destino = document.getElementById("unidad_de_destino");
            let temp = origen.value; // Guarda temporalmente
            origen.value = destino.value; // Intercambia
            destino.value = temp;
            if (origen.value && destino.value) calcular(); // Si hay valores, recalcula
        }

        function cambiarTema() { // Cambia el tema seleccionado
            const tema = document.getElementById("selector-tema").value; // Obtiene el tema elegido
            const body = document.body;

            body.classList.remove("tema1", "tema2", "tema3", "auto"); // Quita anteriores
            body.classList.add(tema); // Aplica el nuevo
            localStorage.setItem("tema", tema); // Lo guarda en localStorage
        }

        // Si cambian las unidades después de una conversión, recalcula automáticamente
        document.getElementById("unidad_de_origen").addEventListener("change", () => {
            if (window.ultimaConversion) calcular();
        });

        document.getElementById("unidad_de_destino").addEventListener("change", () => {
            if (window.ultimaConversion) calcular();
        });

        window.onload = () => { // Cuando carga la página
            const temaGuardado = localStorage.getItem("tema") || "auto"; // Recupera el tema
            document.body.classList.add(temaGuardado); // Lo aplica
            document.getElementById("selector-tema").value = temaGuardado; // Lo muestra en el select
        }

        document.getElementById("medida").addEventListener("keypress", function (e) {
            if (e.key === "Enter") calcular(); // Si presiona Enter, calcula
        });