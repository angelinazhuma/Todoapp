package com.example.todo.service;

import com.example.todo.domain.Task;
import com.example.todo.repository.TaskRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository repo;

    public TaskService(TaskRepository repo) {
        this.repo = repo;
    }

    public List<Task> getAll() {
        return repo.findAll();
    }

    public Task create(String title) {
        String normalizedTitle = title == null ? "" : title.trim();
        if (normalizedTitle.isBlank()) {
            throw new IllegalArgumentException("Task title must not be blank");
        }
        return repo.save(new Task(normalizedTitle));
    }

    public Task toggle(Long id) {
        Task task = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
        task.setDone(!task.isDone());
        return repo.save(task);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found");
        }
        repo.deleteById(id);
    }
}
