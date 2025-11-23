package org.example.backendapp.entity

import jakarta.persistence.*
import java.time.Instant

@Entity(name = "tbl_users")
data class User(
    var name: String,
    var phone: String,
    var address: String,
    var birthday: Instant,
    @Column(unique = true)
    val email: String,
    @Enumerated(EnumType.STRING)
    val role: UserRole,
    val registeredAt: Instant = Instant.now(),
    val password: String
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0
    
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is User) return false

        if (id != other.id) return false

        return true
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    override fun toString(): String {
        return "User(id=$id, name='$name')"
    }
}