//package org.example.backendapp.config
//
//import org.springframework.context.annotation.Bean
//import org.springframework.context.annotation.Configuration
//import org.springframework.security.config.Customizer
//import org.springframework.security.config.annotation.web.builders.HttpSecurity
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
//import org.springframework.security.crypto.password.PasswordEncoder
//import org.springframework.security.web.SecurityFilterChain
//import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
//
//
//@Configuration
//class WebConfiguration {
//    @Bean
//    fun passwordEncoder(): PasswordEncoder {
//        return BCryptPasswordEncoder()
//    }
//
//    @Bean
//    fun securityFilterChain(
//        http: HttpSecurity,
//        initialAuthenticationFilter: InitialAuthenticationFilter,
//        jwtAuthorizationFilter: JwtAuthorizationFilter
//    ): SecurityFilterChain? {
//        http.addFilterAt(initialAuthenticationFilter, BasicAuthenticationFilter::class.java)
//            .addFilterAt(jwtAuthorizationFilter, BasicAuthenticationFilter::class.java)
//
//        http.authorizeHttpRequests(Customizer { authz ->
//            authz
//                .requestMatchers("/h2-console/**").permitAll()
//                .anyRequest().authenticated()
//        })
//
//        http.headers(Customizer { headers -> headers.frameOptions(Customizer { }) })
//            .csrf(Customizer { obj -> obj.disable() })
//            .cors(Customizer { obj -> obj.disable() })
//
//        return http.build()
//    }
//}
