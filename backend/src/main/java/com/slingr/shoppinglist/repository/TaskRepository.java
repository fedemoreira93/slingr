package com.slingr.shoppinglist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.slingr.shoppinglist.model.Task;

public interface TaskRepository extends JpaRepository<Task, Integer> {
}