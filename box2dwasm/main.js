// const Box2D = require('box2d-wasm');

let onload = function(){
    Box2D().then((B)=>{
        console.log(B);
    })
}

let terrainBodies = [];

function eraseTerrain(x, y, radius, terrainBodies) {
    terrainBodies.forEach(body => {
        // Get all the fixtures
        for (let f = body.GetFixtureList(); f; f = f.GetNext()) {
            const shape = f.GetShape();
            const vertices = shape.m_vertices;

            const newVertices = vertices.filter(v => {
                const dx = v.x - x;
                const dy = v.y - y;
                return Math.sqrt(dx * dx + dy * dy) > radius;
            });

            if (newVertices.length !== vertices.length) {
                // Remove the old fixture
                body.DestroyFixture(f);
                // Create new shape and fixture
                const newShape = new b2ChainShape();
                newShape.CreateLoop(newVertices, newVertices.length);
                body.CreateFixture(newShape, 0);
            }
        }
    });
}



window.onload = onload;