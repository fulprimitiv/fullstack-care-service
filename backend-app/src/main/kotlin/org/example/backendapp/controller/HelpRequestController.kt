package org.example.backendapp.controller

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.parameters.RequestBody
import io.swagger.v3.oas.annotations.tags.Tag
import org.example.backendapp.controller.dto.HelpRequestDto
import org.example.backendapp.entity.HelpRequest
import org.example.backendapp.entity.HelpRequestStatus
import org.example.backendapp.service.HelpRequestService
import org.example.backendapp.service.command.CreateHelpRequestCommand
import org.springframework.http.HttpStatus.BAD_REQUEST
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@Tag(name = "Заявка на помощь", description = "Управление заявками на помощь пожилым людям")
class HelpRequestController(
    private val helpRequestService: HelpRequestService
) {
    @Operation(summary = "Получить заявку по ID", description = "Возвращает заявку на помощь по ее идентификатору")
    @GetMapping("/help-request/{id}")
    fun getHelpRequest(
        @Parameter(description = "ID заявки") @PathVariable id: Long
    ): ResponseEntity<HelpRequestDto?> {
        val helpRequest = helpRequestService.getRequestById(id)
        return ResponseEntity.ok(helpRequest.toDto())
    }

    @Operation(
        summary = "Получить заявки пользователя по статусу",
        description = "Возвращает список заявок для заданного пользователя и статуса"
    )
    @GetMapping("/help-request/user/{userId}/status/{status}")
    fun getAllByUserAndStatus(
        @Parameter(description = "ID пользователя") @PathVariable userId: Long,
        @Parameter(description = "Статус заявки") @PathVariable status: HelpRequestStatus
    ): ResponseEntity<List<HelpRequestDto>> {
        val list = helpRequestService.findAllByUserAndStatus(userId, status).map { it.toDto() }
        return ResponseEntity.ok(list)
    }

    @Operation(
        summary = "Получить заявки пользователя по статусу",
        description = "Возвращает список заявок для заданного пользователя и статуса"
    )
    @GetMapping("/help-request/user/{userId}")
    fun getAllByUser(
        @Parameter(description = "ID пользователя") @PathVariable userId: Long,
    ): ResponseEntity<List<HelpRequestDto>> {
        val list = helpRequestService.findAllByUser(userId).map { it.toDto() }
        return ResponseEntity.ok(list)
    }

    @Operation(
        summary = "Получить все заявки от пользователя в статусе CREATED",
        description = "Возвращает список всех заявок от пользователя в статусе CREATED для страницы с выбором заявки"
    )
    @GetMapping("/help-request")
    fun getAll(): ResponseEntity<List<HelpRequestDto>> {
        val list = helpRequestService.findAllWithStatusCreated().map { it.toDto() }
        return ResponseEntity.ok(list)
    }

    @Operation(
        summary = "Создать новую заявку на помощь",
        description = "Создаёт новую заявку на получение помощи"
    )
    @PostMapping("/help-request")
    fun createHelpRequest(
        @RequestBody(description = "Данные для создания заявки") command: CreateHelpRequestCommand
    ): ResponseEntity<HelpRequestDto> {
        val created = helpRequestService.createHelpRequest(command)
        return ResponseEntity.ok(created.toDto())
    }

    @Operation(
        summary = "Обновить рейтинг заявки",
        description = "Позволяет выставить/изменить рейтинг по заявке"
    )
    @PutMapping("/help-request/{id}/rating/{newRating}")
    fun updateRating(
        @Parameter(description = "ID заявки") @PathVariable id: Long,
        @Parameter(description = "Новый рейтинг") @PathVariable newRating: Int
    ): ResponseEntity<HelpRequestDto> {
        val updated = helpRequestService.updateRequestRating(id, newRating)
        return ResponseEntity.ok(updated.toDto())
    }

    @Operation(
        summary = "Обновить статус заявки",
        description = "Изменяет текущий статус по заявке"
    )
    @PutMapping("/help-request/{id}/status/{newStatus}")
    fun updateStatus(
        @Parameter(description = "ID заявки") @PathVariable id: Long,
        @Parameter(description = "Новый статус") @PathVariable newStatus: HelpRequestStatus
    ): ResponseEntity<HelpRequestDto> {
        val updated = helpRequestService.updateRequestStatus(id, newStatus)
        return ResponseEntity.ok(updated.toDto())
    }

    @Operation(
        summary = "Добавить или изменить комментарий к заявке",
        description = "Позволяет добавить или изменить комментарий к заявке на помощь"
    )
    @PutMapping("/help-request/{id}/comment")
    fun updateComment(
        @Parameter(description = "ID заявки") @PathVariable id: Long,
        @RequestBody(description = "Текст комментария") comment: String
    ): ResponseEntity<HelpRequestDto> {
        val updated = helpRequestService.updateCommentToRequest(id, comment)
        return ResponseEntity.ok(updated.toDto())
    }

    @Operation(
        summary = "Взять заявку волонтером",
        description = "Позволяет взять заявку волонтером, если она находится в статусе CREATED"
    )
    @PostMapping("/help-request/{id}")
    fun updateVolunteer(
        @Parameter(description = "ID заявки") @PathVariable id: Long,
        @RequestBody(description = "ID волонтера принявшего заявку") volunteerId: Long
    ): ResponseEntity<HelpRequestDto> {
        val helpRequest = helpRequestService.getRequestById(id)
        if (helpRequest.status != HelpRequestStatus.CREATED) {
            throw WebException(BAD_REQUEST, "Заявка не находится в статусе CREATED")
        }

        val updated = helpRequestService.updateRequestVolunteer(id, volunteerId)
        return ResponseEntity.ok(updated.toDto())
    }

    private fun HelpRequest.toDto() = HelpRequestDto(
        id = id,
        type = type,
        description = description,
        address = address,
        requestDate = requestDate,
        recipientId = recipient.id,
        volunteerId = volunteer?.id,
        status = status,
        rating = rating,
        comment = comment
    )
}
