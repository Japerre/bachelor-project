package com.bachproject.demo.security;

import com.bachproject.demo.student.Student;
import com.bachproject.demo.student.StudentRepository;
import com.bachproject.demo.user.User;
import com.bachproject.demo.user.UserRepository;
import com.bachproject.demo.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("whoami")
public class WhoamiController {

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    UserRepository userRepository;

    @Autowired
    StudentRepository studentRepository;

    @GetMapping("/user")
    public User getUserFromJwt(@RequestHeader("Authorization") String authHeader){
        String token = authHeader.substring(7);
        String userName = jwtUtil.extractUsername(token);
        User user = userRepository.findByUserName(userName);
        return user;
    }

    @GetMapping("/student")
    public Student getStudentFromJWT(@RequestHeader("Authorization") String authHeader){
        String token = authHeader.substring(7);
        String userName = jwtUtil.extractUsername(token);
        User user = userRepository.findByUserName(userName);
        Student student = studentRepository.findByUser(user);
        return student;
    }

}
