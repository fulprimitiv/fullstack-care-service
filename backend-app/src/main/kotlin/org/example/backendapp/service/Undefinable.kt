package org.example.backendapp.service

class Undefinable<T> private constructor(private val value: T?, private val isDefined: Boolean) {
    companion object {
        fun <T> undefined(): Undefinable<T> = Undefinable(null, false)
        fun <T> of(value: T): Undefinable<T> = Undefinable(value, true)
    }

    fun isDefined(): Boolean = isDefined
    fun get(): T? = value
    fun ifPresent(action: (T) -> Unit) {
        if (isDefined && value != null) {
            action(value)
        }
    }
}