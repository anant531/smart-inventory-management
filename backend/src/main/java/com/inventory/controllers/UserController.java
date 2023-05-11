package com.inventory.controllers;

import com.inventory.entities.Employee;
import com.inventory.repositories.GodownRepository;
import com.inventory.repositories.RolesRepository;
import com.inventory.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

	@Autowired
	UserRepository userRepository;

	@Autowired
	RolesRepository rolesRepository;

	@Autowired
	GodownRepository godownRepository;

	@GetMapping(path = "/user")
	public List<Employee> getAllUser(){
		return userRepository.findAll();
	}

	@PostMapping(path = "/user")
	public void addUser(@RequestBody Employee e) {
		userRepository.save(e);
	}

	@GetMapping(path = "/user/{id}")
	public Optional<Employee> getUserById(@PathVariable long id) {
		return userRepository.findById(id);
	}

//	@PostMapping("/userValidate")
//	ResponseEntity<?> getEmployee(@RequestBody Employee e) {
//		Optional<Employee> employeeFound = userRepository.findByUserName(e.getUserName());
//		if (employeeFound.isPresent() && employeeFound.get().getPassword().equals(e.getPassword())) {
//			e = employeeFound.get();
//            return ResponseEntity.ok(e);
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//	}

	@DeleteMapping("/user")
	public void deleteUser(@RequestBody Employee e){
		Optional<Employee> employeeFound = userRepository.findById(e.getUserId());
		if(employeeFound.isPresent()){
			e = employeeFound.get();
			userRepository.delete(e);
		}
	}

	@PutMapping("/user/{id}")
	public void updateUser(@RequestBody Employee e){
		userRepository.save(e);
	}

}
