package org.example.backendapp.entity

import jakarta.persistence.*
import java.time.Instant

@Entity(name = "tbl_help_requests")
data class HelpRequest(
    @Enumerated(EnumType.STRING)
    val type: HelpRequestType,
    val description: String,
    val address: String,
    val requestDate: Instant,
    @Enumerated(EnumType.STRING)
    var status: HelpRequestStatus = HelpRequestStatus.CREATED,
    val createdDate: Instant = Instant.now(),
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipient_id")
    val recipient: User,
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0

    @Column(nullable = true)
    var rating: Int? = null

    @Column(nullable = true, updatable = true)
    var comment: String? = null

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "volunteer_id")
    var volunteer: User? = null
    
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is HelpRequest) return false

        if (id != other.id) return false

        return true
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    override fun toString(): String {
        return "HelpRequest(id=$id)"
    }
}