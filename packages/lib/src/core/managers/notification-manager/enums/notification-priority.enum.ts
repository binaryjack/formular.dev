export enum NotificationPriorityEnum {
    /** Low priority - processed last */
    LOW = 0,
    /** Normal priority - default priority level */
    NORMAL = 1,
    /** High priority - processed before normal and low */
    HIGH = 2,
    /** Critical priority - processed first */
    CRITICAL = 3
}
