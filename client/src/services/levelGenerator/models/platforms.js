const platformsById = {
    'rise-of-the-tide': {
        groundLayer: [
            [[0,0,0,0],[0,77,78,0],[0,91,92,0],[0,0,0,0]],
            [[0, 0, 0, 0], [77, 111, 111, 78], [91, 130, 130, 92], [0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0], [77, 111, 111, 142, 111, 142, 78], [91, 130, 130, 144, 130, 144, 92], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0], [0, 18, 19, 16], [15, 79, 23, 52], [58, 93, 39, 34], [112, 113, 34, 83], [77, 111, 111, 78], [91, 130, 130, 92], [0, 0, 0, 0]],
            [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,77,111,78,0,0,0,0,0,0,0,0,0,0,0,0],[0,91,130,92,0,0,0,77,111,78,0,0,0,0,0,0],[0,0,0,0,0,0,0,91,130,92,0,0,0,77,78,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,91,92,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
            [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,64,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,64,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,64,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,64,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],
            [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,77,111,78,0],[0,0,0,0,0,0,0,77,78,0,0,0,0,91,130,92,0],[0,77,111,78,0,0,0,91,92,77,78,0,0,0,0,0,0],[0,91,130,92,0,0,0,0,0,91,92,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
            [[0,0,0,0,0,0,0],[0,97,98,99,100,105,0],[0,0,122,127,121,0,0],[0,0,37,57,31,0,0],[0,0,37,57,121,0,0],[0,0,58,67,31,0,0],[0,84,85,136,121,0,0],[0,0,58,67,31,0,0],[0,0,2,57,52,0,0],[0,0,21,67,34,0,0],[0,0,37,57,121,0,0],[0,0,2684354681,2684354591,0,0,0],[0,0,0,0,0,0,0]],
            [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,98,99,243,100,105,97,64,97,97,64,97,64,97,98,99,100,104,104,105,0],[0,122,127,126,206,0,0,0,0,0,0,0,0,0,245,127,125,126,127,0,0],[0,0,2684354681,2684354591,0,0,0,0,0,0,0,0,0,0,230,216,230,230,216,0,0]],
            [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,18,19,20,17,63,16,18,19,20,17,18,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,17,63,34,13,35,67,32,33,34,13,35,45,46,31,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,2,3,30,4,80,12,53,65,66,4,80,56,57,11,110,0,0,0,0,0,0,0],[0,0,0,0,0,0,17,110,79,22,23,44,45,46,79,22,23,44,45,128,112,113,107,20,0,0,0,0,0,0],[0,0,0,0,0,0,2,57,11,38,39,55,114,12,53,38,39,29,49,50,51,59,51,131,96,0,0,0,0,0],[0,0,0,0,0,15,79,67,32,33,34,13,35,46,79,107,108,112,76,61,62,60,76,61,131,14,0,0,0,0],[0,0,0,0,0,58,11,12,53,65,66,4,93,89,90,29,56,129,59,59,49,73,47,88,141,34,0,0,0,0],[0,0,0,0,15,67,32,46,79,22,23,44,113,107,108,109,128,112,133,60,76,61,62,167,100,104,229,0,0,0],[0,0,0,20,90,29,79,129,93,89,90,29,29,48,49,50,51,131,59,62,73,47,24,180,125,126,121,0,0,0],[0,0,0,2,108,109,128,112,113,107,108,109,133,60,76,61,62,132,133,62,167,100,197,34,45,46,31,0,0,0],[0,0,0,21,49,50,51,131,59,48,49,50,51,76,133,62,132,73,47,24,124,124,127,4,114,57,121,0,0,0],[0,0,0,37,76,132,137,138,133,60,76,139,178,132,137,138,132,167,100,197,32,33,34,44,35,67,31,0,0,0],[0,0,0,58,184,73,184,73,138,195,184,193,194,73,184,73,88,180,124,127,11,3221225494,3221225551,3221225518,3221225504,3221225539,3221225487,0,0,0],[0,97,98,99,100,104,100,104,100,104,100,204,205,104,100,104,197,13,35,67,32,3221225537,3221225525,3221225484,3221225483,3221225530,0,0,0,0],[0,0,122,125,124,127,125,126,123,206,124,207,208,126,123,206,124,4,80,12,53,3221225505,3221225504,3221225539,3221225551,3221225487,0,0,0,0],[0,0,3221225492,3221225579,3221225585,3221225584,3221225600,3221225517,3221225516,3221225495,3221225494,3221225551,3221225518,3221225517,3221225516,3221225495,3221225494,3221225551,45,46,79,3221225510,3221225483,3221225529,3221225474,0,0,0,0,0],[0,0,0,3221225582,3221225483,3221225529,3221225528,3221225552,3221225476,3221225538,3221225537,3221225525,3221225484,3221225552,3221225476,3221225502,3221225475,3221225474,3221225524,3221225495,3221225494,3221225485,3221225506,3221225582,3221225489,0,0,0,0,0],[0,0,0,0,3221225503,3221225518,3221225517,3221225507,3221225485,3221225506,3221225505,3221225504,3221225532,3221225580,3221225579,3221225585,3221225584,3221225600,3221225581,3221225551,3221225617,3221225491,3221225490,0,0,0,0,0,0,0],[0,0,0,0,0,3221225490,3221225489,3221225492,3221225491,3221225490,3221225488,3221225535,3221225489,3221225568,3221225510,3221225502,3221225475,3221225538,3221225537,3221225474,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,3221225486,3221225580,3221225579,3221225506,3221225582,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3221225489,3221225488,3221225490,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
        ],
        collisionTiles: [24,64,77,78,91,92,97,98,99,100,104,105,111,123,124,125,126,127,130,167,180,195,197,204,205,206,207,208,229,243]
    },
    'hall-of-ages': {
        groundLayer: [
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 307, 157, 158, 157, 158, 157, 158, 157, 158, 308, 0], [0, 309, 310, 311, 310, 311, 310, 311, 310, 311, 312, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0], [0, 307, 157, 308, 0], [0, 309, 310, 312, 0], [0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0], [0, 307, 157, 158, 308, 0], [0, 309, 310, 311, 312, 0], [0, 0, 0, 0, 0, 0]]
        ],
        collisionTiles: [307, 157, 158, 308, 309, 310, 311, 312]
    }
};
export default platformsById;
