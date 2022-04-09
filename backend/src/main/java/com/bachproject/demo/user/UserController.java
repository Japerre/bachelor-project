package com.bachproject.demo.user;

import com.bachproject.demo.onderwerp.Onderwerp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @CrossOrigin(origins = "*")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @PostMapping
    @CrossOrigin(origins = "*")
    public void postNewUser(@RequestBody User user){
        userService.addNewUser(user);
    }
}
