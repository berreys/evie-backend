export function isValidUser(param: any): boolean {
    return !(typeof param.firstName !== 'string' || 
             typeof param.lastName !== 'string' || 
             typeof param.email !== 'string' ||
             typeof param.username !== 'string' || 
             typeof param.password !== 'string'
            );
}