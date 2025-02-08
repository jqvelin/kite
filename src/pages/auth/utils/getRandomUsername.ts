export const getRandomUsername = () => {
    const randomFirstName =
        firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName =
        lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomNumber = Math.floor(Math.random() * 900) + 100;

    return `${randomFirstName}_${randomLastName + randomNumber}`;
};

const firstNames = [
    "cool",
    "mad",
    "happy",
    "wild",
    "quiet",
    "brave",
    "lucky",
    "silly",
    "gentle",
    "crazy"
];
const lastNames = [
    "veggie",
    "cowboy",
    "panda",
    "tiger",
    "eagle",
    "shark",
    "wolf",
    "lion",
    "fox",
    "bear"
];
