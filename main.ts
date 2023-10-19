controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 8 8 8 8 . . . . 
        . . . . . . 8 8 8 8 4 8 . . . . 
        . 8 8 8 8 8 8 8 4 4 8 8 . . . . 
        . . . . . . . 8 8 8 8 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 200, 0)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    sprites.destroy(statusbar.spriteAttachedTo(), effects.spray, 500)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -15
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite, effects.disintegrate, 500)
    scene.cameraShake(4, 500)
})
let statusbar: StatusBarSprite = null
let projectile: Sprite = null
let enemyShip: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . 8 5 5 5 
    . . . . . . . . . . 8 8 8 8 8 . 
    . . . . . . . . 8 8 8 8 8 . . . 
    . . . . . . . 8 8 8 8 8 8 . . . 
    . . . . 8 8 8 8 8 8 8 8 . . . . 
    . . 4 4 4 4 4 4 4 4 4 6 . . . . 
    8 8 8 8 8 8 8 8 8 8 6 6 6 . . . 
    . 8 8 8 8 8 8 8 8 8 6 6 6 . . . 
    . . 4 4 4 4 4 4 4 4 4 6 . . . . 
    . . . . . 8 8 8 8 8 8 8 8 8 . . 
    . . . . . . . . . . 8 8 8 8 . . 
    . . . . . . . . . . . . . 5 5 5 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 100)
mySprite.setStayInScreen(true)
info.setLife(5)
enemyShip.follow(mySprite)
game.splash("Hello traveler! Welcome to Space Shooter!", "")
game.onUpdateInterval(2000, function () {
    enemyShip = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 2 2 . . . . . . 
        . . . . . . . . 7 2 . . . . . . 
        . . . . . . . . 7 2 6 . . . . . 
        . . . . . . . 7 7 2 . . . . . . 
        . . . . . . . 7 2 2 . . . . . . 
        . . . . . . 7 2 2 2 . . . . . . 
        . . . . . 7 7 2 2 2 . . . . . . 
        . . . 2 7 7 2 2 2 2 . . . . . . 
        . . 2 2 2 2 2 2 2 2 . . . . . . 
        . . . . . 7 2 2 2 2 . . . . . . 
        . . . . . 7 7 2 2 2 . . . . . . 
        . . . . . . . 7 7 2 6 . . . . . 
        . . . . . . . . 7 2 . . . . . . 
        . . . . . . . . . 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    enemyShip.x = scene.screenWidth()
    enemyShip.vx = -20
    enemyShip.y = randint(10, scene.screenHeight() - 10)
    statusbar = statusbars.create(15, 2, StatusBarKind.EnemyHealth)
    statusbar.setColor(8, 2)
    statusbar.attachToSprite(enemyShip)
})
