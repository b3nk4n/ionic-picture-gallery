export const isBlank = (value: string | null | undefined): boolean => {
    return value == null || value.trim() === '';
}