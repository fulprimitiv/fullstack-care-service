package org.example.careservice

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class CareServiceApplication

fun main(args: Array<String>) {
    runApplication<CareServiceApplication>(*args)
}
