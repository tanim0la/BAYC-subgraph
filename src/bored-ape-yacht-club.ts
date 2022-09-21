import {
  BoredApeYachtClub as BoredApeYachtClubContract,
  Transfer as TransferEvent
} from "../generated/BoredApeYachtClub/BoredApeYachtClub"
import { Ape, User } from "../generated/schema"


export function handleTransfer(event: TransferEvent): void {
  let ape = Ape.load(event.params.tokenId.toString())

  if(!ape) {
    ape = new Ape(event.params.tokenId.toString())
    ape.creator = event.params.to.toHexString()
    ape.createdAtTimestamp = event.block.timestamp
    ape.apeID = event.params.tokenId
    
    let apeContract = BoredApeYachtClubContract.bind(event.address)
    ape.contentURI = apeContract.tokenURI(event.params.tokenId)
  }

  ape.owner = event.params.to.toHexString()
  ape.save()

  // Load from the source (Data store)
  let user = User.load(event.params.to.toHexString())
  
  if(!user) {
    user = new User(event.params.to.toHexString())
    user.save()
  }
}

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.BAYC_PROVENANCE(...)
  // - contract.MAX_APES(...)
  // - contract.REVEAL_TIMESTAMP(...)
  // - contract.apePrice(...)
  // - contract.balanceOf(...)
  // - contract.baseURI(...)
  // - contract.getApproved(...)
  // - contract.isApprovedForAll(...)
  // - contract.maxApePurchase(...)
  // - contract.name(...)
  // - contract.owner(...)
  // - contract.ownerOf(...)
  // - contract.saleIsActive(...)
  // - contract.startingIndex(...)
  // - contract.startingIndexBlock(...)
  // - contract.supportsInterface(...)
  // - contract.symbol(...)
  // - contract.tokenByIndex(...)
  // - contract.tokenOfOwnerByIndex(...)
  // - contract.tokenURI(...)
  // - contract.totalSupply(...)

