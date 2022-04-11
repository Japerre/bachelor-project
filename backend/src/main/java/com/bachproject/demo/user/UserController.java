package com.bachproject.demo.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    //@CrossOrigin(origins = "*")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @PostMapping(value = "/register")
    //@CrossOrigin(origins = "*")
    public void postNewUser(@RequestBody User user){
        System.out.println(user.getPassword());
        userService.addNewUser(user);
    }
}
