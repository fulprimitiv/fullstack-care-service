package org.example.backendapp.service

import org.example.backendapp.entity.User
import org.example.backendapp.service.command.UpdateUserCommand
import org.example.backendapp.service.repository.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional


@Service
@Transactional(readOnly = true)
class UserService(
    private val userRepository: UserRepository
) : UserDetailsService {

    fun findById(id: Long) = userRepository.getReferenceById(id)
    fun findByEmail(email: String) = userRepository.findByEmail(email)
        ?: throw RuntimeException("User with email $email is not found")

    @Transactional
    fun create(user: User): User {
        return userRepository.save(user)
    }

    @Transactional
    fun updateUser(command: UpdateUserCommand): User {
        val user = userRepository.getReferenceById(command.id)
        command.name.ifPresent {
            user.name = it
        }
        command.phone.ifPresent {
            user.phone = it
        }
        command.address.ifPresent {
            user.address = it
        }
        command.birthDate.ifPresent {
            user.birthday = it
        }

        return user.also { userRepository.save(it) }
    }

    override fun loadUserByUsername(username: String): UserDetails? {
        return findByEmail(username)
    }
}