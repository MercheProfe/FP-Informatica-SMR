public class Actividad06Conversiones {

    public static void main(String[] args) {

        /*
         * UT3 - ACTIVIDADES 6: CONVERSIONES Y DIVISIÓN ENTERA
         *
         * Antes de corregir un resultado inesperado, intenta explicar
         * por qué Java lo está produciendo.
         */

        // ============================================================
        // ACTIVIDAD 1. MEDIA DE PUNTOS
        // ============================================================
        int puntosTotales = 125;
        int partidas = 4;

        double media = puntosTotales / partidas;

        System.out.println("Media: " + media);

        // Ejecuta el programa.
        //
        // ¿Obtienes 31.25?
        //
        // Corrige la expresión SIN cambiar puntosTotales ni partidas
        // a double. Utiliza una conversión explícita cuando sea necesaria.


        // ============================================================
        // ACTIVIDAD 2. REPARTIR UNA CUENTA
        // ============================================================
        int cuenta = 87;
        int amigos = 4;

        // Calcula cuánto corresponde a cada persona.
        //
        // Queremos conservar los decimales.
        // Decide dónde necesitas realizar un casting.


        // ============================================================
        // ACTIVIDAD 3. TEMPERATURA
        // ============================================================
        double temperatura = 27.9;

        // Crea una variable entera que almacene temperatura
        // utilizando casting.
        //
        // Muestra ambos valores.
        //
        // ¿Ha redondeado Java el valor o simplemente ha eliminado
        // la parte decimal?


        // ============================================================
        // ACTIVIDAD 4. ESTADÍSTICAS DEL JUGADOR
        // ============================================================
        int partidasJugadas = 25;
        int partidasGanadas = 16;

        // Calcula el porcentaje de victorias:
        //
        // victorias / partidas * 100
        //
        // El resultado debería conservar decimales.
        // Ten cuidado con la división entera.

    }
}
