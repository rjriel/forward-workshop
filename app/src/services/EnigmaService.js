import enigma from "enigma.js"
import schema from "enigma.js/schemas/12.170.2.json"

class EnigmaService {
  qix = null
  document = null
  initialized = false

  static instance = null

  async init() {
    console.log("Creating Session...")
    const session = enigma.create({
      schema,
      url: "ws://localhost:19076",
      createSocket: url => new WebSocket(url)
    })
    console.log("Session Created. Opening...")
    this.qix = await session.open()
    this.document = await this.qix.openDoc("Movies.qvf")
    console.log("Document opened.")
    return this.document
  }

  static createInstance() {
    const object = new EnigmaService()
    return object
  }

  static getInstance() {
    if (!EnigmaService.instance) {
      EnigmaService.instance = EnigmaService.createInstance()
    }
    return EnigmaService.instance
  }
}

const enigmaService = EnigmaService.getInstance()
export default enigmaService
