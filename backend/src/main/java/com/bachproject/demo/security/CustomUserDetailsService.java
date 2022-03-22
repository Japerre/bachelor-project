package com.bachproject.demo.security;

import com.bachproject.demo.user.User;
import com.bachproject.demo.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override // je kan hier ook hardcoded users meegeven
    public UserDetails loadUserByUsername(String username /*username is wat we meegeven bij de login*/) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username);
        if(user == null){
            throw new UsernameNotFoundException("user not found");
        }

        return new CustomUserDetails(user);
    }
}
