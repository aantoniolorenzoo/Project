USE EXAMEN_LMD_DAM

/*1. Obtener para cada pelicula el titulo, el director y el nombre de los personajes
(no protagonista) que participan en la misma. Si una pelicula aun no tiene personajes que participan
almacenados, el nombre de la pelicula debe aparecer igualmente. Utiliza alias para el nombre
de los personajes y en el resultado que salga el valor null, debes poner "Aún no se han añadido personajes."
*/
SELECT * FROM pelicula;
SELECT * FROM participa_pel;
SELECT * FROM personaje;

SELECT Titulo, Director, ISNULL(NomPer,'AÚN NO SE HAN AÑADIDO PERSONAJES') AS 'Nombre del Personaje' 
FROM (pelicula pel LEFT JOIN participa_pel Par ON (pel.CodPel=Par.CodPel))
	LEFT JOIN personaje Per ON (Par.CodPer=Per.CodPer)

-- Otra posible solución
SELECT Titulo, Director, ISNULL(NomPer,'AÚN NO SE HAN AÑADIDO PERSONAJES') AS 'Nombre del Personaje'
FROM (pelicula pel LEFT JOIN participa_pel Par ON (pel.CodPel=Par.CodPel))
	LEFT JOIN personaje Per ON (Par.CodPer=Per.CodPer)
WHERE pel.CodPerProtagonista<>Par.CodPer OR Par.CodPel IS NULL;

-- Otra condición 
SELECT Titulo, Director, ISNULL(NomPer,'AÚN NO SE HAN AÑADIDO PERSONAJES') AS 'Nombre del Personaje' 
FROM (pelicula pel LEFT JOIN participa_pel Par ON (pel.CodPel=Par.CodPel))
	LEFT JOIN personaje Per ON (Par.CodPer=Per.CodPer)
WHERE pel.CodPerProtagonista<>ISNULL(Par.CodPel,0);

/*2. Obtener el nombre de cada personaje y en cuántas películas
ha participado, pero solo deben salir los personajes que hayan
participado en más de dos películas. Utiliza alias para las columnas.
Ordena por nombre de personaje descendentemente.
*/


SELECT NOMPER, COUNT(*) AS 'Actuaciones'
FROM Personaje Per JOIN participa_pel Par ON Per.CodPer=Par.CodPer
GROUP BY NOMPER
HAVING COUNT(*)>2
ORDER BY NOMPER DESC

/*3. Obtener el nombre y el apellidos del actor mas joven almacenado
en la base de datos a día de hoy, junto con el nombre del personaje que interpreta, así como la edad
que tiene el actor.*/
-- Uno las tablas
SELECT *
FROM actor a JOIN personaje p ON (a.CodAct=p.CodPer)
ORDER BY Edad;

-- Veo las edades de los actores
SELECT a.CodAct, NomAct, ApeAct, CodPer, DATEDIFF(DAY, Edad, GETDATE())/365 AS 'Edad'
FROM actor a JOIN personaje p ON (a.CodAct=p.CodPer)
ORDER BY Edad;

SELECT a.CodAct, NomAct, ApeAct, CodPer, DATEDIFF(DAY, Edad, GETDATE())/365 AS 'EDAD'
FROM actor a JOIN personaje p ON (a.CodAct=p.CodPer)
WHERE DATEDIFF(DAY, Edad, GETDATE())/365 = (SELECT min(DATEDIFF(DAY,Edad,GETDATE())/365)
											FROM actor)

/*4. */

BEGIN TRANSACTION
UPDATE pelicula 
SET Lanzamiento = (select MIN(Lanzamiento) FROM pelicula)
ROLLBACK TRANSACTION

/*5. Borra las películas en las que aún no existe ningún personaje que participe.
No tienes más información que la que se te indica en el enunciado. La sentencia 
debe estar dentro de una transaccion y cuando hayas comprobado que has realizado el ejercicio correctamente, debes deshacerla.
Realizar el ejercicio de tres maneras diferentes*/
-- Predicado NOT EXISTS es verdadero si devuelve 0 filas
SELECT *
FROM pelicula
WHERE NOT EXISTS (SELECT * FROM Participa_Pel Par
					WHERE Par.CodPel=pelicula.CodPel)
-- Solución 3
BEGIN TRANSACTION
DELETE FROM pelicula
WHERE CodPel NOT IN (SELECT DISTINCT CodPel FROM participa_pel);
ROLLBACK TRANSACTION