// Function for randomizing the answers to the question


export const shuffleArray = (array: any[]) =>
 [...array].sort(() => Math.random() - 0.5 );
