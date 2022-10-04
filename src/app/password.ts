export class Password {
    MinimumPasswordAge: number
    MaximumPasswordAge: number
    MinimumPasswordLength: number
    PasswordComplexity: number
    PasswordHistorySize: number
    LockoutBadCount: number
    RequireLogonToChangePassword: number
    ForceLogoffWhenHourExpire: number
    constructor(parameters:number[]) {
        [this.MinimumPasswordAge,        this.MaximumPasswordAge,
        this.MinimumPasswordLength,
        this.PasswordComplexity,
        this.PasswordHistorySize,
        this.LockoutBadCount,
        this.RequireLogonToChangePassword,
        this.ForceLogoffWhenHourExpire]=[...parameters]
    }

}
