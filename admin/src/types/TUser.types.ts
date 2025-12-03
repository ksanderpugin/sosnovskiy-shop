export type TUserRole = 'admin' | 'manager' | 'operator' | 'seller' | 'packer' | 'user';

export type TUser = {
    id: string,
    name: string,
    token: string,
    role: TUserRole
}