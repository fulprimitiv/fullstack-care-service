package org.example.backendapp.entity

import jakarta.persistence.*
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
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
    private val password: String
) : UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0
    
    override fun getAuthorities(): Collection<GrantedAuthority> {
        return listOf(SimpleGrantedAuthority("ROLE_${role.name}"))
    }

    override fun getPassword(): String {
        return this.password
    }

    override fun getUsername(): String? {
        return this.email
    }

    override fun isEnabled(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

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
