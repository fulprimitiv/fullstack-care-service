package org.example.backendapp.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MethodArgumentNotValidException
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

    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationExceptions(ex: MethodArgumentNotValidException): ResponseEntity<Map<String, String>> {
        val errors = mutableMapOf<String, String>()
        ex.bindingResult.fieldErrors.forEach { error ->
            errors[error.field] = error.defaultMessage ?: "Validation error"
        }
        return ResponseEntity.badRequest().body(errors)
    }

}

class WebException(
    val httpStatus: HttpStatus,
    message: String,
) : Exception(message)
