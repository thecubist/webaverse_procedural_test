/* eslint-disable arrow-parens */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable linebreak-style */
import metaversefile from 'metaversefile'
import * as THREE from 'three'

const { useApp, useLoaders, useFrame, useCleanup, usePhysics, useInternals } =
  metaversefile

const baseUrl = import.meta.url.replace(/(\/)[^\/\/]*$/, '$1')

const physicsIds = []

export default (e) => {
  const app = useApp()
  app.name = 'neon-club'
  const physics = usePhysics()

  const { positions, normals, indices } = physics.dualContouring()

  const geometry = new THREE.BufferGeometry()

  geometry.setIndex(new THREE.BufferAttribute(indices, 1))
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3))

  const material = new THREE.MeshBasicMaterial({
    color: '#aa00ff',
    wireframe: true,
  })

  const mesh = new THREE.Mesh(geometry, material)

  app.add(mesh)

  const terrainPhysics = physics.addGeometry(mesh)
  physicsIds.push(terrainPhysics)

  useFrame(({ timestamp }) => {})
  useCleanup(() => {
    for (const physicsId of physicsIds) 
    {
      physics.removeGeometry(physicsId)
    }
  })
  
  console.debug("ran correctly")
  return app
}
