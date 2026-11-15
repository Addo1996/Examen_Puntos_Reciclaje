
package com.examen.reciclaje.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examen.reciclaje.entidades.PuntoReciclaje;

// Repositorio para gestionar puntos de reciclaje
public interface PuntoReciclajeRepository extends JpaRepository<PuntoReciclaje, Integer> {

}
