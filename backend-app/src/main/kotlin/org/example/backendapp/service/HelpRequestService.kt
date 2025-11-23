package org.example.backendapp.service

import org.example.backendapp.entity.HelpRequest
import org.example.backendapp.entity.HelpRequestStatus
import org.example.backendapp.service.command.CreateHelpRequestCommand
import org.example.backendapp.service.repository.HelpRequestRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class HelpRequestService(
    private val helpRequestRepository: HelpRequestRepository,
    private val userService: UserService
) {
    fun getRequestById(id: Long) = helpRequestRepository.getReferenceById(id)

    fun findAllByUserAndStatus(id: Long, status: HelpRequestStatus) =
        helpRequestRepository.findAllByRecipientIdAndStatus(id, status) +
                helpRequestRepository.findAllByVolunteerIdAndStatus(id, status)

    fun findAllByUser(id: Long) =
        helpRequestRepository.findAllByRecipientId(id) +
                helpRequestRepository.findAllByVolunteerId(id)

    fun findAllWithStatusCreated(): Set<HelpRequest> {
        return helpRequestRepository.findAllAndStatusIn(listOf(HelpRequestStatus.CREATED))
    }

    @Transactional
    fun createHelpRequest(command: CreateHelpRequestCommand): HelpRequest {
        return HelpRequest(
            type = command.type,
            description = command.description,
            address = command.address,
            requestDate = command.requestDate,
            recipient = userService.findById(command.recipientId),
        ).also { helpRequestRepository.save(it) }
    }

    @Transactional
    fun updateRequestRating(id: Long, newRating: Int): HelpRequest {
        return helpRequestRepository.getReferenceById(id)
            .apply { rating = newRating }
            .also { helpRequestRepository.save(it) }
    }

    @Transactional
    fun updateRequestStatus(id: Long, newStatus: HelpRequestStatus): HelpRequest {
        return helpRequestRepository.getReferenceById(id)
            .apply { status = newStatus }
            .also { helpRequestRepository.save(it) }
    }

    @Transactional
    fun updateCommentToRequest(id: Long, comment: String) =
        helpRequestRepository.getReferenceById(id)
            .apply { this.comment = comment }
            .also { helpRequestRepository.save(it) }

    @Transactional
    fun updateRequestVolunteer(id: Long, volunteerId: Long): HelpRequest {
        val helpRequest = helpRequestRepository.getReferenceById(id)
        
        return helpRequest
            .apply { this.volunteer = userService.findById(volunteerId) }
            .also { helpRequestRepository.save(it) }
    }
}