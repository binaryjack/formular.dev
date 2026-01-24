/**
 * Validates all form fields and returns overall validity
 */
import type { IFormular } from '../formular-base.types'

export async function validateForm<T extends object>(this: IFormular<T>): Promise<boolean> {
    return await this.checkAllFieldsAreValid()
}
