const randomState = () => {
    const states = [ 'PENDING', 'ACCEPTED', 'REJECTED' ]
    const randomIndex = Math.floor(Math.random() * states.length);
    return states[randomIndex];
}

module.exports = randomState;
