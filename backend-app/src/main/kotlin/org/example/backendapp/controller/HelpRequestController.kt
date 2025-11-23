package org.example.backendapp.controller

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import org.example.backendapp.controller.dto.HelpRequestDto
import org.example.backendapp.entity.HelpRequest
import org.example.backendapp.entity.HelpRequestStatus
import org.example.backendapp.service.HelpRequestService
import org.example.backendapp.service.command.CreateHelpRequestCommand
import org.springframework.http.HttpStatus.BAD_REQUEST
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1")
@Tag(
    name = "Заявки на помощь",
    description = "API для управления заявками на помощь пожилым людям. " +
            "Позволяет создавать, просматривать и обновлять заявки на различные виды помощи."
)
class HelpRequestController(
    private val helpRequestService: HelpRequestService
) {

    @Operation(
        summary = "Получить заявку по ID",
        description = "Возвращает полную информацию о заявке на помощь по её уникальному идентификатору. " +
                "Включает все детали заявки: тип помощи, описание, адрес, дату, статус, рейтинг и комментарии."
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Заявка успешно найдена",
                content = [Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = Schema(implementation = HelpRequestDto::class)
                )]
            ),
            ApiResponse(
                responseCode = "404",
                description = "Заявка с указанным ID не найдена"
            )
        ]
    )
    @GetMapping("/help-request/{id}")
    fun getHelpRequest(
        @Parameter(
            description = "Уникальный идентификатор заявки",
            example = "123",
            required = true
        )
        @PathVariable id: Long
    ): ResponseEntity<HelpRequestDto?> {
        val helpRequest = helpRequestService.getRequestById(id)
        return ResponseEntity.ok(helpRequest.toDto())
    }

    @Operation(
        summary = "Получить заявки пользователя по статусу",
        description = "Возвращает список заявок для конкретного пользователя, отфильтрованный по указанному статусу. " +
                "Полезно для получения, например, всех активных или завершённых заявок пользователя."
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Список заявок успешно получен",
                content = [Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = Schema(implementation = Array<HelpRequestDto>::class)
                )]
            )
        ]
    )
    @GetMapping("/help-request/user/{userId}/status/{status}")
    fun getAllByUserAndStatus(
        @Parameter(
            description = "ID пользователя-получателя помощи",
            example = "456",
            required = true
        )
        @PathVariable userId: Long,

        @Parameter(
            description = "Статус заявки для фильтрации",
            example = "CREATED",
            required = true
        )
        @PathVariable status: HelpRequestStatus
    ): ResponseEntity<List<HelpRequestDto>> {
        val list = helpRequestService.findAllByUserAndStatus(userId, status).map { it.toDto() }
        return ResponseEntity.ok(list)
    }

    @Operation(
        summary = "Получить все заявки пользователя",
        description = "Возвращает полный список всех заявок для указанного пользователя, независимо от статуса. " +
                "Включает заявки во всех статусах: созданные, в процессе выполнения, завершённые и отменённые."
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Список всех заявок пользователя успешно получен"
            )
        ]
    )
    @GetMapping("/help-request/user/{userId}")
    fun getAllByUser(
        @Parameter(
            description = "ID пользователя-получателя помощи",
            example = "456",
            required = true
        )
        @PathVariable userId: Long,
    ): ResponseEntity<List<HelpRequestDto>> {
        val list = helpRequestService.findAllByUser(userId).map { it.toDto() }
        return ResponseEntity.ok(list)
    }

    @Operation(
        summary = "Получить все доступные заявки",
        description = "Возвращает список всех заявок в статусе CREATED, доступных для взятия волонтёрами. " +
                "Используется волонтёрами для поиска заявок, которые они могут выполнить."
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Список доступных заявок успешно получен"
            )
        ]
    )
    @GetMapping("/help-request")
    fun getAll(): ResponseEntity<List<HelpRequestDto>> {
        val list = helpRequestService.findAllWithStatusCreated().map { it.toDto() }
        return ResponseEntity.ok(list)
    }

    @Operation(
        summary = "Создать новую заявку на помощь",
        description = "Создаёт новую заявку на получение помощи. " +
                "После создания заявка получает статус CREATED и становится видимой для волонтёров. " +
                "Обязательные поля: тип помощи, описание, адрес, дата выполнения и ID получателя."
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Заявка успешно создана",
                content = [Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = Schema(implementation = HelpRequestDto::class)
                )]
            ),
            ApiResponse(
                responseCode = "400",
                description = "Неверные данные запроса: отсутствуют обязательные поля или данные не прошли валидацию"
            )
        ]
    )
    @PostMapping("/help-request")
    fun createHelpRequest(
        @Parameter(
            description = "Данные для создания новой заявки",
            required = true
        )
        @RequestBody @Valid command: CreateHelpRequestCommand
    ): ResponseEntity<HelpRequestDto> {
        val created = helpRequestService.createHelpRequest(command)
        return ResponseEntity.ok(created.toDto())
    }

    @Operation(
        summary = "Обновить рейтинг заявки",
        description = "Позволяет выставить или изменить рейтинг для завершённой заявки. " +
                "Рейтинг обычно выставляется получателем помощи после выполнения заявки волонтёром. " +
                "Допустимые значения рейтинга: от 1 до 5."
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Рейтинг успешно обновлён"
            ),
            ApiResponse(
                responseCode = "404",
                description = "Заявка с указанным ID не найдена"
            ),
            ApiResponse(
                responseCode = "400",
                description = "Недопустимое значение рейтинга или заявка не в подходящем статусе"
            )
        ]
    )
    @PutMapping("/help-request/{id}/rating/{newRating}")
    fun updateRating(
        @Parameter(
            description = "ID заявки для обновления рейтинга",
            example = "123",
            required = true
        )
        @PathVariable id: Long,

        @Parameter(
            description = "Новое значение рейтинга (от 1 до 5)",
            example = "5",
            required = true
        )
        @PathVariable newRating: Int
    ): ResponseEntity<HelpRequestDto> {
        val updated = helpRequestService.updateRequestRating(id, newRating)
        return ResponseEntity.ok(updated.toDto())
    }

    @Operation(
        summary = "Обновить статус заявки",
        description = "Изменяет текущий статус заявки. " +
                "Возможные переходы статусов: CREATED → IN_PROGRESS → COMPLETED/CANCELLED. " +
                "Используется для отслеживания прогресса выполнения заявки."
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Статус заявки успешно обновлён"
            ),
            ApiResponse(
                responseCode = "404",
                description = "Заявка с указанным ID не найдена"
            ),
            ApiResponse(
                responseCode = "400",
                description = "Недопустимый переход статусов"
            )
        ]
    )
    @PutMapping("/help-request/{id}/status/{newStatus}")
    fun updateStatus(
        @Parameter(
            description = "ID заявки для обновления статуса",
            example = "123",
            required = true
        )
        @PathVariable id: Long,

        @Parameter(
            description = "Новый статус заявки",
            example = "IN_PROGRESS",
            required = true
        )
        @PathVariable newStatus: HelpRequestStatus
    ): ResponseEntity<HelpRequestDto> {
        val updated = helpRequestService.updateRequestStatus(id, newStatus)
        return ResponseEntity.ok(updated.toDto())
    }

    @Operation(
        summary = "Добавить или изменить комментарий к заявке",
        description = "Позволяет добавить или изменить текстовый комментарий к заявке на помощь. " +
                "Комментарий может содержать дополнительную информацию, отзыв или уточнения по выполнению заявки."
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Комментарий успешно добавлен или обновлён"
            ),
            ApiResponse(
                responseCode = "404",
                description = "Заявка с указанным ID не найдена"
            )
        ]
    )
    @PutMapping("/help-request/{id}/comment")
    fun updateComment(
        @Parameter(
            description = "ID заявки для добавления комментария",
            example = "123",
            required = true
        )
        @PathVariable id: Long,

        @Parameter(
            description = "Текст комментария",
            example = "Волонтёр выполнил заявку быстро и качественно",
            required = true
        )
        @RequestBody comment: String
    ): ResponseEntity<HelpRequestDto> {
        val updated = helpRequestService.updateCommentToRequest(id, comment)
        return ResponseEntity.ok(updated.toDto())
    }

    @Operation(
        summary = "Взять заявку волонтером",
        description = "Позволяет волонтёру взять заявку на выполнение. " +
                "Заявка должна находиться в статусе CREATED. " +
                "После успешного выполнения заявка переходит в статус IN_PROGRESS."
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Заявка успешно взята волонтёром"
            ),
            ApiResponse(
                responseCode = "404",
                description = "Заявка с указанным ID не найдена"
            ),
            ApiResponse(
                responseCode = "400",
                description = "Заявка не находится в статусе CREATED или недоступна для взятия"
            )
        ]
    )
    @PostMapping("/help-request/{id}")
    fun updateVolunteer(
        @Parameter(
            description = "ID заявки для взятия волонтёром",
            example = "123",
            required = true
        )
        @PathVariable id: Long,

        @Parameter(
            description = "ID волонтёра, который берёт заявку",
            example = "789",
            required = true
        )
        @RequestBody volunteerId: Long
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