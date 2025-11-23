package org.example.backendapp.service

import org.example.backendapp.entity.User
import org.example.backendapp.service.command.CreateUserCommand
import org.example.backendapp.service.command.UpdateUserCommand
import org.example.backendapp.service.repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class UserService(
    private val userRepository: UserRepository
) {

    fun findById(id: Long) = userRepository.getReferenceById(id)

    @Transactional
    fun createUser(command: CreateUserCommand): User {
        return User(
            name = command.name,
            phone = command.phone,
            address = command.address,
            birthday = command.birthDate,
            email = command.email,
            role = command.role,
            password = command.password
        ).also { userRepository.save(it) }
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
}