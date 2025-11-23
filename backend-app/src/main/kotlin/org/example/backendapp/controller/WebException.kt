package org.example.backendapp.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class GlobalExceptionController {
    @ExceptionHandler(WebException::class)
    fun handleWebException(ex: WebException): ResponseEntity<String> {
        return ResponseEntity
            .status(ex.httpStatus)
            .body(ex.message ?: "Произошла ошибка WebException")
    }

}

class WebException(
    val httpStatus: HttpStatus,
    message: String,
) : Exception(message)
