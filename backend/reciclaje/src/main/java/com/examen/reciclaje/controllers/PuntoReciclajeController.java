package com.examen.reciclaje.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examen.reciclaje.entidades.PuntoReciclaje;
import com.examen.reciclaje.repository.PuntoReciclajeRepository;

@RestController
@RequestMapping("/api/puntos")
@CrossOrigin(origins = "http://localhost:5173")
public class PuntoReciclajeController {

	private final PuntoReciclajeRepository puntoRepository;

	// Constructor para recibir el repositorio
	public PuntoReciclajeController(PuntoReciclajeRepository puntoRepository) {
		this.puntoRepository = puntoRepository;
	}

	// Consultar todos los puntos de reciclaje
	@GetMapping
	public List<PuntoReciclaje> listarPuntos() {
		return puntoRepository.findAll();
	}

	// Registrar un nuevo punto de reciclaje
	@PostMapping
	public ResponseEntity<PuntoReciclaje> guardarPunto(@RequestBody PuntoReciclaje punto) {

		PuntoReciclaje puntoGuardado = puntoRepository.save(punto);

		return ResponseEntity.status(HttpStatus.CREATED).body(puntoGuardado);
	}

}
