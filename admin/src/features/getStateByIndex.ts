export const getStateByIndex = (index: number) => {
    switch (index) {
        case 0:
            return 'new';

        case 1:
            return 'in-process';

        case 2:
            return 'confirmed';

        case 3:
            return 'packed';

        case 4:
            return 'sent';

        case 5:
            return 'completed';

        case 9:
            return 'cancelled';

        default:
            return 'new';
    }
}