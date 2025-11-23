//package org.example.backendapp.config
//
//import com.fasterxml.jackson.databind.ObjectMapper
//import jakarta.servlet.FilterChain
//import jakarta.servlet.http.HttpServletRequest
//import jakarta.servlet.http.HttpServletResponse
//import org.example.backendapp.service.JwtService
//import org.hibernate.ObjectNotFoundException
//import org.springframework.security.authentication.BadCredentialsException
//import org.springframework.security.core.Authentication
//import org.springframework.stereotype.Component
//import org.springframework.web.filter.OncePerRequestFilter
//import kotlin.jvm.java
//
//
//@Component
//class InitialAuthenticationFilter(
//    private val jwtService: JwtService,
//    private val authenticationProvider: UsernamePasswordAuthenticationProvider
//) : OncePerRequestFilter() {
//
//    override fun doFilterInternal(
//        request: HttpServletRequest,
//        response: HttpServletResponse,
//        filterChain: FilterChain
//    ) {
//        if (request.getHeader("Authorization") == null) {
//            val bodyJson = request.reader.readLine()
//            if (bodyJson != null) {
//                val mapper = ObjectMapper()
//                val userDto: UserDto = mapper.readValue<UserDto?>(bodyJson, UserDto::class.java)
//                val username: String? = userDto.getUsername()
//                val password: String? = userDto.getPassword()
//                try {
//                    var authentication: Authentication? = UsernamePasswordAuthentication(username, password)
//                    authentication = authenticationProvider.authenticate(authentication)
//                    val jwt: String? = jwtService.generatedJwt(authentication)
//                    response!!.setHeader("Authorization", HeaderValues.BEARER + jwt)
//                } catch (e: BadCredentialsException) {
//                    logger.error(e.message)
//                    response!!.status = HttpServletResponse.SC_UNAUTHORIZED
//                } catch (e: ObjectNotFoundException) {
//                    logger.error(e.message)
//                    response!!.status = HttpServletResponse.SC_UNAUTHORIZED
//                }
//            }
//        }
//    }
//
//    override fun shouldNotFilter(request: HttpServletRequest): Boolean {
//        return request.servletPath != "/login"
//    }
//}