jXcombo.js
=====================

Este plugin simplifica el proceso de rellenar los datos en las etiquetas SELECT, ya sean anidados o no.

Formato de json
---------------

Respuesta json:

<pre>
[
    {"1","Perú"},
    {"2","Colombia"},
    {"3","Mexico"},
    {"4","España"},
    {"5","Venezuela"},
    {"6","Argentina"}
]
</pre>


Forma automática (simple)
-------------------------
<code>
&lt;select id="pais" name="pais" role="jxcombo" data-source="paises.php"&gt;&lt;/select&gt;
</code>

Forma automática (aninado)
-------------------------

<code>
&lt;select id="ciudad" name="ciudad" role="jxcombo" data-source="ciudades.php" data-parent="#pais"&gt;&lt;/select&gt;
</code>

Opciones
--------

<b>role</b>: [obligatorio] palabra clave siempre debe ser "jxcombo"

<b>data-source</b>: Fuente de datos ej: "localhost/myapp/paises.php"

<b>data-parent</b>: Selector padre ej: "#pais", "input[name='pais']"

<b>data-default</b>: Valor que se seleccionara por defecto.
