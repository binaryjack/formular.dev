/**
 * Legacy Semantic Token Mapper - DEPRECATED
 *
 * This file provides compatibility for the old generic style system.
 * NEW CODE SHOULD USE THE ATOMIC STYLE BUILDER INSTEAD.
 *
 * @deprecated Use the new atomic-style-builder system
 */

// Minimal stub to make existing code compile
export const mapSemanticTokenToClass = (
    fov: string,
    shade: string,
    variant: string,
    prefix: string
): string => {
    return `${prefix}-${variant}-${shade}`
}
