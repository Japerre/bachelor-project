package com.bachproject.demo.security;

import com.bachproject.demo.filters.JwtRequestFilter;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService; // hier komen de users vandaan

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    // dit moet er gewoon bij staan
    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Autowired // configure authentication
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    private static final String[] WHITELIST_PERMITALL = {"/authenticate", "/users/register", "/students/register", "/subjects/approvedSubjects", "/subjects/{subjectId}", "/targetaudience", "/promotors"};
    private static final String[] WHITELIST_AUTHENTICATED = {""};
    private static final String[] WHITELIST_COORDINATOR = {"/subjects/disapprove/{subjectId}", "/subjects/approve/{subjectId}"};

    @Override // configure authorisation
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // TODO dit enablen vor meer security
                .authorizeRequests()
//                .antMatchers("/authenticate", "/users/register", "/students/register", "/subjects/{subjectId}", "/subjects", "/targetaudience", "/promotors",  "/subjects/disapprove/{subjectId}").permitAll()
//                .anyRequest().hasAnyRole("USER", "STUDENT", "ADMIN", "COORDINATOR", "PROMOTOR").and()// alles behalve /authenticate moet een user voor ingelogd zijn
//                .antMatchers(WHITELIST_PERMITALL).permitAll()
                .anyRequest().permitAll().and()
                .cors() // dit moet er zeker staan !!
                .and()
                //.hasRole("USER") //zet dit automatisch om naar "ROLE_USER"
                .exceptionHandling()
                .and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS); // geen sessies maken

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);


        //bovenstaande code werkt maar is uitgecomment om alle paths toe te laten tijdens testen

//        http
//                .csrf().disable()
//                .authorizeRequests().anyRequest().permitAll();//.and().formLogin();
    }

}

