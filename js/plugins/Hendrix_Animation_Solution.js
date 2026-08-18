/*:
 * @target MZ
 * @plugindesc Bring multiple animation features to RPG Maker. The animation plugin you need for every game project
 * @author Sang Hendrix
 * @url https://sanghendrix.itch.io
 *
 * @help
 * Verion 2.0.7
 * ----------------------------------------------------------------------------
 * This RPG Maker MZ plugin brings modern game engine animation features into
 * RPG Maker. Idle/Walk/Run cycles, custom animations for characters,
 * unlimited spritesheet frames, 8 directions sprite, 1 row spritesheet,
 * display VFX on maps, and a VFX builder, this plugin has it all.
 * ----------------------------------------------------------------------------
 * MOVEMENT ROUTE SCRIPT CALL
 * | toFrame(x) |
 * Set the character image to frame x (start from 1)
 *
 * | playFrames(first frame, last frame, speed) |
 *  Example: playFrames(1, 6, 3)
 *  Play from frame 1 - 6. Each frame wait 3 frames (like Wait command)
 *  The lower the speed, the faster the animation
 * ----------------------------------------------------------------------------
 * HOW TO USE (READ THIS, IT WILL HELP YOU)
 * ----------------------------------------------------------------------------
 * Video tutorial: https://www.youtube.com/watch?v=nC0W4g6SZzQ
 * ---------------------------------
 * ■ OPEN VFX DESIGNER
 * ---------------------------------
 * Go in-game and press the VFX Designer button assigned in plugin parameter
 * 
 * ■ PLAY VFX DESIGNED VIA THE DESIGNER
 * ---------------------------------
 * Use plugin command Show VFX in Library
 * 
 * ■ PLAY VFX ON MAP USING A SPRITESHEET
 * ---------------------------------
 * 1. Use plugin command Show VFX
 * 2. Select your spritesheet file and assign Row and Column it has
 *
 * ■ PLAY VFX ON MAP USING MULTIPLE SEPERATED IMAGES
 * ---------------------------------
 * 1. Use plugin command Show VFX
 * 2. Put your files inside pictures/frames folder
 * 3. Assign how many frames you have
 *
 * ■ PLAY CHARACTER ANIMATIONS (hoeing, dancing, sleeping, attacking, etc.)
 * ---------------------------------
 * 1. Prepare a single character sprite with name like: $hero_sleeping_f8.png.
 * This means this spritesheet has 8 frames of the hero sleeping
 * 2. Change your character graphic to $hero_sleeping_f8.png
 * 3. Inside a movement route command, use the script call: playFrames(1, 8, 3)
 * This will play from frame 1 to 8 with the wait time from each frame is 3
 * You can also call script like $gamePlayer.playFrames(1,8,3)
 * 
 * ■ CHANGE CHARACTER FRAME INDEX
 * ---------------------------------
 * 1. Do step 1 and 2 above
 * 2. Call this script: toFrame(x). X is the frame index you want your character
 * to set to
 *
 * ■ USE SINGLE ROW SPRITESHEET
 * ---------------------------------
 * Name your spritesheet as filename_fx.png
 * Example: Ice_f4.png. This means your spritesheet has 4 frames
 * 
 * ■ MIRROR/FLIP SINGLE ROW SPRITESHEET
 * ---------------------------------
 * Simply call Turn Left to no-flip, Turn Right to flip
 *
 * ■ SET UP IDLE WALK RUN FOR CHARACTERS
 * ---------------------------------
 * 1. Prepare files with name like:
 * $hero_Walk.png or $hero_Walk_fx.png (x = amount of frame)
 * $hero_Idle.png or $hero_Idle_fx.png
 * $hero_Run.png or $hero_Run_fx.png
 * 2. You can also change the keyword Walk Idle Run to something else
 * via plugin parameter, like Walk to Moving or something like that
 * 
 * ■ SET UP CUSTOM IDLE WALK RUN SPEED FOR EVENTS
 * ---------------------------------
 * Add these comments to your event:
 * <frame idle speed: 5> -> Wait 5 frames per animation frame
 * <frame walk speed: x>
 * <frame run speed: x>
 * This will override Global Frame Speed setting in parameter
 *
 * ■ SET UP 8 Directions Sprite
 * ---------------------------------
 * 1. Prepare files with name like:
 * $Hero_8dir.png or $Hero_Idle_8dir.png or $Hero_Idle_8dir_f6.png
 * 2. 8 dir spritesheet needs to follow this order:
 * Bottom (2) (look at your numpad to see the direction)
 * Bottom Left (1)
 * Bottom Right (3)
 * Left (4)
 * Right (6)
 * Up (8)
 * Up Left (7)
 * Up Right (9)
 *
 * Default RPG Maker order
 * Bottom (2)
 * Left (4)
 * Right (6)
 * Up (8)
 *
 * To check if a character is facing at a direction, use Conditional:
 * checkDirection('player'/eventId, number from numpad)
 *
 * To get character's direction, use script:
 * getDirection('player'/eventId)
 *
 * ----------------------------------------------------------------------------
 * PRELOAD
 * ----------------------------------------------------------------------------
 * Console command to see cache size in case you use preload feature:
 * PermanentImageCache.logDetailedCacheStatus();
 *
 * The larger the dimmension of the file, the higher mb it costs.
 * This cache will never be cleared to guarenteed a smooth gameplay
 * and fixed blinking issue when you change characters' images with
 * the cost of memory. On PC, most machine has above 8GB RAM, but on
 * mobiles it's still not common so pay attention to it.
 *
 * To summarize, put important stuff to subfolders and preload those
 * subfolders (best use for mobile optimization).
 * ----------------------------------------------------------------------------
 * For support, please visit Discord:
 * https://x.com/sanghendrix96
 * Discord: https://discord.gg/YKPscqHV8b
 * ----------------------------------------------------------------------------
 *
 * @param -----------s--s---s--2342-----
 * @text -----------------------
 * @default ---------------------
 * 
 * @param showDockButton
 * @text Show VFX Designer Button
 * @type boolean
 * @default true
 * @desc Show the VFX Designer button on the dock (test mode only)
 * 
 * @param -----------s--s---s-------
 * @text -----------------------
 * @default ---------------------
 *
 * @param PRELOAD
 *
 * @param -------------s--s--------
 * @text -----------------------
 * @default ---------------------
 *
 * @param Enable Preload
 * @text Enable Preload System
 * @desc Preload images. Improve performance and fix blinking issues when changing sprites (RPG Maker problem).
 * @type boolean
 * @default true
 *
 * @param Preload Folders
 * @text Image Preload Settings
 * @type struct<PreloadFolderList>
 * @desc Folders to preload. Only support preloading characters and pictures folder.
 * @default {"folders":"[\"img/pictures/Animation\",\"img/pictures/frames\",\"img/characters\"]"}
 *
 * @param -----------s--s----------
 * @text -----------------------
 * @default ---------------------
 *
 * @param BASIC SETTINGS
 *
 * @param -------------s----------
 * @text -----------------------
 * @default ---------------------
 *
 * @param Frame Keyword
 * @text Frame Keyword
 * @desc Keyword in character filename to identify frame count. Default is 'f' (e.g., _f8 means 8 frames)
 * @type string
 * @default f
 *
 * @param Frame Speed
 * @text Global Frame Speed
 * @default 1.1
 * @desc For files with extended frames (filename_fx). The higher the number, the quicker the character frames play
 *
 * @param Player Frame Modifier
 * @text Player Frame Speed
 * @type struct<PlayerFrameModifier>
 * @desc Frame speeds for player in different states. Leave empty to use Global Frame Speed
 * @default {"idleSpeed":"","walkSpeed":"","runSpeed":""}
 *
 * @param Nearest
 * @text Render Animation in Nearest
 * @desc True is best for pixel art, False is rendered for other type of arts
 * @type boolean
 * @default true
 *
 * @param -----------------------
 * @text -----------------------
 * @default ---------------------
 *
 * @param IDLE/MOVE GRAPHIC
 *
 * @param -----------------z------
 * @text -----------------------
 * @default ---------------------
 *
 * @param Enable Switch
 * @desc The feature is ON by default. To have more control over it, assign to a switch.
 * @type switch
 *
 * @param Animation Keywords
 * @text Animation Keywords
 * @type struct<AnimKeywords>
 * @desc Configure the keywords used to identify different animation states
 * @default {"walkName":"Walk","idleName":"Idle","runName":"Run"}
 *
 * @command showAnimationFromLibrary
 * @text Show VFX from Library
 * @desc Play a saved animation from the library
 *
 * @arg animationName
 * @text Animation Name
 * @desc Name of the animation saved in the library
 * @type string
 * @default
 *
 * @arg eventId
 * @text Target to Display
 * @desc The target to show the animation on. Support: eventID | player | this | eventID front | player front | this front
 * @type string
 * @default this
 *
 * @arg loopCount
 * @text Loop Count
 * @desc Number of times the animation should loop. Write "infinite" to loop forever
 * @type string
 * @default 1
 *
 * @arg stickMode
 * @text Stick Mode
 * @desc Animation to stay fixed at initial position instead of following the target
 * @type boolean
 * @default false
 *
 * @command showAnimatedPicture
 * @text Show VFX
 * @desc Displays an animation on an event or the player.
 *
 * @arg note
 * @text Note
 * @desc Does nothing. It's just a note incase you need it
 * @type string
 * @default
 *
 * @arg fps
 * @text FPS
 * @desc Speed of the animation in frames per second.
 * @type number
 * @min 1
 * @default 60
 *
 * @arg loopCount
 * @text Loop Count
 * @desc Number of times the animation should loop. Write "infinite" to loop forever.
 * @type string
 * @default 1
 *
 * @arg -----------------
 * @text ------------------
 * @type string
 * @default ------------------
 *
 * @arg animationSettings
 * @text Use Seperated Frames
 * @type struct<AnimationSettings>
 * @desc Display animation using seperate frame files. Leave empty if use Spritesheet.
 * @default
 *
 * @arg spritesheetSettings
 * @text Use Spritesheet
 * @type struct<SpritesheetSettings>
 * @desc Display animation using a spritesheet files. Leave empty if use Seperated Frames.
 * @default
 *
 * @arg ------------------
 * @text ------------------
 * @type string
 * @default ------------------
 *
 * @arg positionSettings
 * @text Position Settings
 * @type struct<PositionSettings>
 * @desc Settings for positioning the animation on events.
 * @default
 *
 * @arg visualSettings
 * @text Visual Settings
 * @type struct<VisualSettings>
 * @desc Visual properties like scale, opacity, and blend mode.
 * @default
 *
 * @arg transformSettings
 * @text Transform Settings
 * @type struct<FlipSettings>
 * @desc Settings for randomize property like rotating, mirror.
 * @default
 *
 * @arg bloomSettings
 * @text Bloom Settings
 * @type struct<BloomSettings>
 * @desc Settings for the bloom post-processing effect.
 * @default
 *
 * @arg soundSettings
 * @text Sound Settings
 * @type struct<SoundSettings>
 * @desc Settings for frame-specific sound effects. Most of the time you won't use this.
 * @default
 *
 * @command removeAnimation
 * @text Remove VFX
 * @desc Removes all VFX from a specific event or character.
 *
 * @arg eventId
 * @text Event ID
 * @desc The event ID to remove animations from. Use  this  for current event. Use  player  for game player.
 * @type string
 * @default this
 *
 * @arg notetag
 * @text Note/Name
 * @desc If specified, only removes VFX with this note/name. Leave empty to remove all VFX.
 * @type string
 * @default
 *
 * @arg effect
 * @text Removal Effect
 * @desc Apply an effect while removing the animation.
 * @type select
 * @option None
 * @value none
 * @option Fade Out
 * @value fadeOut
 * @option Scale Out
 * @value scaleOut
 * @default none
 *
 * @arg duration
 * @text Effect Duration
 * @desc How long the removal effect should take in frames (60 frames = ~1s). Empty = instant.
 * @type number
 * @default
 *
 * @command frameSpeedModifier
 * @text Frame Speed Modifier
 * @desc Modify the animation frame speed multiplier during gameplay
 *
 * @arg speedValue
 * @text Speed Value
 * @desc New frame speed modifier value. Higher = faster animations
 * @type number
 * @decimals 2
 * @min 0.1
 * @default 1.1
 */
/*~struct~AnimationSettings:
 * @param baseFilename
 * @text Base Filename
 * @desc The base filename of the frames (e.g., 'Windy_').
 * @type string
 *
 * @param frameCount
 * @text Frame Count
 * @desc The amount of frames (e.g., if 40 then the plugin will understand there are files Windy_1, Windy_2,... Windy_40).
 * @type number
 * @min 1
 * @default 1
 */
/*~struct~SpritesheetSettings:
 * @param spritesheetFile
 * @text Spritesheet File
 * @desc Select spritesheet file
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param row
 * @text Number of Rows
 * @desc Number of rows in spritesheet.
 * @type number
 * @min 1
 * @default 1
 *
 * @param column
 * @text Number of Columns
 * @desc Number of columns in spritesheet.
 * @type number
 * @min 1
 * @default 1
 *
 * @param frameRange
 * @text Only Play Range
 * @desc Play only specific frame range (e.g. "1-15" plays frames 1 to 15). Leave empty to play all frames.
 * @type string
 * @default
 */

/*~struct~PositionSettings:
 * @param eventId
 * @text Event to Display
 * @desc Support: eventID | player | this | <notetag> | eventID front | player front | this front
 * @type string
 * @default this
 *
 * @param offsetX
 * @text Offset X
 * @desc Horizontal offset for the animation relative to the target's position.
 * @type number
 * @default 0
 * @min -9999
 *
 * @param offsetY
 * @text Offset Y
 * @desc Vertical offset for the animation relative to the target's position.
 * @type number
 * @default 0
 * @min -9999
 *
 * @param zIndex
 * @text Z-Index Layer
 * @desc 0-3: Below characters. 4-8: above characters. 9: above everything. Use  auto  to use event's z-index.
 * @type string
 * @default auto
 *
 * @param origin
 * @text Origin Point
 * @desc Sets the origin point of the animation.
 * @type select
 * @option Center
 * @value center
 * @option Top Middle
 * @value top
 * @option Bottom Center
 * @value bottom
 * @default center
 *
 * @param stickMode
 * @text Stick Mode
 * @desc If true, animation will stay fixed at initial position instead of following the target.
 * @type boolean
 * @default false
 */

/*~struct~VisualSettings:
 * @param scalePercent
 * @text Scale Percentage
 * @desc Scale of the animation in percentage.
 * @type number
 * @default 100
 * @min 0
 * @max 999
 *
 * @param opacity
 * @text Opacity
 * @desc Opacity of the animation (0-255).
 * @type number
 * @default 255
 * @min 0
 * @max 255
 *
 * @param hue
 * @text Hue
 * @desc Hue adjustment for the animation (-180 to 180).
 * @type number
 * @min -180
 * @max 180
 * @default 0
 *
 * @param blendMode
 * @text Blend Mode
 * @desc Blend mode for the animation.
 * @type select
 * @option Normal
 * @value Normal
 * @option Screen
 * @value Screen
 * @option Add
 * @value Add
 * @option Multiply
 * @value Multiply
 * @default Normal
 *
 * @param playInReverse
 * @text Play in Reverse
 * @desc If true, the animation will play backwards from end to start.
 * @type boolean
 * @default false
 */

/*~struct~FlipSettings:
 * @param flip
 * @text Flip X
 * @desc If true, the animation will be mirrored horizontally.
 * @type boolean
 * @default false
 *
 * @param flipY
 * @text Flip Y
 * @desc If true, the animation will be mirrored vertically.
 * @type boolean
 * @default false
 *
 * @param randomFlipX
 * @text Random Flip X
 * @desc If true, the animation will be randomly mirrored horizontally.
 * @type boolean
 * @default false
 *
 * @param randomFlipY
 * @text Random Flip Y
 * @desc If true, the animation will be randomly mirrored vertically.
 * @type boolean
 * @default false
 *
 * @param rotation
 * @text Rotation
 * @desc Rotation of the animation in degrees.
 * @type number
 * @default 0
 *
 * @param randomRotation
 * @text Random Rotation
 * @desc Applies random rotation to the animation
 * @type boolean
 * @default false
 *
 * @param ralkdfhowiyrmdf
 * @text ---------------------
 * @param xcvsf23
 * @text ANIMATION
 * @param asdasczxc
 * @text ---------------------
 *
 * @param openingAnimation
 * @text Opening Animation
 * @desc Apply an effect when the animation starts playing
 * @type select
 * @option None
 * @value none
 * @option Fade In
 * @value fadeIn
 * @option Scale In
 * @value scaleIn
 * @option Scale In - Width Only
 * @value scaleInWidth
 * @option Scale In - Height Only
 * @value scaleInHeight
 * @default none
 *
 * @param endingAnimation
 * @text Ending Animation
 * @desc Apply an effect when the animation is about to end (will start at the end of first loop)
 * @type select
 * @option None
 * @value none
 * @option Fade Out
 * @value fadeOut
 * @option Scale Out
 * @value scaleOut
 * @default none
 *
 * @param animationDuration
 * @text Animation Duration
 * @desc Duration for both opening and ending animation in frames (60 frames = ~1s)
 * @type number
 * @default 30
 */

/*~struct~BloomSettings:
 * @param bloomEffect
 * @text Bloom Effect
 * @desc Apply a bloom effect to the animation.
 * @type boolean
 * @default false
 *
 * @param blurAmount
 * @text Blur Amount
 * @desc Amount of blur. Control how far the blur spread.
 * @type number
 * @min 1
 * @default 15
 *
 * @param intensity
 * @text Intensity
 * @desc Intensity of the bloom effect.
 * @type number
 * @min 0
 * @default 255
 *
 * @param tintColor
 * @text Tint Color
 * @desc Tint color (hex code). Leave default if don't know what to do.
 * @type text
 * @default #FFFFFF
 */

/*~struct~SoundSettings:
 * @param sfxSettings
 * @text SFX Settings
 * @type struct<SFXSetting>[]
 * @desc Settings for playing sound effects at specific frames.
 * @default []
 */
/*~struct~SFXSetting:
 * @param frame
 * @text Frame Number
 * @type number
 * @desc The frame number at which the sound effect will play.
 * @default 1
 * @min 1
 *
 * @param sfxFile
 * @text SFX File
 * @type file
 * @dir audio/se
 * @desc The sound effect file to play.
 *
 * @param volume
 * @text Volume
 * @type number
 * @desc Volume of the sound effect (0-100).
 * @default 90
 * @min 0
 * @max 100
 *
 * @param pitch
 * @text Pitch
 * @type number
 * @desc Pitch of the sound effect (50-150).
 * @default 100
 * @min 50
 * @max 150
 */
/*~struct~PreloadFolderList:
 * @param folders
 * @text Folders to Preload
 * @type string[]
 * @desc e.g. img/characters or img/pictures or img/pictures/frames (must have if use Show Animation seperate files method)
 * @default []
 */
/*~struct~AnimKeywords:
 * @param walkName
 * @text Walk Animation Keyword
 * @type text
 * @desc Keyword in character filename to identify walking animation
 * @default Walk
 *
 * @param idleName
 * @text Idle Animation Keyword
 * @type text
 * @desc Keyword in character filename to identify idle animation
 * @default Idle
 *
 * @param runName
 * @text Run Animation Keyword
 * @type text
 * @desc Keyword in character filename to identify running animation
 * @default Run
 */
/*~struct~PlayerFrameModifier:
 * @param idleSpeed
 * @text Idle Animation Speed
 * @type number
 * @decimals 2
 * @desc Leave empty to use Global Frame Speed
 * @default
 *
 * @param walkSpeed
 * @text Walk Animation Speed
 * @type number
 * @decimals 2
 * @desc Leave empty to use Global Frame Speed
 * @default
 *
 * @param runSpeed
 * @text Run Animation Speed
 * @type number
 * @decimals 2
 * @desc Leave empty to use Global Frame Speed
 * @default
 */

var Imported = Imported || {};
Imported.Hendrix_Animation_Solution = true;

var detectedIdleGraphic = null;
var detectedWalkGraphic = null;
var detectedRunGraphic = null;

(function () {
  const pluginName = "Hendrix_Animation_Solution";
  const parameters = PluginManager.parameters(pluginName);
  const showDockButton = parameters["showDockButton"] !== "false";
  const isNearest = parameters["Nearest"] === "true";
  const enableSwitch = Number(parameters["Enable Switch"] || 0);
  const enablePreload = parameters["Enable Preload"] === "true";
  const frameKeyword = parameters["Frame Keyword"] || "f";
  const preloadSettings = parameters["Preload Folders"]
    ? JSON.parse(parameters["Preload Folders"])
    : { folders: [] };
  const animKeywordsParam = parameters["Animation Keywords"]
    ? JSON.parse(parameters["Animation Keywords"])
    : { walkName: "Walk", idleName: "Idle", runName: "Run" };
  const playerFrameModifierParam = parameters["Player Frame Modifier"]
    ? JSON.parse(parameters["Player Frame Modifier"])
    : { idleSpeed: "", walkSpeed: "", runSpeed: "" };
  let PLAYER_IDLE_SPEED = playerFrameModifierParam.idleSpeed
    ? Number(playerFrameModifierParam.idleSpeed)
    : null;
  let PLAYER_WALK_SPEED = playerFrameModifierParam.walkSpeed
    ? Number(playerFrameModifierParam.walkSpeed)
    : null;
  let PLAYER_RUN_SPEED = playerFrameModifierParam.runSpeed
    ? Number(playerFrameModifierParam.runSpeed)
    : null;
  let IDLE_KEYWORD = animKeywordsParam.idleName || "";
  let WALK_KEYWORD = animKeywordsParam.walkName || "";
  let RUN_KEYWORD = animKeywordsParam.runName || "";
  let preloadFolders = [];
  let sharedBloomFilter = null;
  let bloomFilterUsers = 0;

  const BLEND_MODES = {
    Screen: PIXI.BLEND_MODES.SCREEN,
    Add: PIXI.BLEND_MODES.ADD,
    Multiply: PIXI.BLEND_MODES.MULTIPLY,
    Normal: PIXI.BLEND_MODES.NORMAL,
  };

  const FRONT_DIRECTION_OFFSETS = {
    1: { dx: -1, dy: 1 },
    2: { dx: 0, dy: 1 },
    3: { dx: 1, dy: 1 },
    4: { dx: -1, dy: 0 },
    6: { dx: 1, dy: 0 },
    7: { dx: -1, dy: -1 },
    8: { dx: 0, dy: -1 },
    9: { dx: 1, dy: -1 },
  };

  function parseFrontTarget(rawEventId) {
    const eventId = String(rawEventId || "").trim();
    const match = eventId.match(/^(.*?)\s+front$/i);
    if (match) {
      return { eventId: match[1].trim(), showInFront: true };
    }
    return { eventId, showInFront: false };
  }

  function getFrontOffset(target) {
    const dir = FRONT_DIRECTION_OFFSETS[target.direction()] || FRONT_DIRECTION_OFFSETS[2];
    return {
      x: ($gameMap.tileWidth() / 2) * dir.dx,
      y: ($gameMap.tileHeight() / 2) * dir.dy,
    };
  }

  try {
    preloadFolders = JSON.parse(preloadSettings.folders || "[]");
  } catch (e) {
    console.error("Error parsing preload folders:", e);
    preloadFolders = [];
  }

  class PermanentImageCache {
    static _permanentCache = {};
    static _preloadedPaths = new Set();
    static _loadingStatus = {
      total: 0,
      loaded: 0,
      failed: 0,
    };

    static load(folder, filename) {
      if (!filename) {
        return ImageManager._emptyBitmap;
      }

      filename = filename.replace(/\\/g, "/");
      const url = this._makePath(folder, filename);

      if (!enablePreload) {
        return ImageManager.loadBitmap(folder, filename);
      }

      if (!this._permanentCache[url]) {
        this._loadingStatus.total++;
        const bitmap = Bitmap.load(url);

        bitmap.addLoadListener(() => {
          if (bitmap.isError()) {
            this._loadingStatus.failed++;
            //if (Utils.isOptionValid('test')) {
            //    console.warn(`Failed to load image: ${url}`);
            //}
            // Remove from cache if failed
            delete this._permanentCache[url];
            this._preloadedPaths.delete(url);
          } else {
            this._loadingStatus.loaded++;
            //if (Utils.isOptionValid('test')) {
            //    console.log(`Loaded image: ${url}`);
            //}
          }
          this._updateLoadingProgress();
        });

        //if (Utils.isOptionValid('test')) {
        //    console.log(`Adding to cache: ${url}`);
        //}

        this._permanentCache[url] = bitmap;
        this._preloadedPaths.add(url);
      } else {
        //if (Utils.isOptionValid('test')) {
        //    console.log(`Serving from cache: ${url}`);
        //}
      }

      return this._permanentCache[url];
    }

    static _makePath(folder, filename) {
      return folder + Utils.encodeURI(filename) + ".png";
    }

    static isPreloaded(folder, filename) {
      const url = this._makePath(folder, filename);
      return this._preloadedPaths.has(url);
    }

    static _updateLoadingProgress() {
      const total = this._loadingStatus.total;
      const loaded = this._loadingStatus.loaded;
      const failed = this._loadingStatus.failed;
      const progress = (((loaded + failed) / total) * 100).toFixed(1);

      if (Utils.isOptionValid("test")) {
        console.log(
          `Preload progress: ${progress}% (${loaded} loaded, ${failed} failed, ${total} total)`
        );
      }

      if (loaded + failed === total) {
        console.log(
          `Preload complete! Successfully loaded ${loaded}/${total} images.`
        );
        if (failed > 0) {
          console.warn(`Failed to load ${failed} images.`);
        }
      }
    }

    static getLoadingStatus() {
      return { ...this._loadingStatus };
    }

    static cleanInvalidImages() {
      for (const url in this._permanentCache) {
        const bitmap = this._permanentCache[url];
        if (bitmap.isError()) {
          delete this._permanentCache[url];
          this._preloadedPaths.delete(url);
          console.warn(`Removed invalid image from permanent cache: ${url}`);
        }
      }
    }

    static getDetailedCacheInfo() {
      const details = {
        totalMemoryMB: 0,
        files: [],
        summary: {
          totalFiles: 0,
          bySize: {
            huge: { count: 0, size: 0 }, // > 16MB
            large: { count: 0, size: 0 }, // 4-16MB
            medium: { count: 0, size: 0 }, // 1-4MB
            small: { count: 0, size: 0 }, // < 1MB
          },
        },
      };

      for (const url in this._permanentCache) {
        const bitmap = this._permanentCache[url];
        if (bitmap && bitmap.baseTexture) {
          const width = bitmap.width;
          const height = bitmap.height;
          const memoryMB = (width * height * 4) / (1024 * 1024);

          details.totalMemoryMB += memoryMB;

          const fileInfo = {
            url: url,
            dimensions: `${width}x${height}`,
            memoryMB: memoryMB.toFixed(2),
          };
          details.files.push(fileInfo);

          if (memoryMB > 16) {
            details.summary.bySize.huge.count++;
            details.summary.bySize.huge.size += memoryMB;
          } else if (memoryMB > 4) {
            details.summary.bySize.large.count++;
            details.summary.bySize.large.size += memoryMB;
          } else if (memoryMB > 1) {
            details.summary.bySize.medium.count++;
            details.summary.bySize.medium.size += memoryMB;
          } else {
            details.summary.bySize.small.count++;
            details.summary.bySize.small.size += memoryMB;
          }
        }
      }

      details.summary.totalFiles = details.files.length;
      details.files.sort(
        (a, b) => parseFloat(b.memoryMB) - parseFloat(a.memoryMB)
      );

      return details;
    }

    static logDetailedCacheStatus() {
      const details = this.getDetailedCacheInfo();
      console.log(`=== Cache Analysis ===`);
      console.log(`Total Memory Usage: ${details.totalMemoryMB.toFixed(2)} MB`);
      console.log(`Total Files: ${details.summary.totalFiles}`);

      console.log("\n=== Size Categories ===");
      console.log(
        "Huge (>16MB):",
        `${details.summary.bySize.huge.count} files, ` +
        `${details.summary.bySize.huge.size.toFixed(2)} MB`
      );
      console.log(
        "Large (4-16MB):",
        `${details.summary.bySize.large.count} files, ` +
        `${details.summary.bySize.large.size.toFixed(2)} MB`
      );
      console.log(
        "Medium (1-4MB):",
        `${details.summary.bySize.medium.count} files, ` +
        `${details.summary.bySize.medium.size.toFixed(2)} MB`
      );
      console.log(
        "Small (<1MB):",
        `${details.summary.bySize.small.count} files, ` +
        `${details.summary.bySize.small.size.toFixed(2)} MB`
      );

      console.log("\n=== Top 10 Largest Files ===");
      details.files.slice(0, 10).forEach((file) => {
        console.log(`${file.url}: ${file.dimensions} - ${file.memoryMB} MB`);
      });
    }
  }

  class ImagePreloader {
    static async generateManifest() {
      if (!Utils.isNwjs()) {
        console.warn(
          "Manifest can't be generated on mobile. It'll load the generated file from Windows tho."
        );
        return;
      }

      const fs = require("fs");
      const path = require("path");
      const manifest = {};

      const getAllFiles = (dirPath, arrayOfFiles = []) => {
        const files = fs.readdirSync(dirPath);

        files.forEach((file) => {
          const fullPath = path.join(dirPath, file);
          if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
          } else {
            if (file.toLowerCase().match(/\.(png|jpg|webp)$/)) {
              const relativePath = path.relative(process.cwd(), fullPath);
              arrayOfFiles.push(relativePath);
            }
          }
        });

        return arrayOfFiles;
      };

      for (const folderPath of preloadFolders) {
        const basePath = path.join(process.cwd(), folderPath);

        try {
          if (!fs.existsSync(basePath)) {
            console.warn(`Folder not found: ${basePath}`);
            continue;
          }

          const files = getAllFiles(basePath);
          manifest[folderPath] = files.map((file) => {
            const relativePath = path.relative(folderPath, file);
            return relativePath.replace(/\.[^/.]+$/, "");
          });
        } catch (error) {
          console.error(`Error processing folder ${folderPath}:`, error);
        }
      }

      // Save manifest
      try {
        const manifestPath = path.join(process.cwd(), "manifest.json");
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
        console.log("Manifest generated successfully at: " + manifestPath);
      } catch (error) {
        console.error("Error saving manifest:", error);
      }
    }

    static async preloadFolder(folderPath) {
      if (Utils.isNwjs()) {
        const fs = require("fs");
        const path = require("path");
        const base = path.join(process.cwd(), folderPath);

        const getAllFiles = (dirPath, arrayOfFiles = []) => {
          const files = fs.readdirSync(dirPath);

          files.forEach((file) => {
            const fullPath = path.join(dirPath, file);
            if (fs.statSync(fullPath).isDirectory()) {
              arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
            } else {
              if (file.toLowerCase().match(/\.(png|jpg|webp)$/)) {
                arrayOfFiles.push(path.relative(base, fullPath));
              }
            }
          });

          return arrayOfFiles;
        };

        try {
          if (!fs.existsSync(base)) {
            console.warn(`Folder not found: ${base}`);
            return;
          }

          const files = getAllFiles(base);
          for (const file of files) {
            const filename = file.replace(/\.[^/.]+$/, "");
            if (!PermanentImageCache.isPreloaded(folderPath + "/", filename)) {
              PermanentImageCache.load(folderPath + "/", filename);
            }
          }
        } catch (error) {
          console.error(`Error preloading folder ${folderPath}:`, error);
        }
      } else {
        try {
          const response = await fetch("manifest.json");
          const manifest = await response.json();

          console.log("=== Manifest.json successfully loaded! ===");
          //console.log('Manifest content:', JSON.stringify(manifest, null, 2));

          const folderFiles = manifest[folderPath] || [];

          for (const filename of folderFiles) {
            if (!PermanentImageCache.isPreloaded(folderPath + "/", filename)) {
              PermanentImageCache.load(folderPath + "/", filename);
            }
          }
        } catch (error) {
          console.error(`Error loading manifest or preloading files:`, error);
        }
      }
    }

    static preloadAllConfiguredFolders() {
      for (const folder of preloadFolders) {
        this.preloadFolder(folder);
      }
    }
  }

  const _ImageManager_loadPicture = ImageManager.loadPicture;
  ImageManager.loadPicture = function (filename) {
    if (enablePreload) {
      if (!filename) return ImageManager._emptyBitmap;
      const folder = filename.split("/")[0];
      if (preloadFolders.includes(folder)) {
        return PermanentImageCache.load("img/pictures/", filename);
      }
    }
    return _ImageManager_loadPicture.call(this, filename);
  };

  // Basically just override ImageManager loadPicture and Character. Preload from other folder doesn't do anything.
  const _ImageManager_loadCharacter = ImageManager.loadCharacter;
  ImageManager.loadCharacter = function (filename) {
    if (enablePreload && preloadFolders.includes("img/characters")) {
      if (!filename) return ImageManager._emptyBitmap;
      return PermanentImageCache.load("img/characters/", filename);
    }
    return _ImageManager_loadCharacter.call(this, filename);
  };

  const _Scene_Boot_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
  Scene_Boot.prototype.loadSystemImages = function () {
    _Scene_Boot_loadSystemImages.call(this);
    if (enablePreload) {
      ImagePreloader.preloadAllConfiguredFolders();
      ImagePreloader.generateManifest();
      if (Utils.isOptionValid("test")) {
        console.log("Starting image preload...");
      }
    }
  };

  const _Scene_Boot_isReady = Scene_Boot.prototype.isReady;
  Scene_Boot.prototype.isReady = function () {
    if (enablePreload) {
      // Check preload status
      const status = PermanentImageCache.getLoadingStatus();
      if (status.total > 0 && status.loaded + status.failed < status.total) {
        return false;
      }
    }
    return _Scene_Boot_isReady.call(this);
  };

  PluginManager.registerCommand(
    pluginName,
    "showAnimationFromLibrary",
    function (args) {
      const animationName = args.animationName;
      const loopCount =
        args.loopCount && args.loopCount.toLowerCase() === "infinite"
          ? Infinity
          : Number(args.loopCount || 1);
      const stickMode = String(args.stickMode) === "true";

      const parsedTarget = parseFrontTarget(args.eventId || "this");
      let eventId = parsedTarget.eventId || "this";
      const showInFront = parsedTarget.showInFront;

      let targetEventId = eventId;

      if (eventId.toLowerCase() === "this") {
        targetEventId = this.eventId();
      } else if (eventId.toLowerCase() === "player") {
        targetEventId = "player";
      } else {
        targetEventId = Number(eventId);
      }

      getAnimationFromLibrary(animationName).then((animData) => {
        if (!animData) {
          return;
        }

        let target;
        if (targetEventId === "player") {
          target = $gamePlayer;
        } else {
          target = $gameMap.event(targetEventId);
        }

        if (!target) return;

        let frontOffsetX = 0;
        let frontOffsetY = 0;
        if (showInFront) {
          const front = getFrontOffset(target);
          frontOffsetX = front.x;
          frontOffsetY = front.y;
        }

        const bitmap = enablePreload
          ? PermanentImageCache.load("img/pictures/", animData.spritesheetFile)
          : ImageManager.loadPicture(animData.spritesheetFile);

        bitmap.addLoadListener(() => {
          const allFrames = AnimatedPictureManager.createSpritesheetFrames(
            bitmap,
            animData.rows,
            animData.columns
          );

          let zIndex;
          if (animData.zIndex === "auto") {
            const targetSprite =
              SceneManager._scene._spriteset.findCharacterSprite(target);
            zIndex = targetSprite ? targetSprite.z : 3;
          } else {
            zIndex = Number(animData.zIndex);
          }

          const blendMode = BLEND_MODES[animData.blendMode] || PIXI.BLEND_MODES.NORMAL;

          const rotation = animData.randomRotation
            ? Math.random() * 360
            : (animData.rotation || 0);

          const animatedPicture = new AnimatedPicture(
            allFrames,
            animData.fps || 60,
            target,
            loopCount,
            (animData.offsetX || 0) + frontOffsetX,
            (animData.offsetY || 0) + frontOffsetY,
            [],
            animData.scale || 100,
            animData.opacity || 255,
            animData.flip || false,
            animData.flipY || false,
            animData.randomFlipX || false,
            animData.randomFlipY || false,
            rotation,
            blendMode,
            zIndex,
            animData.bloomEffect || false,
            animData.blurAmount || 15,
            animData.tintColor || "#FFFFFF",
            animData.intensity || 255,
            animData.hue || 0,
            () => AnimatedPictureManager.decrementAnimationCount(targetEventId),
            bitmap,
            stickMode,
            "library_" + animationName,
            animData.playInReverse || false,
            "center",
            animData.openingAnimation || "none",
            animData.animationDuration || 30,
            animData.endingAnimation || "none"
          );

          if (SceneManager._scene instanceof Scene_Map) {
            SceneManager._scene.addAnimatedPicture(animatedPicture);
            AnimatedPictureManager.addAnimatedPicture(animatedPicture);
          }
        });
      });
    }
  );

  PluginManager.registerCommand(
    pluginName,
    "showAnimatedPicture",
    function (args) {
      const animation = JSON.parse(
        args.animationSettings || '{"baseFilename":"","frameCount":1}'
      );
      const spritesheet = JSON.parse(
        args.spritesheetSettings ||
        '{"spritesheetFile":"","row":1,"column":1,"frameRange":""}'
      );
      const position = JSON.parse(
        args.positionSettings ||
        '{"eventId":"0","offsetX":0,"offsetY":0,"zIndex":8,"origin":"center","stickMode":false}'
      );
      const visual = JSON.parse(
        args.visualSettings ||
        '{"scalePercent":100,"opacity":255,"hue":0,"blendMode":"Normal","playInReverse":false}'
      );
      const transform = JSON.parse(
        args.transformSettings ||
        '{"flip":false,"flipY":false,"randomFlipX":false,"randomFlipY":false,"rotation":0,"randomRotation":false,"openingAnimation":"none","endingAnimation":"none","animationDuration":30}'
      );
      const bloom = JSON.parse(
        args.bloomSettings ||
        '{"bloomEffect":false,"blurAmount":15,"intensity":255,"tintColor":"#FFFFFF"}'
      );
      const sound = JSON.parse(args.soundSettings || '{"sfxSettings":[]}');

      if (typeof sound.sfxSettings === 'string') {
        sound.sfxSettings = JSON.parse(sound.sfxSettings);
      }

      if (Array.isArray(sound.sfxSettings)) {
        sound.sfxSettings = sound.sfxSettings.map(sfx => {
          if (typeof sfx === 'string') {
            return JSON.parse(sfx);
          }
          return sfx;
        });
      }

      const note = args.note || "";
      let loopCount;
      if (args.loopCount && args.loopCount.toLowerCase() === "infinite") {
        loopCount = Infinity;
      } else {
        loopCount = Number(args.loopCount || 1);
      }

      let frames = [];
      let bitmap = null;

      if (enablePreload) {
        if (!spritesheet.spritesheetFile) {
          const baseFilename = String(animation.baseFilename);
          const frameCount = Number(animation.frameCount);
          for (let i = 1; i <= frameCount; i++) {
            frames.push(
              PermanentImageCache.load(
                "img/pictures/",
                `frames/${baseFilename}${i}`
              )
            );
          }
        } else {
          bitmap = PermanentImageCache.load(
            "img/pictures/",
            spritesheet.spritesheetFile
          );
        }
      } else {
        if (!spritesheet.spritesheetFile) {
          const baseFilename = String(animation.baseFilename);
          const frameCount = Number(animation.frameCount);
          for (let i = 1; i <= frameCount; i++) {
            frames.push(ImageManager.loadPicture(`frames/${baseFilename}${i}`));
          }
        } else {
          bitmap = ImageManager.loadPicture(spritesheet.spritesheetFile);
        }
      }

      const parsedPositionTarget = parseFrontTarget(position.eventId);
      let eventId = parsedPositionTarget.eventId || "0";
      const showInFront = parsedPositionTarget.showInFront;
      let targets = [];
      if (eventId.startsWith("<") && eventId.endsWith(">")) {
        const notetag = eventId.slice(1, -1);

        const events = $gameMap.events();
        for (let i = 0; i < events.length; i++) {
          const event = events[i];
          if (event && event.event()) {
            const eventData = event.event();
            if (eventData.note && eventData.note.includes(`<${notetag}>`)) {
              targets.push(event);
            }
          }
        }

        if (targets.length === 0) {
          return;
        }
      } else if (eventId === "0" || eventId.toLowerCase() === "this") {
        eventId = this.eventId();
        targets.push($gameMap.event(eventId));
      } else if (eventId.toLowerCase() === "player") {
        eventId = "player";
        targets.push($gamePlayer);
      } else {
        eventId = Number(eventId);
        if (!$gameMap.event(eventId)) {
          return;
        }
        targets.push($gameMap.event(eventId));
      }

      let zIndex = position.zIndex;
      if (zIndex === "auto" && targets.length > 0) {
        // Get the z-index from the target event/player
        const target = targets[0];
        if (target instanceof Game_Event || target instanceof Game_Player) {
          zIndex = target.screenZ();
        } else {
          zIndex = 3;
        }
      } else {
        zIndex = Number(position.zIndex);
      }

      const commonParams = {
        fps: Number(args.fps || 60),
        loopCount: loopCount,
        offsetX: Number(position.offsetX),
        offsetY: Number(position.offsetY),
        stickMode: String(position.stickMode) === "true",
        scalePercent: Number(visual.scalePercent),
        opacity: Number(visual.opacity),
        flip: String(transform.flip) === "true",
        flipY: String(transform.flipY) === "true",
        randomFlipX: String(transform.randomFlipX) === "true",
        randomFlipY: String(transform.randomFlipY) === "true",
        rotation:
          transform.randomRotation === "true"
            ? Math.random() * 360
            : Number(transform.rotation),
        blendMode: BLEND_MODES[visual.blendMode] || PIXI.BLEND_MODES.NORMAL,
        zIndex: zIndex,
        bloomEffect: String(bloom.bloomEffect) === "true",
        blurAmount: Number(bloom.blurAmount),
        tintColor: bloom.tintColor,
        intensity: Number(bloom.intensity),
        hue: Number(visual.hue),
        playInReverse: String(visual.playInReverse) === "true",
        sfxSettings: Array.isArray(sound.sfxSettings) ? sound.sfxSettings : [],
        origin: position.origin || "center",
        openingAnimation: transform.openingAnimation || "none",
        endingAnimation: transform.endingAnimation || "none",
        animationDuration: Number(transform.animationDuration || 30),
        frameRange: spritesheet.frameRange || "",
      };

      const handleAnimation = (frames) => {
        targets.forEach((target) => {
          const animatedPicture = new AnimatedPicture(
            frames,
            commonParams.fps,
            target,
            commonParams.loopCount,
            commonParams.offsetX,
            commonParams.offsetY,
            commonParams.sfxSettings,
            commonParams.scalePercent,
            commonParams.opacity,
            commonParams.flip,
            commonParams.flipY,
            commonParams.randomFlipX,
            commonParams.randomFlipY,
            commonParams.rotation,
            commonParams.blendMode,
            commonParams.zIndex,
            commonParams.bloomEffect,
            commonParams.blurAmount,
            commonParams.tintColor,
            commonParams.intensity,
            commonParams.hue,
            () => AnimatedPictureManager.decrementAnimationCount(eventId),
            bitmap,
            commonParams.stickMode,
            note,
            commonParams.playInReverse,
            commonParams.origin,
            commonParams.openingAnimation,
            commonParams.animationDuration,
            commonParams.endingAnimation
          );

          if (SceneManager._scene instanceof Scene_Map) {
            SceneManager._scene.addAnimatedPicture(animatedPicture);
            AnimatedPictureManager.addAnimatedPicture(animatedPicture);
          }
        });
      };

      const isSpriteTrulyReady = (callback) => {
        const spriteset = SceneManager._scene && SceneManager._scene._spriteset;

        if (!spriteset) {
          setTimeout(() => isSpriteTrulyReady(callback), 16);
          return;
        }

        const allSpritesReady = targets.every((target) => {
          const sprite = spriteset.findCharacterSprite(target);
          return sprite && sprite.bitmap && sprite.bitmap.isReady();
        });

        if (allSpritesReady) {
          callback();
        } else {
          setTimeout(() => isSpriteTrulyReady(callback), 16);
        }
      };

      if (spritesheet.spritesheetFile) {
        bitmap.addLoadListener(() => {
          let allFrames = AnimatedPictureManager.createSpritesheetFrames(
            bitmap,
            Number(spritesheet.row),
            Number(spritesheet.column)
          );

          if (
            commonParams.frameRange &&
            commonParams.frameRange.trim() !== ""
          ) {
            const rangeMatch = commonParams.frameRange.match(/^(\d+)-(\d+)$/);
            if (rangeMatch) {
              const startFrame = Number(rangeMatch[1]);
              const endFrame = Number(rangeMatch[2]);

              if (
                startFrame >= 1 &&
                endFrame >= startFrame &&
                endFrame <= allFrames.length
              ) {
                allFrames = allFrames.slice(startFrame - 1, endFrame);
              }
            }
          }

          isSpriteTrulyReady(() => handleAnimation(allFrames));
        });
      } else {
        isSpriteTrulyReady(() => handleAnimation(frames));
      }
    }
  );

  PluginManager.registerCommand(pluginName, "removeAnimation", function (args) {
    let targetEventId;

    if (args.eventId.toLowerCase() === "this") {
      targetEventId = this._eventId;
    } else if (args.eventId.toLowerCase() === "player") {
      targetEventId = $gamePlayer;
    } else {
      targetEventId = Number(args.eventId);
    }

    const animationsToRemove = AnimatedPictureManager._animatedPictures.filter(
      (pic) => {
        const targetMatches =
          pic.target ===
          (targetEventId === $gamePlayer
            ? $gamePlayer
            : $gameMap.event(targetEventId));

        if (args.notetag) {
          const exactMatch = pic.note === args.notetag;
          const libraryMatch = pic.note === "library_" + args.notetag;
          return targetMatches && (exactMatch || libraryMatch);
        }

        return targetMatches;
      }
    );

    if (
      args.effect &&
      args.effect !== "none" &&
      args.duration &&
      Number(args.duration) > 0
    ) {
      const duration = Math.max(1, Number(args.duration));

      if (args.effect === "fadeOut") {
        animationsToRemove.forEach((animation) => {
          animation.applyFadeOut(duration);
        });
      } else if (args.effect === "scaleOut") {
        animationsToRemove.forEach((animation) => {
          animation.applyScaleOut(duration);
        });
      }
    } else {
      animationsToRemove.forEach((animation) => {
        animation.dispose();
      });
    }
  });

  class AnimatedPicture {
    constructor(
      frames,
      fps,
      target,
      loopCount = 1,
      offsetX = 0,
      offsetY = 0,
      sfxSettings = [],
      scalePercent = 100,
      opacity = 255,
      flip = false,
      flipY = false,
      randomFlipX = false,
      randomFlipY = false,
      rotation = 0,
      blendMode = PIXI.BLEND_MODES.NORMAL,
      zIndex = 8,
      bloomEffect = false,
      blurAmount = 4,
      tintColor = "#FFFFFF",
      intensity = 0.5,
      hue = 0,
      onCompletion,
      bitmap = null,
      stickMode = false,
      note = "",
      playInReverse = false,
      origin = "center",
      openingAnimation = "none",
      animationDuration = 30,
      endingAnimation = "none"
    ) {
      this.sprite = new Sprite();
      this.setOrigin(origin);
      if (this.sprite.texture && isNearest) {
        this.sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
      }

      this.openingAnimation = openingAnimation;
      this.endingAnimation = endingAnimation;
      this.animationDuration = Math.max(1, animationDuration);
      this.openingElapsed = 0;
      this.isPlayingOpeningAnimation = openingAnimation !== "none";
      this.isPlayingEndingAnimation = false;

      if (this.isPlayingOpeningAnimation) {
        if (openingAnimation === "fadeIn") {
          this.originalOpacity = opacity;
          opacity = 0;
        } else if (openingAnimation === "scaleIn") {
          this.originalScalePercent = scalePercent;
          scalePercent = 1;
        } else if (openingAnimation === "scaleInWidth") {
          this.originalScalePercent = scalePercent;
          scalePercent = 1;
        } else if (openingAnimation === "scaleInHeight") {
          this.originalScalePercent = scalePercent;
          scalePercent = 1;
        }
      }

      // Store the current character name/index for change detection
      if (this.target) {
        this._lastCharacterName = this.target._characterName;
        this._lastCharacterIndex = this.target._characterIndex;
      }

      this.frames = frames;
      this.fps = fps;
      this.currentFrameIndex = playInReverse ? this.frames.length - 1 : 0;
      this.frameTime = 1000 / fps;
      this.elapsedTime = 0;
      this.completedLoops = 0;
      this.loopCount = loopCount;
      this.playInReverse = playInReverse;
      this.note = note;

      this.target = target;
      this.offsetX = offsetX;
      this.offsetY = offsetY;
      this.lastKnownX = null;
      this.lastKnownY = null;
      this.stickMode = stickMode;

      this.updateTargetSprite();
      const sprite = this.targetSprite;

      if (sprite && sprite.bitmap && sprite.bitmap.isReady()) {
        this.initialSpriteWidth = sprite.width;
        this.initialSpriteHeight = sprite.height;
      } else {
        this.initialSpriteWidth = $gameMap.tileWidth();
        this.initialSpriteHeight = $gameMap.tileHeight();
      }

      this.bitmap = bitmap;
      this.flip = randomFlipX ? Math.random() < 0.5 : flip;
      this.flipY = randomFlipY ? Math.random() < 0.5 : flipY;
      this.rotation = rotation * (Math.PI / 180);
      this.sprite.blendMode = blendMode;
      this._z = zIndex;
      this.zIndex = zIndex;
      this.sfxSettings = sfxSettings;
      this.onCompletion = onCompletion;

      this.bloomEffect = bloomEffect;
      this.blurAmount = blurAmount;
      this.tintColor = tintColor;
      this.intensity = intensity;
      this.hue = hue;

      if (this.bloomEffect) {
        this.createBloomSprite();
      }

      this.applyOpacity(opacity);
      this.applyScale(scalePercent);
      this.applyRotation();
      this.applyHueEffect();
      this.updateFrame();
      this.updatePosition();
    }

    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    setOrigin(origin) {
      switch (origin) {
        case "top":
          this.sprite.anchor.set(0.5, 0);
          break;
        case "bottom":
          this.sprite.anchor.set(0.5, 1.0);
          break;
        case "center":
        default:
          this.sprite.anchor.set(0.5, 0.5);
          break;
      }

      if (this.bloomSprite) {
        this.bloomSprite.anchor = this.sprite.anchor;
      }
    }

    applyHueEffect() {
      if (this.hue !== 0) {
        this.hueFilter = new PIXI.filters.ColorMatrixFilter();
        this.hueFilter.hue(this.hue);
        this.hueFilter.blendMode = this.sprite.blendMode;

        this.sprite.filters = this.sprite.filters || [];
        this.sprite.filters.push(this.hueFilter);

        if (this.bloomSprite) {
          this.bloomHueFilter = new PIXI.filters.ColorMatrixFilter();
          this.bloomHueFilter.hue(this.hue);
          this.bloomHueFilter.blendMode = this.bloomSprite.blendMode;

          this.bloomSprite.filters = this.bloomSprite.filters || [];
          this.bloomSprite.filters.push(this.bloomHueFilter);
        }
      }
    }

    applyFadeOut(duration) {
      this.isFadingOut = true;
      this.fadeOutDuration = duration;
      this.fadeOutElapsed = 0;
      this.originalOpacity = this.sprite.opacity;
    }

    applyScaleOut(duration) {
      this.isScalingOut = true;
      this.scaleOutDuration = duration;
      this.scaleOutElapsed = 0;
      this.originalScaleX = this.sprite.scale.x;
      this.originalScaleY = this.sprite.scale.y;
    }

    easeOutQuad(t) {
      return t * (2 - t);
    }

    createBloomSprite() {
      if (!this.bloomSprite) {
        this.bloomSprite = new Sprite();
      }
      this.bloomSprite.anchor = this.sprite.anchor;
      this.bloomSprite.blendMode = PIXI.BLEND_MODES.SCREEN;

      if (!sharedBloomFilter) {
        sharedBloomFilter = new PIXI.filters.BlurFilter(this.blurAmount);
      } else {
        if (Math.abs(sharedBloomFilter.blur - this.blurAmount) > 0.5) {
          sharedBloomFilter.blur = this.blurAmount;
        }
      }

      bloomFilterUsers++;

      this.bloomSprite.filters = [sharedBloomFilter];

      const color = PIXI.utils.string2hex(this.tintColor);
      this.bloomSprite.tint = color;
      this.bloomSprite.alpha = this.intensity / 255;
      this.bloomSprite.z = this.sprite.z + 1;

      if (this.bitmap) {
        this.bloomSprite.bitmap = this.bitmap;
        if (this.frames && this.frames[this.currentFrameIndex]) {
          const frame = this.frames[this.currentFrameIndex];
          if (typeof frame === "object" && "x" in frame) {
            this.bloomSprite.setFrame(
              frame.x,
              frame.y,
              frame.width,
              frame.height
            );
          }
        }
      }
    }

    removeBloomSprite() {
      if (this.bloomSprite && this.bloomSprite.parent) {
        this.bloomSprite.parent.removeChild(this.bloomSprite);
        if (bloomFilterUsers > 0) {
          bloomFilterUsers--;
        }
        if (bloomFilterUsers === 0 && sharedBloomFilter) {
          sharedBloomFilter.destroy();
          sharedBloomFilter = null;
        }
      }
      this.bloomSprite = null;
    }

    applyOpacity(opacity) {
      this.sprite.opacity = opacity;
    }

    applyScale(scalePercent) {
      const scale = scalePercent / 100;
      this.sprite.scale.set(
        this.flip ? -scale : scale,
        this.flipY ? -scale : scale
      );
    }

    applyRotation() {
      this.sprite.rotation = this.rotation;
    }

    updateFrame() {
      if (
        this.frames &&
        this.frames.length > 0 &&
        this.currentFrameIndex < this.frames.length
      ) {
        const frame = this.frames[this.currentFrameIndex];

        if (this.bitmap) {
          this.sprite.bitmap = this.bitmap;
          if (
            this.sprite.bitmap &&
            this.sprite.bitmap.baseTexture &&
            isNearest
          ) {
            this.sprite.bitmap.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
          }
          this.sprite.setFrame(frame.x, frame.y, frame.width, frame.height);
          if (this.bloomEffect && this.bloomSprite) {
            this.bloomSprite.bitmap = this.bitmap;
            if (
              this.bloomSprite.bitmap &&
              this.bloomSprite.bitmap.baseTexture &&
              isNearest
            ) {
              this.bloomSprite.bitmap.baseTexture.scaleMode =
                PIXI.SCALE_MODES.NEAREST;
            }
            this.bloomSprite.setFrame(
              frame.x,
              frame.y,
              frame.width,
              frame.height
            );
          }
        } else {
          this.sprite.bitmap = frame;
          if (
            this.sprite.bitmap &&
            this.sprite.bitmap.baseTexture &&
            isNearest
          ) {
            this.sprite.bitmap.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
          }
          if (this.bloomEffect && this.bloomSprite) {
            this.bloomSprite.bitmap = frame;
            if (
              this.bloomSprite.bitmap &&
              this.bloomSprite.bitmap.baseTexture &&
              isNearest
            ) {
              this.bloomSprite.bitmap.baseTexture.scaleMode =
                PIXI.SCALE_MODES.NEAREST;
            }
          }
        }

        if (this.bloomEffect && this.bloomSprite) {
          this.bloomSprite.alpha = this.intensity / 255;
        }
      }

      for (const sfx of this.sfxSettings) {
        if (Number(sfx.frame) === this.currentFrameIndex + 1) {
          AudioManager.playSe({
            name: sfx.sfxFile,
            volume: Number(sfx.volume),
            pitch: Number(sfx.pitch),
          });
        }
      }
    }

    updatePosition() {
      if (
        this.initialSpriteWidth === $gameMap.tileWidth() &&
        this.initialSpriteHeight === $gameMap.tileHeight()
      ) {
        this.updateTargetSprite();
        const sprite = this.targetSprite;
        if (sprite && sprite.bitmap && sprite.bitmap.isReady()) {
          this.initialSpriteWidth = sprite.width;
          this.initialSpriteHeight = sprite.height;
        }
      }
      if (
        this.target &&
        (this.target._characterName !== this._lastCharacterName ||
          this.target._characterIndex !== this._lastCharacterIndex)
      ) {
        this.updateTargetSprite();
        this._lastCharacterName = this.target._characterName;
        this._lastCharacterIndex = this.target._characterIndex;
      }

      if (this.stickMode) {
        if (this.lastKnownX === null || this.lastKnownY === null) {
          const screenX = this.target.screenX();
          const screenY = this.target.screenY();
          const sprite = this.targetSprite;

          let initialX, initialY;

          let spriteOffsetX = 0;
          let spriteOffsetY = 0;
          if (sprite) {
            spriteOffsetX = sprite.x - screenX;
            spriteOffsetY = sprite.y - screenY;
          }

          if (
            Imported.Hendrix_Action_Engine &&
            sprite &&
            sprite.rotation !== 0
          ) {
            initialX = screenX + spriteOffsetX + this.offsetX;
            initialY = screenY + spriteOffsetY + this.offsetY;
          } else {
            if (sprite && (sprite.scale.x !== 1 || sprite.scale.y !== 1)) {
              const actualWidth = sprite.width * Math.abs(sprite.scale.x);
              const actualHeight = sprite.height * Math.abs(sprite.scale.y);

              const adjustedOffsetX =
                this.offsetX * (actualWidth / this.initialSpriteWidth);
              const adjustedOffsetY =
                this.offsetY * (actualHeight / this.initialSpriteHeight);

              initialX = screenX + spriteOffsetX + adjustedOffsetX;
              initialY =
                screenY + spriteOffsetY - actualHeight / 2 + adjustedOffsetY;
            } else {
              initialX = screenX + spriteOffsetX + this.offsetX * 2;
              initialY =
                screenY +
                spriteOffsetY -
                this.initialSpriteHeight / 2 +
                this.offsetY * 2;
            }
          }

          const mapDisplayX = $gameMap.displayX() * $gameMap.tileWidth();
          const mapDisplayY = $gameMap.displayY() * $gameMap.tileHeight();

          this.lastKnownX = initialX + mapDisplayX - $gameMap.tileWidth() / 2;
          this.lastKnownY = initialY + mapDisplayY - $gameMap.tileHeight() / 2;
        }

        const mapDisplayX = $gameMap.displayX() * $gameMap.tileWidth();
        const mapDisplayY = $gameMap.displayY() * $gameMap.tileHeight();
        const displayX =
          this.lastKnownX - mapDisplayX + $gameMap.tileWidth() / 2;
        const displayY =
          this.lastKnownY - mapDisplayY + $gameMap.tileHeight() / 2;

        this.sprite.x = Math.round(displayX);
        this.sprite.y = Math.round(displayY);

        if (Imported.Hendrix_Action_Engine) {
          const sprite = this.targetSprite;
          if (sprite && this.target.customRotationPoint) {
            this.sprite.rotation = this.rotation + sprite.rotation;
          }
        }

        if (this.bloomEffect && this.bloomSprite) {
          if (
            this.bloomSprite.x !== this.sprite.x ||
            this.bloomSprite.y !== this.sprite.y ||
            this.bloomSprite.rotation !== this.sprite.rotation
          ) {
            this.bloomSprite.x = this.sprite.x;
            this.bloomSprite.y = this.sprite.y;
            this.bloomSprite.scale.set(
              this.sprite.scale.x,
              this.sprite.scale.y
            );
            this.bloomSprite.rotation = this.sprite.rotation;
          }
        }
        return;
      }

      if (this.target) {
        const screenX = this.target.screenX();
        const screenY = this.target.screenY();
        const sprite = this.targetSprite;

        let newX, newY;

        let spriteOffsetX = 0;
        let spriteOffsetY = 0;
        if (sprite) {
          spriteOffsetX = sprite.x - screenX;
          spriteOffsetY = sprite.y - screenY;
        }

        if (Imported.Hendrix_Action_Engine && sprite && this.target.customRotationPoint) {
          newX = screenX + spriteOffsetX + this.offsetX;
          newY = screenY + spriteOffsetY + this.offsetY;
        } else {
          if (sprite && (sprite.scale.x !== 1 || sprite.scale.y !== 1)) {
            const actualWidth = sprite.width * Math.abs(sprite.scale.x);
            const actualHeight = sprite.height * Math.abs(sprite.scale.y);

            const adjustedOffsetX =
              this.offsetX * (actualWidth / this.initialSpriteWidth);
            const adjustedOffsetY =
              this.offsetY * (actualHeight / this.initialSpriteHeight);

            newX = screenX + spriteOffsetX + adjustedOffsetX;
            newY = screenY + spriteOffsetY - actualHeight / 2 + adjustedOffsetY;
          } else {
            newX = screenX + spriteOffsetX + this.offsetX * 2;
            newY =
              screenY +
              spriteOffsetY -
              this.initialSpriteHeight / 2 +
              this.offsetY * 2;
          }
        }

        if (Imported.Hendrix_Action_Engine && sprite && this.target.customRotationPoint) {
          const cos = Math.cos(sprite.rotation);
          const sin = Math.sin(sprite.rotation);
          const rotatedOffsetX = this.offsetX * cos - this.offsetY * sin;
          const rotatedOffsetY = this.offsetX * sin + this.offsetY * cos;

          newX = screenX + spriteOffsetX + rotatedOffsetX;
          newY = screenY + spriteOffsetY + rotatedOffsetY;

          this.sprite.rotation = this.rotation + sprite.rotation;
        } else {
          this.sprite.rotation = this.rotation;
        }

        if (
          Math.abs(this.sprite.x - newX) > 1 ||
          Math.abs(this.sprite.y - newY) > 1
        ) {
          this.sprite.x = newX;
          this.sprite.y = newY;
          this.lastKnownX = newX;
          this.lastKnownY = newY;
        }
      }

      if (this.bloomEffect && this.bloomSprite) {
        if (
          this.bloomSprite.x !== this.sprite.x ||
          this.bloomSprite.y !== this.sprite.y ||
          this.bloomSprite.rotation !== this.sprite.rotation
        ) {
          this.bloomSprite.x = this.sprite.x;
          this.bloomSprite.y = this.sprite.y;
          this.bloomSprite.scale = this.sprite.scale;
          this.bloomSprite.rotation = this.sprite.rotation;
        }
      }
    }

    updateTargetSprite() {
      if (SceneManager._scene instanceof Scene_Map && this.target) {
        this.targetSprite = SceneManager._scene._spriteset.findCharacterSprite(
          this.target
        );
        if (!this.targetSprite && this.target._characterName) {
        }
      } else {
        this.targetSprite = null;
      }
    }

    checkTargetValidity() {
      if (this.target === $gamePlayer) return true;
      if (!this.target) return false;
      return !!$gameMap.event(this.target._eventId);
    }

    update(deltaTime) {
      if (!this.isValid()) return;
      // Opening animation effects
      if (this.isPlayingOpeningAnimation) {
        this.openingElapsed += 1;
        const progress = Math.min(
          1.0,
          this.openingElapsed / this.animationDuration
        );
        const easedProgress = this.easeInOutQuad(progress);

        if (this.openingAnimation === "fadeIn") {
          const newOpacity = this.originalOpacity * easedProgress;
          this.sprite.opacity = Math.round(newOpacity);

          if (this.bloomSprite) {
            this.bloomSprite.opacity = Math.round(newOpacity);
          }
        } else if (this.openingAnimation === "scaleIn") {
          const targetScale = this.originalScalePercent / 100;
          const currentScale = targetScale * easedProgress;

          this.sprite.scale.x = this.flip ? -currentScale : currentScale;
          this.sprite.scale.y = this.flipY ? -currentScale : currentScale;

          if (this.bloomSprite) {
            this.bloomSprite.scale.x = this.sprite.scale.x;
            this.bloomSprite.scale.y = this.sprite.scale.y;
          }
        } else if (this.openingAnimation === "scaleInWidth") {
          const targetScale = this.originalScalePercent / 100;
          const currentScaleX = targetScale * easedProgress;
          const currentScaleY = targetScale;

          this.sprite.scale.x = this.flip ? -currentScaleX : currentScaleX;
          this.sprite.scale.y = this.flipY ? -currentScaleY : currentScaleY;

          if (this.bloomSprite) {
            this.bloomSprite.scale.x = this.sprite.scale.x;
            this.bloomSprite.scale.y = this.sprite.scale.y;
          }
        } else if (this.openingAnimation === "scaleInHeight") {
          const targetScale = this.originalScalePercent / 100;
          const currentScaleX = targetScale;
          const currentScaleY = targetScale * easedProgress;

          this.sprite.scale.x = this.flip ? -currentScaleX : currentScaleX;
          this.sprite.scale.y = this.flipY ? -currentScaleY : currentScaleY;

          if (this.bloomSprite) {
            this.bloomSprite.scale.x = this.sprite.scale.x;
            this.bloomSprite.scale.y = this.sprite.scale.y;
          }
        }

        if (progress >= 1.0) {
          this.isPlayingOpeningAnimation = false;
          if (this.openingAnimation === "fadeIn") {
            this.applyOpacity(this.originalOpacity);
          } else if (
            this.openingAnimation === "scaleIn" ||
            this.openingAnimation === "scaleInWidth" ||
            this.openingAnimation === "scaleInHeight"
          ) {
            this.applyScale(this.originalScalePercent);
          }
        }
      }

      // Ending animation
      if (
        !this.isPlayingEndingAnimation &&
        this.endingAnimation !== "none" &&
        this.loopCount !== Infinity
      ) {
        const totalFrames = this.frames.length;
        const currentFrame = this.playInReverse
          ? totalFrames - this.currentFrameIndex - 1
          : this.currentFrameIndex;
        const framesLeft = this.playInReverse
          ? currentFrame + 1
          : totalFrames - currentFrame;

        const framesPerSecond = 1000 / this.frameTime;
        const animationDurationInFrames = Math.ceil(
          this.animationDuration * (framesPerSecond / 60)
        );

        const isFirstLoop = this.completedLoops === 0;
        const isNearEnd = framesLeft <= animationDurationInFrames;

        if (isFirstLoop && isNearEnd) {
          this.isPlayingEndingAnimation = true;

          this.loopCount = 1;

          if (this.endingAnimation === "fadeOut") {
            this.applyFadeOut(this.animationDuration);
          } else if (this.endingAnimation === "scaleOut") {
            this.applyScaleOut(this.animationDuration);
          }
        }
      }

      // Fade out effect
      if (this.isFadingOut) {
        this.fadeOutElapsed += 1;
        const progress = this.fadeOutElapsed / this.fadeOutDuration;

        if (progress >= 1.0) {
          this.dispose();
          if (this.onCompletion) this.onCompletion();
          return;
        }

        const newOpacity = this.originalOpacity * (1 - progress);
        this.sprite.opacity = Math.round(newOpacity);

        if (this.bloomSprite) {
          this.bloomSprite.opacity = Math.round(newOpacity);
        }
      }

      // Scale out effect
      if (this.isScalingOut) {
        this.scaleOutElapsed += 1;
        const progress = this.scaleOutElapsed / this.scaleOutDuration;

        if (progress >= 1.0) {
          this.dispose();
          if (this.onCompletion) this.onCompletion();
          return;
        }

        // Easing to make the animation smoother
        const easedProgress = this.easeOutQuad(progress);
        const scaleFactor = 1 - easedProgress;

        // Scale
        const newScaleX = this.originalScaleX * scaleFactor;
        const newScaleY = this.originalScaleY * scaleFactor;
        this.sprite.scale.x =
          this.originalScaleX < 0 ? -Math.abs(newScaleX) : Math.abs(newScaleX);
        this.sprite.scale.y =
          this.originalScaleY < 0 ? -Math.abs(newScaleY) : Math.abs(newScaleY);

        if (this.bloomSprite) {
          this.bloomSprite.scale.x = this.sprite.scale.x;
          this.bloomSprite.scale.y = this.sprite.scale.y;
        }
      }

      this.elapsedTime += deltaTime;

      while (this.elapsedTime >= this.frameTime) {
        if (this.playInReverse) {
          this.currentFrameIndex--;
          if (this.currentFrameIndex < 0) {
            this.completedLoops++;
            if (
              this.loopCount !== Infinity &&
              this.completedLoops >= this.loopCount
            ) {
              this.dispose();
              if (this.onCompletion) this.onCompletion();
              return;
            }
            this.currentFrameIndex = this.frames.length - 1;
          }
        } else {
          this.currentFrameIndex++;
          if (this.currentFrameIndex >= this.frames.length) {
            this.completedLoops++;
            if (
              this.loopCount !== Infinity &&
              this.completedLoops >= this.loopCount
            ) {
              this.dispose();
              if (this.onCompletion) this.onCompletion();
              return;
            }
            this.currentFrameIndex = 0;
          }
        }
        this.elapsedTime -= this.frameTime;
        this.updateFrame();
      }

      if (this.shouldUpdatePosition()) {
        this.updatePosition();
      }
    }

    isValid() {
      if (!this.sprite || !this.sprite.parent || !this.checkTargetValidity()) {
        this.dispose();
        return false;
      }
      return true;
    }

    shouldUpdatePosition() {
      if (!this.lastKnownX || !this.lastKnownY) return true;
      const dx = this.target.screenX() - this.lastKnownX;
      const dy = this.target.screenY() - this.lastKnownY;
      return Math.abs(dx) > 1 || Math.abs(dy) > 1;
    }

    dispose() {
      if (this.sprite?.parent) {
        this.sprite.parent.removeChild(this.sprite);
        this.sprite.destroy();
      }

      if (this.bloomSprite?.parent) {
        this.bloomSprite.parent.removeChild(this.bloomSprite);
        this.bloomSprite.destroy();
      }

      if (this.hueFilter) {
        this.hueFilter.destroy();
        this.hueFilter = null;
      }

      if (this.bloomHueFilter) {
        this.bloomHueFilter.destroy();
        this.bloomHueFilter = null;
      }

      AnimatedPictureManager.removeAnimatedPicture(this);
    }
  }

  Spriteset_Map.prototype.findCharacterSprite = function (character) {
    return (
      this._characterSprites.find(
        (sprite) => sprite._character === character
      ) || null
    );
  };

  Scene_Map.prototype.addAnimatedPicture = function (animatedPicture) {
    const spritesetMap = this._spriteset;
    if (!spritesetMap) return;

    let container = spritesetMap._tilemap;
    if (!container) return;

    if (AnimatedPictureManager._batchingEnabled && animatedPicture.sprite) {
      const existingBatch =
        AnimatedPictureManager._findSimilarBatch(animatedPicture);
      if (existingBatch && existingBatch.length > 0) {
        const refSprite = existingBatch[0].sprite;
        const refIndex = container.children.indexOf(refSprite);

        if (refIndex >= 0) {
          animatedPicture.sprite.z = animatedPicture.zIndex;
          container.addChildAt(animatedPicture.sprite, refIndex + 1);

          if (animatedPicture.bloomEffect && animatedPicture.bloomSprite) {
            animatedPicture.bloomSprite.z = animatedPicture.zIndex + 1;
            container.addChildAt(animatedPicture.bloomSprite, refIndex + 2);
          }
          return;
        }
      }
    }

    if (animatedPicture.sprite) {
      animatedPicture.sprite.z = animatedPicture.zIndex;
      container.addChild(animatedPicture.sprite);
    }

    if (animatedPicture.bloomEffect && animatedPicture.bloomSprite) {
      animatedPicture.bloomSprite.z = animatedPicture.zIndex + 1;
      container.addChild(animatedPicture.bloomSprite);
    }
  };

  class AnimatedPictureManager {
    static _animationCountByEventId = new Map();
    static _animatedPicturesByEventId = new Map();
    static _animatedPictures = [];
    static _lastUpdateTime = 0;
    static _batchingEnabled = true;
    static _batchesByTexture = new Map();
    static _backupAnimations = [];
    static _batchUpdateCounter = 0;
    static _debugStats = {
      totalBatches: 0,
      totalAnimations: 0,
      batchSizes: {},
      batchByTexture: {},
      drawCallsSaved: 0,
      lastUpdateTime: 0,
      updateTimes: [],
    };

    static _collectDebugStats() {
      this._debugStats.totalBatches = 0;
      this._debugStats.totalAnimations = this._animatedPictures.length;
      this._debugStats.batchSizes = {};
      this._debugStats.batchByTexture = {};
      this._debugStats.drawCallsSaved = 0;
      for (const [batchKey, pictures] of this._batchesByTexture.entries()) {
        this._debugStats.totalBatches++;
        const size = pictures.length;
        this._debugStats.batchSizes[size] =
          (this._debugStats.batchSizes[size] || 0) + 1;
        const textureId = batchKey.split("_").slice(1).join("_");
        this._debugStats.batchByTexture[textureId] =
          (this._debugStats.batchByTexture[textureId] || 0) + size;
        if (size > 1) {
          this._debugStats.drawCallsSaved += size - 1;
        }
      }

      const currentTime = performance.now();
      if (this._debugStats.lastUpdateTime > 0) {
        const updateTime = currentTime - this._debugStats.lastUpdateTime;
        this._debugStats.updateTimes.push(updateTime);
        if (this._debugStats.updateTimes.length > 60) {
          this._debugStats.updateTimes.shift();
        }
      }
      this._debugStats.lastUpdateTime = currentTime;
    }

    static showDebugOverlay() {
      if (!this._debugOverlay) {
        this._debugOverlay = new PIXI.Container();
        this._debugText = new PIXI.Text("Batch Debug", {
          fontFamily: "Arial",
          fontSize: 14,
          fill: 0xffffff,
          stroke: 0x000000,
          strokeThickness: 4,
          align: "left",
        });
        this._debugOverlay.addChild(this._debugText);
        if (SceneManager._scene) {
          SceneManager._scene.addChild(this._debugOverlay);
        }
      }

      if (this._debugText) {
        const avgUpdateTime =
          this._debugStats.updateTimes.length > 0
            ? this._debugStats.updateTimes.reduce((a, b) => a + b, 0) /
            this._debugStats.updateTimes.length
            : 0;

        let batchSizesText = "";
        for (const [size, count] of Object.entries(
          this._debugStats.batchSizes
        ).sort((a, b) => a[0] - b[0])) {
          batchSizesText += `\n  Size ${size}: ${count} batches`;
        }

        this._debugText.text = `Batch Debug:
                Animations: ${this._debugStats.totalAnimations}
                Batches: ${this._debugStats.totalBatches}
                Draw Calls Saved: ${this._debugStats.drawCallsSaved}
                Update Time: ${avgUpdateTime.toFixed(2)}ms
                Batch Sizes: ${batchSizesText}`;
        this._debugText.x = Graphics.width - this._debugText.width - 10;
        this._debugText.y = 10;
      }
    }

    static toggleBatchVisualization() {
      this._visualizeBatches = !this._visualizeBatches;

      if (this._visualizeBatches) {
        this._highlightBatches();
      } else {
        this._removeBatchHighlights();
      }

      return this._visualizeBatches;
    }

    static _highlightBatches() {
      this._removeBatchHighlights();
      const colors = [
        0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff,
      ];
      let colorIndex = 0;
      for (const [batchKey, pictures] of this._batchesByTexture.entries()) {
        if (pictures.length <= 1) continue;

        const batchColor = colors[colorIndex % colors.length];
        colorIndex++;

        for (const picture of pictures) {
          if (picture.sprite && picture.sprite.parent) {
            const highlight = new PIXI.Graphics();
            highlight.lineStyle(2, batchColor, 1);
            highlight.drawRect(
              -5,
              -5,
              picture.sprite.width + 10,
              picture.sprite.height + 10
            );
            highlight._isBatchHighlight = true;
            picture.sprite.parent.addChild(highlight);
            highlight.x = picture.sprite.x - picture.sprite.width / 2;
            highlight.y = picture.sprite.y - picture.sprite.height / 2;
          }
        }
      }
    }

    static _removeBatchHighlights() {
      if (
        !SceneManager._scene ||
        !SceneManager._scene._spriteset ||
        !SceneManager._scene._spriteset._tilemap
      ) {
        return;
      }
      const container = SceneManager._scene._spriteset._tilemap;
      for (let i = container.children.length - 1; i >= 0; i--) {
        const child = container.children[i];
        if (child && child._isBatchHighlight) {
          container.removeChild(child);
        }
      }
    }

    static registerDebugCommands() {
      if (Utils.isNwjs()) {
        window.showBatchStats = () => {
          console.log("===== Batch System Statistics =====");
          console.log(`Total Animations: ${this._debugStats.totalAnimations}`);
          console.log(`Total Batches: ${this._debugStats.totalBatches}`);
          console.log(`Draw Calls Saved: ${this._debugStats.drawCallsSaved}`);

          const efficiency =
            this._debugStats.totalAnimations > 0
              ? (
                (this._debugStats.drawCallsSaved /
                  this._debugStats.totalAnimations) *
                100
              ).toFixed(2)
              : 0;
          console.log(`Batching Efficiency: ${efficiency}%`);

          console.log("\nBatch Size Distribution:");
          for (const [size, count] of Object.entries(
            this._debugStats.batchSizes
          ).sort((a, b) => Number(a[0]) - Number(b[0]))) {
            console.log(`  Size ${size}: ${count} batches`);
          }

          console.log("\nUpdate Performance:");
          const avgUpdateTime =
            this._debugStats.updateTimes.length > 0
              ? this._debugStats.updateTimes.reduce((a, b) => a + b, 0) /
              this._debugStats.updateTimes.length
              : 0;
          console.log(`  Average Update Time: ${avgUpdateTime.toFixed(2)}ms`);

          return "Stats printed to console";
        };

        window.toggleBatchDebug = () => {
          this._showDebugOverlay = !this._showDebugOverlay;
          return `Batch debug overlay: ${this._showDebugOverlay ? "ON" : "OFF"
            }`;
        };

        window.toggleBatchVisualization = () => {
          const isOn = this.toggleBatchVisualization();
          return `Batch visualization: ${isOn ? "ON" : "OFF"}`;
        };
      }
    }
    static prepareBatches() {
      this._batchesByTexture.clear();
      const sortedPictures = [...this._animatedPictures].sort(
        (a, b) => a.zIndex - b.zIndex
      );
      let currentZ = null;
      let currentGroup = [];

      for (const picture of sortedPictures) {
        if (!picture.sprite || !picture.sprite.bitmap) continue;
        if (currentZ === null) {
          currentZ = picture.zIndex;
          currentGroup = [picture];
        } else if (picture.zIndex === currentZ) {
          currentGroup.push(picture);
        } else {
          this._createBatchesForGroup(currentGroup);
          currentZ = picture.zIndex;
          currentGroup = [picture];
        }
      }
      if (currentGroup.length > 0) {
        this._createBatchesForGroup(currentGroup);
      }
    }

    static _createBatchesForGroup(pictureGroup) {
      const textureGroups = new Map();

      for (const picture of pictureGroup) {
        if (!picture.sprite || !picture.sprite.bitmap) continue;
        const textureId =
          picture.sprite.bitmap._url || picture.sprite.bitmap._baseTexture.uid;
        const blendMode = picture.sprite.blendMode;
        const key = `${textureId}_${blendMode}`;
        if (!textureGroups.has(key)) {
          textureGroups.set(key, []);
        }
        textureGroups.get(key).push(picture);
      }

      for (const [textureKey, pictures] of textureGroups.entries()) {
        if (pictures.length <= 1) continue;
        const z = pictures[0].zIndex;
        const batchKey = `${z}_${textureKey}`;
        this._batchesByTexture.set(batchKey, pictures);
      }
    }

    static optimizeRendering() {
      if (!this._batchingEnabled) return;
      const startTime = performance.now();
      if (this._batchUpdateCounter++ % 10 === 0) {
        this.prepareBatches();
      }
      const scene = SceneManager._scene;
      if (!scene || !scene._spriteset || !scene._spriteset._tilemap) return;
      const container = scene._spriteset._tilemap;
      this._forceZSort(container);
      for (const [batchKey, pictures] of this._batchesByTexture.entries()) {
        if (pictures.length <= 1) continue;
        const z = parseInt(batchKey.split("_")[0]);
        this._optimizeBatchSafely(pictures, z, container);
      }

      //this._collectDebugStats();
      //if (this._showDebugOverlay) {
      //    this.showDebugOverlay();
      //}
      //this.toggleBatchVisualization();
      //const endTime = performance.now();
      //this._debugStats.lastUpdateDuration = endTime - startTime;
    }

    static initDebugSystem() {
      this._showDebugOverlay = false;
      this._visualizeBatches = false;
      this.registerDebugCommands();
    }

    static _forceZSort(container) {
      if (!container || !container.children || !container.children.length)
        return;
      const indexedChildren = container.children.map((child, index) => ({
        sprite: child,
        z: child ? child.z || 0 : 0,
        originalIndex: index,
      }));
      indexedChildren.sort((a, b) => a.z - b.z);
      container.children = indexedChildren.map((item) => item.sprite);
      container._needsSorting = false;
    }

    static _optimizeBatchSafely(pictures, zIndex, container) {
      const zLayerSprites = [];
      const zLayerIndices = [];

      for (let i = 0; i < container.children.length; i++) {
        const sprite = container.children[i];
        if (sprite && (sprite.z || 0) === zIndex) {
          zLayerSprites.push(sprite);
          zLayerIndices.push(i);
        }
      }

      if (zLayerSprites.length <= 1) return;
      const batchSprites = pictures
        .map((p) => p.sprite)
        .filter((s) => zLayerSprites.includes(s));
      if (batchSprites.length <= 1) return;
      const zLayerMap = new Map();
      zLayerSprites.forEach((sprite, idx) => {
        zLayerMap.set(sprite, zLayerIndices[idx]);
      });
      const firstBatchSpriteIndex = Math.min(
        ...batchSprites.map((s) => zLayerSprites.indexOf(s))
      );
      if (firstBatchSpriteIndex >= 0) {
        let insertIndex = firstBatchSpriteIndex;

        for (const batchSprite of batchSprites) {
          const currentIndex = zLayerSprites.indexOf(batchSprite);
          if (currentIndex !== insertIndex && currentIndex > -1) {
            zLayerSprites.splice(currentIndex, 1);
            zLayerSprites.splice(insertIndex, 0, batchSprite);
            const containerIndex = zLayerMap.get(batchSprite);
            const targetIndex = zLayerIndices[insertIndex];
            if (containerIndex !== targetIndex) {
              const tempSprite = container.children[targetIndex];
              container.children[targetIndex] = batchSprite;
              container.children[containerIndex] = tempSprite;
              zLayerMap.set(tempSprite, containerIndex);
              zLayerMap.set(batchSprite, targetIndex);
            }
          }
          insertIndex++;
        }
      }
    }

    static _findSimilarBatch(picture) {
      if (!picture.sprite || !picture.sprite.bitmap) return null;
      const textureId =
        picture.sprite.bitmap._url || picture.sprite.bitmap._baseTexture.uid;
      const blendMode = picture.sprite.blendMode;
      const z = picture.zIndex;
      const batchKey = `${z}_${textureId}_${blendMode}`;
      return this._batchesByTexture.get(batchKey);
    }

    static showAnimatedPicture(
      eventId,
      frames,
      fps,
      target,
      loopCount,
      offsetX,
      offsetY,
      sfxSettings,
      scalePercent,
      opacity,
      flip,
      flipY,
      randomFlipX,
      randomFlipY,
      rotation,
      blendMode,
      zIndex,
      bloomEffect,
      blurAmount,
      tintColor,
      intensity,
      hue,
      stickmode,
      note,
      playInReverse = false
    ) {
      const origin = "center";

      const alwaysPlaySFX =
        PluginManager.parameters(pluginName)["alwaysPlaySFX"] === "true";
      loopCount = Math.max(1, loopCount);
      let animationCount = this._animationCountByEventId.get(eventId) || 0;

      if (alwaysPlaySFX) {
        sfxSettings.forEach((sfx) => {
          AudioManager.playSe({
            name: sfx.sfxFile,
            volume: sfx.volume,
            pitch: sfx.pitch,
          });
        });
      }

      const animatedPicture = new AnimatedPicture(
        frames,
        fps,
        target,
        loopCount,
        offsetX,
        offsetY,
        sfxSettings,
        scalePercent,
        opacity,
        flip,
        flipY,
        randomFlipX,
        randomFlipY,
        rotation,
        blendMode,
        zIndex,
        bloomEffect,
        blurAmount,
        tintColor,
        intensity,
        hue,
        stickmode,
        () => this.decrementAnimationCount(eventId),
        null,
        note,
        playInReverse,
        origin
      );

      if (!animatedPicture.checkTargetValidity()) {
        animatedPicture.dispose();
        return;
      }

      if (SceneManager._scene instanceof Scene_Map) {
        SceneManager._scene.addAnimatedPicture(animatedPicture);
      }

      this.addAnimatedPicture(animatedPicture);
      this._animationCountByEventId.set(eventId, animationCount + 1);
      this._animatedPicturesByEventId.set(eventId, animatedPicture);
    }

    static createSpritesheetFrames(bitmap, rows, columns) {
      const frameWidth = Math.floor(bitmap.width / columns);
      const frameHeight = Math.floor(bitmap.height / rows);
      const frames = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          const x = col * frameWidth;
          const y = row * frameHeight;
          frames.push({ x, y, width: frameWidth, height: frameHeight });
        }
      }
      return frames;
    }

    static decrementAnimationCount(eventId) {
      let animationCount = this._animationCountByEventId.get(eventId) || 0;
      if (animationCount > 0) {
        this._animationCountByEventId.set(eventId, animationCount - 1);
      }
    }

    static addAnimatedPicture(animatedPicture) {
      this._animatedPictures.push(animatedPicture);
      const scene = SceneManager._scene;
      if (scene instanceof Scene_Map) {
        scene.addAnimatedPicture(animatedPicture);
        scene._spriteset._needsSorting = true;
      }
    }

    static removeAnimatedPicture(animatedPicture) {
      const index = this._animatedPictures.indexOf(animatedPicture);
      if (index !== -1) {
        this._animatedPictures[index] =
          this._animatedPictures[this._animatedPictures.length - 1];
        this._animatedPictures.pop();
        const scene = SceneManager._scene;
        if (scene instanceof Scene_Map) {
          scene._spriteset._needsSorting = true;
        }
      }
      if (sharedBloomFilter && this._animatedPictures.length === 0) {
        sharedBloomFilter.destroy();
        sharedBloomFilter = null;
      }
    }

    static removeAllAnimatedPictures() {
      this._animatedPictures.forEach((picture) => picture.dispose());
      this._animatedPictures = [];
      this._animationCountByEventId.clear();
      this._animatedPicturesByEventId.clear();
      bloomFilterUsers = 0;
      if (sharedBloomFilter) {
        sharedBloomFilter.destroy();
        sharedBloomFilter = null;
      }
    }

    static update(currentTime) {
      if (this._lastUpdateTime === 0) {
        this._lastUpdateTime = currentTime;
        return;
      }

      const deltaTime = currentTime - this._lastUpdateTime;
      this._lastUpdateTime = currentTime;
      this.optimizeRendering();

      for (const animatedPicture of this._animatedPictures) {
        animatedPicture.update(deltaTime);
      }
    }
  }

  const _sScene_Map_updateH = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    AnimatedPictureManager.update(performance.now());
    _sScene_Map_updateH.call(this);
  };

  const _TouchInput_onMouseDown_AnimEditor = TouchInput._onMouseDown;
  TouchInput._onMouseDown = function (event) {
    if (SceneManager._scene instanceof Scene_Map && editorPreviewMode) {
      const x = Graphics.pageToCanvasX(event.pageX);
      const y = Graphics.pageToCanvasY(event.pageY);
      handleCharacterClick(x, y);
      return;
    }

    _TouchInput_onMouseDown_AnimEditor.call(this, event);
  };

  const _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function () {
    const nextScene = SceneManager._nextScene;
    const isGoingToMenu = nextScene && nextScene instanceof Scene_MenuBase;

    if (isGoingToMenu) {
      AnimatedPictureManager._backupAnimations =
        AnimatedPictureManager._animatedPictures.map((pic) => {
          return {
            frames: pic.frames,
            fps: pic.fps,
            target: pic.target,
            loopCount: pic.loopCount,
            offsetX: pic.offsetX,
            offsetY: pic.offsetY,
            sfxSettings: pic.sfxSettings,
            bitmap: pic.bitmap,
            stickMode: pic.stickMode,
            note: pic.note,
            playInReverse: pic.playInReverse,
            flip: pic.flip,
            flipY: pic.flipY,
            rotation: pic.rotation,
            zIndex: pic.zIndex,
            _z: pic._z,
            bloomEffect: pic.bloomEffect,
            blurAmount: pic.blurAmount,
            tintColor: pic.tintColor,
            intensity: pic.intensity,
            hue: pic.hue,
            spriteOpacity: pic.sprite.opacity,
            spriteScaleX: pic.sprite.scale.x,
            spriteScaleY: pic.sprite.scale.y,
            spriteBlendMode: pic.sprite.blendMode,
            spriteAnchorX: pic.sprite.anchor.x,
            spriteAnchorY: pic.sprite.anchor.y,
            currentFrameIndex: pic.currentFrameIndex,
            elapsedTime: pic.elapsedTime,
            completedLoops: pic.completedLoops,
            frameTime: pic.frameTime,
            lastKnownX: pic.lastKnownX,
            lastKnownY: pic.lastKnownY,
            initialSpriteWidth: pic.initialSpriteWidth,
            initialSpriteHeight: pic.initialSpriteHeight,
            openingAnimation: pic.openingAnimation,
            endingAnimation: pic.endingAnimation,
            animationDuration: pic.animationDuration,
            isPlayingOpeningAnimation: pic.isPlayingOpeningAnimation,
            openingElapsed: pic.openingElapsed,
            originalOpacity: pic.originalOpacity,
            originalScalePercent: pic.originalScalePercent,
            isPlayingEndingAnimation: pic.isPlayingEndingAnimation,
            isFadingOut: pic.isFadingOut,
            fadeOutDuration: pic.fadeOutDuration,
            fadeOutElapsed: pic.fadeOutElapsed,
            isScalingOut: pic.isScalingOut,
            scaleOutDuration: pic.scaleOutDuration,
            scaleOutElapsed: pic.scaleOutElapsed,
            originalScaleX: pic.originalScaleX,
            originalScaleY: pic.originalScaleY,
            _lastCharacterName: pic._lastCharacterName,
            _lastCharacterIndex: pic._lastCharacterIndex,
          };
        });
    } else {
      AnimatedPictureManager.removeAllAnimatedPictures();
    }

    _Scene_Map_terminate.call(this);
  };

  const _Scene_Map_createDisplayObjects =
    Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function () {
    if (
      AnimatedPictureManager._backupAnimations &&
      AnimatedPictureManager._backupAnimations.length > 0
    ) {
      const backups = AnimatedPictureManager._backupAnimations;
      AnimatedPictureManager._backupAnimations = [];

      _Scene_Map_createDisplayObjects.call(this);

      for (const backup of backups) {
        if (
          !backup.target ||
          (backup.target !== $gamePlayer &&
            !$gameMap.event(backup.target._eventId))
        ) {
          continue;
        }

        const animatedPicture = new AnimatedPicture(
          backup.frames,
          backup.fps,
          backup.target,
          backup.loopCount,
          backup.offsetX,
          backup.offsetY,
          backup.sfxSettings,
          Math.abs(backup.spriteScaleX) * 100,
          backup.spriteOpacity,
          backup.flip,
          backup.flipY,
          false,
          false,
          backup.rotation * (180 / Math.PI),
          backup.spriteBlendMode,
          backup.zIndex,
          backup.bloomEffect,
          backup.blurAmount,
          backup.tintColor,
          backup.intensity,
          backup.hue,
          () =>
            AnimatedPictureManager.decrementAnimationCount(
              backup.target === $gamePlayer ? "player" : backup.target._eventId
            ),
          backup.bitmap,
          backup.stickMode,
          backup.note,
          backup.playInReverse,
          backup.spriteAnchorY === 0
            ? "top"
            : backup.spriteAnchorY === 1
              ? "bottom"
              : "center",
          "none",
          30,
          "none"
        );

        animatedPicture.currentFrameIndex = backup.currentFrameIndex;
        animatedPicture.elapsedTime = backup.elapsedTime;
        animatedPicture.completedLoops = backup.completedLoops;
        animatedPicture.frameTime = backup.frameTime;
        animatedPicture.lastKnownX = backup.lastKnownX;
        animatedPicture.lastKnownY = backup.lastKnownY;
        animatedPicture.initialSpriteWidth = backup.initialSpriteWidth;
        animatedPicture.initialSpriteHeight = backup.initialSpriteHeight;
        animatedPicture._z = backup._z;
        animatedPicture.openingAnimation = backup.openingAnimation;
        animatedPicture.endingAnimation = backup.endingAnimation;
        animatedPicture.animationDuration = backup.animationDuration;
        animatedPicture.isPlayingOpeningAnimation =
          backup.isPlayingOpeningAnimation;
        animatedPicture.openingElapsed = backup.openingElapsed;
        animatedPicture.originalOpacity = backup.originalOpacity;
        animatedPicture.originalScalePercent = backup.originalScalePercent;
        animatedPicture.isPlayingEndingAnimation =
          backup.isPlayingEndingAnimation;
        animatedPicture.isFadingOut = backup.isFadingOut;
        animatedPicture.fadeOutDuration = backup.fadeOutDuration;
        animatedPicture.fadeOutElapsed = backup.fadeOutElapsed;
        animatedPicture.isScalingOut = backup.isScalingOut;
        animatedPicture.scaleOutDuration = backup.scaleOutDuration;
        animatedPicture.scaleOutElapsed = backup.scaleOutElapsed;
        animatedPicture.originalScaleX = backup.originalScaleX;
        animatedPicture.originalScaleY = backup.originalScaleY;
        animatedPicture._lastCharacterName = backup._lastCharacterName;
        animatedPicture._lastCharacterIndex = backup._lastCharacterIndex;

        animatedPicture.updateFrame();
        this.addAnimatedPicture(animatedPicture);
        AnimatedPictureManager.addAnimatedPicture(animatedPicture);
      }
    } else {
      _Scene_Map_createDisplayObjects.call(this);
    }
  };

  window.AnimatedPictureManager = AnimatedPictureManager;

  // ================================================================
  // EVENT/PLAYER ACTION SYSTEM
  // ================================================================

  Game_Character.prototype.toFrame = function (pattern) {
    togglePatternReset.call(this, true);
    this._originalPattern = this._pattern = pattern - 1;
    this._patternUpdated = true;
    this._stepAnime = false;
  };

  Game_Character.prototype.playFrames = function (start, end, wait, offsetX = 0, offsetY = 0) {
    this._isPlayingFrames = true;
    this._frameWait = wait;
    this._frameCount = 0;
    this._endFrame = end - 1;
    this._startFrame = start - 1;
    this._isReverse = start > end;
    this._playFramesOffsetX = offsetX;
    this._playFramesOffsetY = offsetY;
    this.toFrame(start);
  };

  window.togglePatternReset = function (disable, eventId = null) {
    const char = eventId ? $gameMap.event(eventId) : $gamePlayer;
    char._disablePatternReset = disable;
    if (!disable) char._patternUpdated = false;
  };

  const _GameBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function () {
    _GameBase_initMembers.call(this);
    this._frames = 3;
    this._columnIndex = 1;
    this._hxSig = 0x5348;
    this._frameSpeed = 0;
    this._lastRealX = this._realX;
    this._lastRealY = this._realY;
    this._isMoving = false;
    this._isIdleAnimating = false;
    this._idleAnimCounter = 0;
    this._autoGraphicsEnabled = false;
    this._currentAutoCharacter = null;
    this._graphicsDetected = false;
    this._detectedIdleGraphic = null;
    this._detectedWalkGraphic = null;
    this._detectedRunGraphic = null;
    this._isSingleRowSprite = false;
    this._spriteFlipped = false;
    this._playFramesOffsetX = 0;
    this._playFramesOffsetY = 0;
  };

  const Anim_Sprite_Character_updatePosition = Sprite_Character.prototype.updatePosition;
  Sprite_Character.prototype.updatePosition = function () {
    Anim_Sprite_Character_updatePosition.call(this);

    if (this._character && this._character._isPlayingFrames) {
      this.x += this._character._playFramesOffsetX || 0;
      this.y += this._character._playFramesOffsetY || 0;
    }
  };

  const alias_Game_CharacterBase_update = Game_CharacterBase.prototype.update;
  Game_CharacterBase.prototype.update = function () {
    alias_Game_CharacterBase_update.call(this);
    this.updateMovingState();
    const isFeatureEnabled =
      enableSwitch === 0 || $gameSwitches.value(enableSwitch);

    if (isFeatureEnabled && this._autoGraphicsEnabled) {
      this.updateGraphics();
    }

    if (this._isIdleAnimating && !this._isMoving && !this._moveRouteForcing) {
      const waitTime = this.animationWait();

      this._idleAnimCounter++;
      if (this._idleAnimCounter >= waitTime) {
        this._idleAnimCounter = 0;

        if (this._characterName === this._detectedIdleGraphic) {
          const frameMatch =
            this._characterName.match(new RegExp(`${frameKeyword}(\\d+)$`)) ||
            this._characterName.match(
              new RegExp(`${frameKeyword}\\((\\d+)\\)$`)
            );

          if (frameMatch) {
            const totalFrames = Number(frameMatch[1]);
            this._pattern = (this._pattern + 1) % totalFrames;
          } else {
            this._pattern = (this._pattern + 1) % 3;
          }

          this._patternUpdated = true;
        }
      }
    }
  };

  Game_CharacterBase.prototype.updateMovingState = function () {
    let diffX = this._realX - this._lastRealX;
    let diffY = this._realY - this._lastRealY;

    if (this._animPlatShiftX || this._animPlatShiftY) {
      diffX -= this._animPlatShiftX || 0;
      diffY -= this._animPlatShiftY || 0;
      this._animPlatShiftX = 0;
      this._animPlatShiftY = 0;
    }

    if (Math.abs(diffX) > 0.001 || Math.abs(diffY) > 0.001) {
      this._isMoving = true;
    } else {
      this._isMoving = false;
    }

    this._lastRealX = this._realX;
    this._lastRealY = this._realY;
  };

  Game_CharacterBase.prototype.detectIdleAndMovingGraphics = function () {
    const charName = this._characterName;
    if (!charName) return false;

    this._detectedIdleGraphic = null;
    this._detectedWalkGraphic = null;
    this._detectedRunGraphic = null;
    this._idleHasFx = false;
    this._walkHasFx = false;
    this._runHasFx = false;

    const folderPath = charName.includes("/")
      ? charName.substring(0, charName.lastIndexOf("/") + 1)
      : "";
    const nameWithoutPath = charName.split("/").pop();
    let baseName = nameWithoutPath;

    const fxRegex = new RegExp(
      `${frameKeyword}(\\d+)$|${frameKeyword}\\((\\d+)\\)$`
    );
    baseName = baseName.replace(fxRegex, "");

    let has8dir = baseName.includes("8dir");
    if (has8dir) {
      baseName = baseName.replace("8dir", "");
    }

    const keywordsToRemove = [IDLE_KEYWORD, WALK_KEYWORD, RUN_KEYWORD].filter(
      Boolean
    );
    keywordsToRemove.forEach((keyword) => {
      if (keyword && baseName.includes(keyword)) {
        baseName = baseName.replace(new RegExp(`_?${keyword}`), "");
      }
    });
    baseName = baseName.replace(/_+/g, "_").replace(/^_|_$/g, "");

    const generatePotentialFilenames = function (baseCharName, keyword) {
      if (!keyword) return [];
      let subfolder = "";
      if (folderPath && folderPath.includes("/")) {
        subfolder = folderPath.replace(/\/$/, "");
      }
      const fullBaseName = subfolder
        ? `${subfolder}/${baseCharName}`
        : baseCharName;

      const patterns = [
        `${fullBaseName}_${keyword}_${frameKeyword}`,
        `${fullBaseName}_${keyword}`,
        `${keyword}_${fullBaseName}_${frameKeyword}`,
        `${keyword}_${fullBaseName}`,
      ];

      if (subfolder) {
        patterns.push(
          `${baseCharName}_${keyword}_${frameKeyword}`,
          `${baseCharName}_${keyword}`,
          `${keyword}_${baseCharName}_${frameKeyword}`,
          `${keyword}_${baseCharName}`
        );
      }

      return patterns;
    };

    const findFile = async function (potentialFilenames) {
      // Search cache
      for (const url in PermanentImageCache._permanentCache) {
        if (url.includes("/img/characters/")) {
          const urlParts = url.split("/");
          const filename = urlParts[urlParts.length - 1].replace(".png", "");

          for (const pattern of potentialFilenames) {
            if (filename.includes(pattern)) {
              const hasFx = filename.match(fxRegex) !== null;
              return { filename, hasFx };
            }
          }
        }
      }

      // Desktop
      if (Utils.isNwjs()) {
        try {
          const fs = require("fs");
          const path = require("path");
          const baseDir = path.join(
            path.dirname(process.mainModule.filename),
            "img/characters"
          );
          let filesToCheck = [];

          if (folderPath) {
            const folderDir = path.join(baseDir, folderPath);
            if (fs.existsSync(folderDir)) {
              filesToCheck = fs
                .readdirSync(folderDir)
                .filter((file) => {
                  const ext = Utils.hasEncryptedImages() ? ".png_" : ".png";
                  return file.endsWith(ext);
                })
                .map((file) => {
                  const extLength = Utils.hasEncryptedImages() ? 5 : 4;
                  return folderPath + file.slice(0, -extLength);
                });
            }
          } else {
            filesToCheck = fs
              .readdirSync(baseDir)
              .filter((file) => {
                const ext = Utils.hasEncryptedImages() ? ".png_" : ".png";
                return file.endsWith(ext);
              })
              .map((file) => {
                const extLength = Utils.hasEncryptedImages() ? 5 : 4;
                return file.slice(0, -extLength);
              });
          }

          for (const file of filesToCheck) {
            for (const pattern of potentialFilenames) {
              if (file.includes(pattern)) {
                const hasFx = file.match(fxRegex) !== null;
                return { filename: file, hasFx };
              }
            }
          }
        } catch (error) {
          console.error("Error checking filesystem:", error);
        }
      } else {
        // Non-desktop environment, check manifest.json
        try {
          const manifestResponse = await fetch("manifest.json");
          if (manifestResponse.ok) {
            const manifest = await manifestResponse.json();
            let allCharacterFiles = [];
            if (manifest["img/characters"]) {
              allCharacterFiles = allCharacterFiles.concat(
                manifest["img/characters"].map((file) => file)
              );
            }
            for (const key in manifest) {
              if (key.startsWith("img/characters/")) {
                const subfolder = key.substring("img/characters/".length);
                allCharacterFiles = allCharacterFiles.concat(
                  manifest[key].map((file) => `${subfolder}/${file}`)
                );
              }
            }

            if (allCharacterFiles.length > 0) {
              for (const rawFile of allCharacterFiles) {
                const normalizedFile = rawFile.replace(/\\/g, "/");
                for (const pattern of potentialFilenames) {
                  if (normalizedFile.includes(pattern)) {
                    const hasFx = normalizedFile.match(fxRegex) !== null;
                    return { filename: normalizedFile, hasFx };
                  }
                }
              }
            }
          } else {
            console.warn("Failed to load manifest.json");
          }
        } catch (error) {
          console.error("Error checking manifest:", error);
        }
      }

      return null;
    };

    const detectGraphic = async function (keyword) {
      if (!keyword) return null;
      const potentialFilenames = generatePotentialFilenames(baseName, keyword);
      return await findFile(potentialFilenames);
    };

    const detectGraphicsAsync = async () => {
      if (IDLE_KEYWORD) {
        const idleResult = await detectGraphic(IDLE_KEYWORD);
        if (idleResult) {
          this._detectedIdleGraphic = idleResult.filename;
          this._idleHasFx = idleResult.hasFx;
        }
      }

      if (WALK_KEYWORD) {
        const walkResult = await detectGraphic(WALK_KEYWORD);
        if (walkResult) {
          this._detectedWalkGraphic = walkResult.filename;
          this._walkHasFx = walkResult.hasFx;
        }
      }

      if (RUN_KEYWORD) {
        const runResult = await detectGraphic(RUN_KEYWORD);
        if (runResult) {
          this._detectedRunGraphic = runResult.filename;
          this._runHasFx = runResult.hasFx;
        }
      }

      if (!this._detectedIdleGraphic && IDLE_KEYWORD) {
        this._detectedIdleGraphic = charName;
        this._idleHasFx = charName.match(fxRegex) !== null;
      }

      if (!this._detectedWalkGraphic && WALK_KEYWORD) {
        this._detectedWalkGraphic = charName;
        this._walkHasFx = charName.match(fxRegex) !== null;
      }

      if (!this._detectedRunGraphic && RUN_KEYWORD) {
        this._detectedRunGraphic = charName;
        this._runHasFx = charName.match(fxRegex) !== null;
      }

      this._graphicsDetected = true;
      return true;
    };

    detectGraphicsAsync();
    return true;
  };

  Game_CharacterBase.prototype.updateGraphics = function () {
    const currentName = this._characterName;
    const isAutoGraphic =
      (IDLE_KEYWORD && currentName.includes(IDLE_KEYWORD)) ||
      (WALK_KEYWORD && currentName.includes(WALK_KEYWORD)) ||
      (RUN_KEYWORD && currentName.includes(RUN_KEYWORD));

    if (!isAutoGraphic) {
      this._autoGraphicsEnabled = false;
      return;
    }

    if (!this._graphicsDetected) {
      this._graphicsDetected = this.detectIdleAndMovingGraphics();
      return;
    }

    let isRunning = false;
    if (this.isDashing && this.isDashing()) {
      isRunning = true;
    } else if (this instanceof Game_Follower && $gamePlayer.isDashing()) {
      isRunning = true;
    } else if (this instanceof Game_Event && this.moveSpeed() >= 5) {
      isRunning = true;
    }

    if (this._isMoving) {
      this._isIdleAnimating = false;
      if (isRunning && RUN_KEYWORD && this._detectedRunGraphic) {
        if (currentName !== this._detectedRunGraphic) {
          this.setImage(this._detectedRunGraphic, 0);
        }
      } else if (WALK_KEYWORD && this._detectedWalkGraphic) {
        if (currentName !== this._detectedWalkGraphic) {
          this.setImage(this._detectedWalkGraphic, 0);
        }
      }
      this._stepAnime = false;
    } else {
      if (IDLE_KEYWORD && this._detectedIdleGraphic) {
        if (currentName !== this._detectedIdleGraphic) {
          this.setImage(this._detectedIdleGraphic, 0);
        }
        this._isIdleAnimating = true;
        this._stepAnime = false;
      }
    }
  };

  Game_CharacterBase.prototype.pattern = function () {
    const hasFx =
      this._characterName.match(new RegExp(`${frameKeyword}\\d+$`)) ||
      this._characterName.match(new RegExp(`${frameKeyword}\\((\\d+)\\)$`));
    if (!hasFx) {
      return this._pattern;
    }
    return this._pattern < this._frames ? this._pattern : this._columnIndex;
  };

  Game_CharacterBase.prototype.updatePattern = function () {
    const hasFx =
      this._characterName.match(new RegExp(`${frameKeyword}\\d+$`)) ||
      this._characterName.match(new RegExp(`${frameKeyword}\\((\\d+)\\)$`));

    if (
      this === $gamePlayer &&
      this._autoGraphicsEnabled &&
      this._moveRouteForcing
    ) {
      this._patternUpdated = false;

      if (hasFx || this._isSingleRowSprite) {
        this._pattern =
          (this._pattern + 1) % (this._frames + this._columnIndex);
        return;
      }
    }

    if (this._patternUpdated) {
      return;
    }

    if (!this.hasStepAnime() && this._stopCount > 0) {
      this.resetPattern();
    } else {
      if (hasFx || this._isSingleRowSprite) {
        this._pattern =
          (this._pattern + 1) % (this._frames + this._columnIndex);
      } else {
        // Standard files, use RPG Maker pendulum pattern (0-1-2-1-0...)
        if (!this._animationDirection) {
          this._animationDirection = 1; // 1 = forward, -1 = backward
        }
        this._pattern += this._animationDirection;
        if (this._pattern >= 2) {
          this._pattern = 2;
          this._animationDirection = -1;
        } else if (this._pattern <= 0) {
          this._pattern = 0;
          this._animationDirection = 1;
        }
      }
    }
  };

  const SH_resetPattern = Game_CharacterBase.prototype.resetPattern;
  Game_CharacterBase.prototype.resetPattern = function () {
    if (this._isBigCharacter) {
      if (!this._disablePatternReset) this._pattern = this._originalPattern;
    } else {
      SH_resetPattern.call(this);
    }
  };

  // Make events when setup start with first frame if has fx
  const SH_Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
  Game_Event.prototype.setupPageSettings = function () {
    SH_Game_Event_setupPageSettings.call(this);

    this._customIdleSpeed = null;
    this._customWalkSpeed = null;
    this._customRunSpeed = null;

    if (this.page() && this.list()) {
      let comments = '';
      for (const command of this.list()) {
        if (command.code === 108 || command.code === 408) {
          comments += command.parameters[0] + '\n';
        }
      }

      const idleMatch = comments.match(/<frame idle speed:\s*(\d+)>/i);
      if (idleMatch) {
        this._customIdleSpeed = Number(idleMatch[1]);
      }

      const walkMatch = comments.match(/<frame walk speed:\s*(\d+)>/i);
      if (walkMatch) {
        this._customWalkSpeed = Number(walkMatch[1]);
      }

      const runMatch = comments.match(/<frame run speed:\s*(\d+)>/i);
      if (runMatch) {
        this._customRunSpeed = Number(runMatch[1]);
      }
    }

    const characterName = this.characterName();
    if (
      characterName &&
      (characterName.match(new RegExp(`${frameKeyword}\\d+$`)) ||
        characterName.match(new RegExp(`${frameKeyword}\\((\\d+)\\)$`)))
    ) {
      this._pattern = 0;
      this._originalPattern = 0;
    }
  };

  // Adjust the Change Image command from Set Movement Route to set pattern to 0
  // only if the filename has f<x>
  const SH_Game_CharacterBase_setImage = Game_CharacterBase.prototype.setImage;
  Game_CharacterBase.prototype.setImage = function (
    characterName,
    characterIndex
  ) {
    // Claer 8 dir cache
    if (this._characterName !== characterName) {
      spriteTypeCache.delete(this._characterName);
    }
    SH_Game_CharacterBase_setImage.call(this, characterName, characterIndex);

    if (
      characterName.match(new RegExp(`${frameKeyword}\\d+$`)) ||
      characterName.match(new RegExp(`${frameKeyword}\\((\\d+)\\)$`))
    ) {
      if (this instanceof Game_Event) {
        this._patternUpdated = false;
        this._disablePatternReset = false;
      }
      // For fx characters, set pattern to 0
      this._pattern = 0;
      this._originalPattern = 0;
    } else {
      // For normal characters, reset everything (normal rpg maker behavior)
      this._patternUpdated = false;
      this._disablePatternReset = false;
      this._pattern = 1;
      this._originalPattern = 1;
    }

    const isAutoGraphic =
      (IDLE_KEYWORD && characterName.includes(IDLE_KEYWORD)) ||
      (WALK_KEYWORD && characterName.includes(WALK_KEYWORD)) ||
      (RUN_KEYWORD && characterName.includes(RUN_KEYWORD));

    if (isAutoGraphic) {
      this._autoGraphicsEnabled = true;
      this._patternUpdated = false;
      this._disablePatternReset = false;
      const keywordPattern = new RegExp(
        [
          IDLE_KEYWORD && IDLE_KEYWORD.length > 0 ? IDLE_KEYWORD : null,
          WALK_KEYWORD && WALK_KEYWORD.length > 0 ? WALK_KEYWORD : null,
          RUN_KEYWORD && RUN_KEYWORD.length > 0 ? RUN_KEYWORD : null,
        ]
          .filter(Boolean)
          .join("|"),
        "g"
      );
      if (
        !this._currentAutoCharacter ||
        this._currentAutoCharacter !== characterName.replace(keywordPattern, "")
      ) {
        this._graphicsDetected = false;
        this._detectedIdleGraphic = null;
        this._detectedWalkGraphic = null;
        this._detectedRunGraphic = null;
        this._currentAutoCharacter = characterName.replace(keywordPattern, "");
      }
    } else {
      this._autoGraphicsEnabled = false;
      this._currentAutoCharacter = null;
    }
  };
  //__________________________________________________________________________

  const SH_Game_update = Game_Character.prototype.update;
  Game_Character.prototype.update = function () {
    SH_Game_update.call(this);
    if (this._isPlayingFrames && ++this._frameCount >= this._frameWait) {
      this._frameCount = 0;

      if (this._isReverse) {
        // Reverse playback (counting down)
        if (this._pattern >= this._endFrame) {
          if (this._pattern === this._endFrame) {
            this._isPlayingFrames = false;
            togglePatternReset.call(this, true);
          } else {
            this.toFrame(this._pattern);
          }
        }
      } else {
        // Forward playback (counting up)
        if (this._pattern <= this._endFrame) {
          if (this._pattern === this._endFrame) {
            this._isPlayingFrames = false;
            togglePatternReset.call(this, true);
          } else {
            this.toFrame(this._pattern + 2);
          }
        }
      }
    }
  };

  const SH_Game_updateRoutineMove = Game_Character.prototype.updateRoutineMove;
  Game_Character.prototype.updateRoutineMove = function () {
    return this._isPlayingFrames ? false : SH_Game_updateRoutineMove.call(this);
  };

  function getPlayerFrameSpeed(character, animationType) {
    if (character !== $gamePlayer) {
      return null;
    }

    switch (animationType) {
      case "idle":
        return PLAYER_IDLE_SPEED;
      case "walk":
        return PLAYER_WALK_SPEED;
      case "run":
        return PLAYER_RUN_SPEED;
      default:
        return null;
    }
  }

  // Animation timing
  Game_CharacterBase.prototype.animationWait = function () {
    let moveSpeed = this._isMoving ? this.realMoveSpeed() : this.moveSpeed();
    let baseSpeed = (9 - moveSpeed) * 3;

    if (this === $gamePlayer) {
      let customSpeed = null;

      if (this._isMoving) {
        const isRunning = this.isDashing && this.isDashing();
        if (isRunning) {
          customSpeed = getPlayerFrameSpeed(this, "run");
        } else {
          customSpeed = getPlayerFrameSpeed(this, "walk");
        }
      } else {
        customSpeed = getPlayerFrameSpeed(this, "idle");
      }

      if (customSpeed !== null) {
        return baseSpeed - customSpeed * (this._frames || 3);
      }
    }

    if (this instanceof Game_Event) {
      let customSpeed = null;
      const currentName = this._characterName;

      if (this._isMoving) {
        const isRunning = this.moveSpeed() >= 5;
        if (isRunning && RUN_KEYWORD && this._detectedRunGraphic &&
          currentName === this._detectedRunGraphic && this._customRunSpeed !== null) {
          customSpeed = this._customRunSpeed;
        }
        else if (WALK_KEYWORD && this._detectedWalkGraphic &&
          currentName === this._detectedWalkGraphic && this._customWalkSpeed !== null) {
          customSpeed = this._customWalkSpeed;
        }
        else if (this._customWalkSpeed !== null) {
          customSpeed = this._customWalkSpeed;
        }
      }
      else if (IDLE_KEYWORD && this._detectedIdleGraphic &&
        currentName === this._detectedIdleGraphic && this._customIdleSpeed !== null) {
        customSpeed = this._customIdleSpeed;
      }
      else if (!this._isMoving && this._customIdleSpeed !== null) {
        customSpeed = this._customIdleSpeed;
      }
      if (customSpeed !== null) {
        return Math.max(1, customSpeed);
      }
    }

    return baseSpeed - this._frameSpeed;
  };

  const SH_GameBase_setDirection = Game_CharacterBase.prototype.setDirection;
  Game_CharacterBase.prototype.setDirection = function (d) {
    // Single-row sprite flipping-------------------------------
    if (this._isSingleRowSprite && !this.is8DirSprite()) {
      if (!this.isDirectionFixed() && d) {
        if (d === 6) {
          this._spriteFlipped = true;
        } else if (d === 4) {
          this._spriteFlipped = false;
        }
        this._direction = 2;
      }
      return;
    }
    if (this instanceof Game_Player) {
      if (!this.isDirectionFixed() && d) this._direction = d;
      if (this._disablePatternReset && this._patternUpdated)
        this.updatePattern();
    } else {
      SH_GameBase_setDirection.call(this, d);
    }
  };

  const SH_Sprite_Character_updateCharacterFrame = Sprite_Character.prototype.updateCharacterFrame;
  Sprite_Character.prototype.updateCharacterFrame = function () {
    SH_Sprite_Character_updateCharacterFrame.call(this);
    if (this._character && this._character._isSingleRowSprite && !this._character.is8DirSprite()) {
      if (this._character._spriteFlipped) {
        this.scale.x = -Math.abs(this.scale.x);
      } else {
        this.scale.x = Math.abs(this.scale.x);
      }
    }
  };

  // --------------------------------------------------------------
  const SH_spriteChar_setCharacterBitmap = Sprite_Character.prototype.setCharacterBitmap;
  Sprite_Character.prototype.setCharacterBitmap = function () {
    if (this._characterName) {
      this.bitmap = PermanentImageCache.load(
        "img/characters/",
        this._characterName
      );
    } else {
      this.bitmap = null;
    }

    // Remove !
    const fileName = this._characterName
      ? this._characterName.split("/").pop().replace(/^!/, "")
      : "";

    const frameMatch =
      fileName &&
      (fileName.match(new RegExp(`${frameKeyword}(\\d+)$`)) ||
        fileName.match(new RegExp(`${frameKeyword}\\((\\d+)\\)$`)));

    const isBigChar = fileName.startsWith("$");

    if (frameMatch && !isBigChar) {
      // Single-row sprite: Filename_fx
      const frames = Number(frameMatch[1]);
      this._character._frames = frames;
      this._character._columnIndex = 0;
      this._character._frameSpeed = Number(parameters["Frame Speed"]) * frames;
      this._character._isSingleRowSprite = true;
    } else if (frameMatch && isBigChar) {
      // Standalone (aka Big) character: $Filename_fx
      const frames = Number(frameMatch[1]);
      this._character._frames = frames;
      this._character._columnIndex = 0;
      this._character._frameSpeed = Number(parameters["Frame Speed"]) * frames;
      this._character._isSingleRowSprite = false;
    } else {
      this._character._frames = 3;
      this._character._columnIndex = 1;
      this._character._frameSpeed = 0;
      this._character._isSingleRowSprite = false;
    }

    SH_spriteChar_setCharacterBitmap.call(this);
  };

  Sprite_Character.prototype.characterBlockX = function () {
    if (this._isBigCharacter) return 0;
    if (this._character && this._character._isSingleRowSprite) return 0;
    const index = this._character.characterIndex();
    return (index % 4) * this._character._frames;
  };

  Sprite_Character.prototype.characterBlockY = function () {
    if (this._character && this._character._isSingleRowSprite) return 0;
    if (this._isBigCharacter) return 0;
    const index = this._character.characterIndex();
    return Math.floor(index / 4) * 4;
  };

  Sprite_Character.prototype.patternWidth = function () {
    if (this._tileId > 0) return $gameMap.tileWidth();
    if (this._character?._isSingleRowSprite) {
      return this.bitmap.width / this._character._frames;
    }
    const frames = this._character._frames;
    return this._isBigCharacter
      ? this.bitmap.width / frames
      : this.bitmap.width / (frames * 4);
  };

  Sprite_Character.prototype.patternHeight = function () {
    if (this._tileId > 0) return $gameMap.tileHeight();
    if (this._character && this._character._isSingleRowSprite) {
      return this.bitmap.height;
    }
    if (this._character && this._character.is8DirSprite()) {
      return this.bitmap.height / 8;
    }
    return this._isBigCharacter
      ? this.bitmap.height / 4
      : this.bitmap.height / 8;
  };

  // ================================================================
  // EVENT/PLAYER ACTION SYSTEM
  // ================================================================

  const alias_Game_Player_initMembers = Game_Player.prototype.initMembers;
  Game_Player.prototype.initMembers = function () {
    alias_Game_Player_initMembers.call(this);
    this._lastRealX = this._realX;
    this._lastRealY = this._realY;
    this._isMoving = false;
    this._isIdleAnimating = false;
    this._idleAnimCounter = 0;
    this._autoGraphicsEnabled = true;
  };

  const _H_Window_Base_drawCharacter = Window_Base.prototype.drawCharacter;
  Window_Base.prototype.drawCharacter = function (
    characterName,
    characterIndex,
    x,
    y
  ) {
    const frameMatch =
      characterName.match(new RegExp(`${frameKeyword}(\\d+)$`)) ||
      characterName.match(new RegExp(`${frameKeyword}\\((\\d+)\\)$`));

    if (frameMatch) {
      const frames = Number(frameMatch[1]);
      const bitmap = enablePreload
        ? PermanentImageCache.load("img/characters/", characterName)
        : ImageManager.loadCharacter(characterName);
      bitmap.addLoadListener(() => {
        const big = ImageManager.isBigCharacter(characterName);
        const pw = big
          ? Math.floor(bitmap.width / frames)
          : Math.floor(bitmap.width / (4 * frames));
        const ph = big
          ? Math.floor(bitmap.height / 4)
          : Math.floor(bitmap.height / 8);
        const direction = 2;
        let sx = 0;
        let sy = 0;

        if (big) {
          sx = 0;
          sy = ((direction - 2) / 2) * ph;
        } else {
          sx = (characterIndex % 4) * frames * pw;
          sy = (Math.floor(characterIndex / 4) * 4 + (direction - 2) / 2) * ph;
        }
        this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
      });
    } else {
      _H_Window_Base_drawCharacter.call(
        this,
        characterName,
        characterIndex,
        x,
        y
      );
    }
  };

  const SH_Game_Character_processMoveCommand =
    Game_Character.prototype.processMoveCommand;
  Game_Character.prototype.processMoveCommand = function (command) {
    if (command.code === Game_Character.ROUTE_SCRIPT) {
      const script = command.parameters[0];
      if (script.match(/^(playFrames|toFrame)/)) {
        eval(`this.${script}`);
        return;
      }
    }
    SH_Game_Character_processMoveCommand.call(this, command);
  };

  const SH_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    SH_Game_System_initialize.call(this);
    this._detectedIdleGraphic = null;
    this._detectedWalkGraphic = null;
    this._detectedRunGraphic = null;
  };

  const SH_DataManager_setupNewGame = DataManager.setupNewGame;
  DataManager.setupNewGame = function () {
    SH_DataManager_setupNewGame.call(this);
    $gameSystem._detectedIdleGraphic = detectedIdleGraphic;
    $gameSystem._detectedWalkGraphic = detectedWalkGraphic;
    $gameSystem._detectedRunGraphic = detectedRunGraphic;
  };

  const SH_DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function (contents) {
    SH_DataManager_extractSaveContents.call(this, contents);
    detectedIdleGraphic = $gameSystem._detectedIdleGraphic;
    detectedWalkGraphic = $gameSystem._detectedWalkGraphic;
    detectedRunGraphic = $gameSystem._detectedRunGraphic;
  };

  const SH_Game_CharacterBase_setMovementSuccess =
    Game_CharacterBase.prototype.setMovementSuccess;
  Game_CharacterBase.prototype.setMovementSuccess = function (success) {
    SH_Game_CharacterBase_setMovementSuccess.call(this, success);

    if (success && this.is8DirSprite()) {
      const dx = this._realX - this._lastRealX;
      const dy = this._realY - this._lastRealY;

      if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
        let direction = this._direction;

        if (dx > 0.001 && dy > 0.001) direction = 3;
        else if (dx > 0.001 && dy < -0.001) direction = 9;
        else if (dx < -0.001 && dy > 0.001) direction = 1;
        else if (dx < -0.001 && dy < -0.001) direction = 7;
        else if (dx > 0.001) direction = 6;
        else if (dx < -0.001) direction = 4;
        else if (dy > 0.001) direction = 2;
        else if (dy < -0.001) direction = 8;

        this.setDirection(direction);
      }
    }
  };

  window.PermanentImageCache = PermanentImageCache;
  window.ImagePreloader = ImagePreloader;

  AnimatedPictureManager.initDebugSystem();
  window.AnimatedPictureManager = AnimatedPictureManager;

  // ================================================================
  // 8 DIR
  // ================================================================

  const isDotMoveSystemEnabled =
    PluginManager._scripts.includes("DotMoveSystem");
  const spriteTypeCache = new Map();

  Game_CharacterBase.prototype.is8DirSprite = function () {
    if (!this._characterName) return false;

    // Check cache first
    if (spriteTypeCache.has(this._characterName)) {
      return spriteTypeCache.get(this._characterName);
    }

    // Check filename and store in cache
    const result = this._characterName.includes("8dir");
    spriteTypeCache.set(this._characterName, result);
    return result;
  };

  const _Game_CharacterBase_setDirection =
    Game_CharacterBase.prototype.setDirection;
  Game_CharacterBase.prototype.setDirection = function (d) {
    if (this.is8DirSprite()) {
      if ([1, 3, 7, 9].includes(d)) {
        this._direction = d;
        return;
      }
    }
    _Game_CharacterBase_setDirection.call(this, d);
  };

  if (isDotMoveSystemEnabled) {
    const _Game_Character_dotMoveByDeg = Game_Character.prototype.dotMoveByDeg;
    Game_Character.prototype.dotMoveByDeg = function (deg) {
      _Game_Character_dotMoveByDeg.call(this, deg);
      if (this.is8DirSprite()) {
        const dir8 = new DotMoveSystem.Degree(deg).toDirection8(); // Convert degree to 8 direction
        this.setDirection(dir8);
      }
    };

    const _CharacterMover_dotMoveByDirection =
      DotMoveSystem.CharacterMover.prototype.dotMoveByDirection;
    DotMoveSystem.CharacterMover.prototype.dotMoveByDirection = function (
      direction,
      dpf
    ) {
      _CharacterMover_dotMoveByDirection.call(this, direction, dpf);

      const character = this._character;
      if (character && character.is8DirSprite()) {
        character.setDirection(direction);
      }
    };
  } else {
    const _Game_Player_getInputDirection =
      Game_Player.prototype.getInputDirection;
    Game_Player.prototype.getInputDirection = function () {
      if (this.is8DirSprite()) {
        return Input.dir8;
      } else {
        return _Game_Player_getInputDirection.call(this);
      }
    };

    const _Game_Player_executeMove = Game_Player.prototype.executeMove;
    Game_Player.prototype.executeMove = function (direction) {
      if (!this.is8DirSprite() || direction % 2 === 0) {
        _Game_Player_executeMove.call(this, direction);
      } else {
        let horz, vert;
        switch (direction) {
          case 7:
            horz = 4;
            vert = 8;
            break;
          case 9:
            horz = 6;
            vert = 8;
            break;
          case 1:
            horz = 4;
            vert = 2;
            break;
          case 3:
            horz = 6;
            vert = 2;
            break;
        }
        this.moveDiagonally(horz, vert);
      }
    };

    const _Game_CharacterBase_moveDiagonally =
      Game_CharacterBase.prototype.moveDiagonally;
    Game_CharacterBase.prototype.moveDiagonally = function (horz, vert) {
      _Game_CharacterBase_moveDiagonally.call(this, horz, vert);

      if (this.is8DirSprite()) {
        if (horz === 4 && vert === 8) this.setDirection(7);
        if (horz === 6 && vert === 8) this.setDirection(9);
        if (horz === 4 && vert === 2) this.setDirection(1);
        if (horz === 6 && vert === 2) this.setDirection(3);
      }
    };
  }

  const _Sprite_Character_characterPatternY =
    Sprite_Character.prototype.characterPatternY;
  Sprite_Character.prototype.characterPatternY = function () {
    if (this._character && this._character._isSingleRowSprite) {
      return 0;
    }
    if (this._character && this._character.is8DirSprite()) {
      switch (this._character.direction()) {
        case 2:
          return 0;
        case 1:
          return 1;
        case 3:
          return 2;
        case 4:
          return 3;
        case 6:
          return 4;
        case 8:
          return 5;
        case 7:
          return 6;
        case 9:
          return 7;
        default:
          return 0;
      }
    } else {
      return _Sprite_Character_characterPatternY.call(this);
    }
  };

  const SH_Sprite_Character_patternHeight =
    Sprite_Character.prototype.patternHeight;
  Sprite_Character.prototype.patternHeight = function () {
    if (this._tileId > 0) {
      return $gameMap.tileHeight();
    } else if (this._character && this._character.is8DirSprite()) {
      return this.bitmap.height / 8;
    } else {
      return SH_Sprite_Character_patternHeight.call(this);
    }
  };

  if (
    PluginManager._scripts.includes("DotMoveSystem") &&
    !Imported.Hendrix_Action_Engine
  ) {
    DotMoveSystem.DotMoveUtils.direction2Axis = function (direction) {
      if (direction === 4 || direction === 6) {
        return "x";
      } else if (direction === 8 || direction === 2) {
        return "y";
      } else if (
        direction === 9 ||
        direction === 3 ||
        direction === 7 ||
        direction === 1
      ) {
        return "y";
      } else {
        throw new Error(`${direction} is not found`);
      }
    };
  }

  window.checkDirection = function (target, direction) {
    const character =
      target === "player" ? $gamePlayer : $gameMap.event(target);
    return character ? character.direction() === direction : false;
  };

  window.getDirection = function (target) {
    const character =
      target === "player" ? $gamePlayer : $gameMap.event(target);
    return character ? character.direction() : -1;
  };

  // ================================================================
  // HENDRIX PLUGIN DOCK
  // ================================================================

  function hxGetOrCreateDock() {
    if (document.getElementById('hx-plugin-dock')) {
      return document.getElementById('hx-plugin-dock');
    }
    const dock = document.createElement('div');
    dock.id = 'hx-plugin-dock';
    dock.style.cssText = `
      position: fixed; bottom: 20px; right: 20px;
      display: flex; flex-direction: column; align-items: center;
      gap: 8px; z-index: 9999;
    `;
    const logo = document.createElement('img');
    logo.id = 'hx-dock-logo';
    logo.style.cssText = `
      width: 56px; height: 56px; border-radius: 50%;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      cursor: default; transition: opacity 0.3s, transform 0.2s;
      object-fit: cover; opacity: 0;
    `;

    document.addEventListener('mousemove', (e) => {
      const rect = logo.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      logo.style.opacity = dist < 120 ? '1' : '0';
    });
    logo.src = 'data:image/png;base64,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AhERBv7++fb29A0MAxYUBv7rVf70qfrXR/v58P7pnxwXBvDt4ygeAiQcBf7IMu7AOuPMicq4gtrSuufhz/fz5+i0LiohCi8nFP7UbichEnRjNu7KcurPiu/TkOnPkHhrTN7Iji4gAj4vDCQcCx4YCz0zHLydWe3Kfdi5dO7OiNu+fVtPNP7fl7eicoh4VmdbQe/VmKqXbPjdn5OGaMe/rqVyDSoeBtGXIpRqGW9QE2RIEdWaJodhGM2UJaF0HXpZGC4iCTUnC+rDds6taeW/duC7c+rGetOybvTNgc6uburGfvvViebDfezKg6SLW/vXkuPEherKisSre7qwm+jm4vmmD9yRD7l9DdeWIjIjCNKSIt2bJUk0DNaWJr+HItKWJrB+IP63MOCeK92rUuSzXtKua+7GeurCeu7GflBDK+rGgkY7J/XPierGhu7Kis+xefDOjsiqdsqueurKjta5g92/iPPRlqObjLJ2FoZaE1s9DVI4DHlSEtaSItKOIsqKIfeqK++kKtuVJv2vLeigKdaSJtKSJtuWKtWULMmNKeunM9maMcqOLvauOc2SMNmdO7eENDorE/y+XJd4ROrCfu7Ggu7KjunGi8SmduPBi8qufurKlK1qBioaAtKDDKZmCiAUArd2FhkQA7FyFpNeEtGJG6ltFteNHcaDG7t6GUIrCb9+G7Z2GrJ2Gi4eB69yG9aOIuOZJ9aOJtKOJu7Cfu7GiOrChsqqes+vf6pjBqpmCqZiCqFhCrBrDapmDqZmDq13Mc6qesqqf9TRzaZgBi4aAq9mCqpiCsJxDaNdC7hsDcp3D4ZOCiYWA6ZiDoxTDK5mD6FhD3ZGC2pACsR0FLVtE4ZPDqpnE7pyFyIWB5RkKc6qfpxYC4pOCoZKCpRUDKpiDoJKC4pODk00GYpKBoFGChQLAoZKDioZB0UuFmpGI1k5GmI+Hv76+PPx8AwEAgYCAgcGBv7+/vr6+gICAv///7JXTUoAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAAsTAAALEwEAmpwYAACIKUlEQVR4nN29CXxTZfY3fp57k9ybtJTSFBBp6ZK0tFxKoWlE2WRr2VxwqziOC+6jMuNsOuMy4/zUcZwZZ3EbHbdRx5EpjoLK1rKpoGLaQikXWpqkLQ1UhaSltMm9Se59/p/z3HRhFZX5ve/7f8Q2SdP0fu85z9nPeQiF/ydXb9I3/x0O/p9boXP+E42NikX/Myv0zX6R/D9G194LGrrGFu7VAPhDw5tsmb5vQF/+Yfh/aJ2XOuXPKbfGNtY9xt2n71ee89456UDK/z/pOvzgf16ozTn/3iFHgkOOkoPFP9xsmr70ymDa//+wvnRr5W9alP+5SYlQC+jARYktufYq20XPrbrq/z6s531IryI3XIoP33+FtM37zTeRpXlyZHGtsD2mDekYCtCVi3Kpa4hNnwRXzavoOaNPMsH/zsrbHh5SHc18mdMjYIXIXJi7Ye6oYNj5+LUTms/k9y/ylrTHH6hQbPHwOR1AINSV2gWpIXOs8aFKWJf889//30LXn/1apJGqciuh76/dlDL3I5hxf2nhTXNtFN6HpYdhnmvV1+H9z9zFn13728NWTbN2pFojaYyqqZAWgii38glb6bu+gv8bsObF99F3+EtJ5vVbeD4+3/m3rPao5QePwRCTdmRhwbCL4X293EZf//vnp/kIb+Wj3gYCPES6UqGLDO0iyMep0JXr10lK0jjT9Dczu/+PYz2vOqUJHOC2mfxZTRrvcMBYBaD64iaoAo0vDJW0xae5F1N/w6Xw+hOnoG6PIIrvOPYWqdYOGBVJ86daOyC1CwBSEXauf4jFd/k18yqczf9Hsf7st1CyLTXnHK7zIOTP1QurcsGfEQCAzELwOsiY6hbfPn5sbpsS2kvf4Su6HvnjST4kMMJqeei6OM+eRI6cA9YQpLXQ3FCaPzXNnwrBEXy49crZ4aofvPR/DmtejbVkm+2Bz4IH+fIx8/fvhXaAXD9kmv3sx7mO6lx/rv+W6g0+7Vy7ojR0rb2cvHbL8Z8SjYw9+uClQxLXGeka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';
    dock.appendChild(logo);
    document.body.appendChild(dock);
    return dock;
  }

  function hxAddDockButton(id, label, onClick) {
    if (!Utils.isOptionValid('test')) return;
    const dock = hxGetOrCreateDock();
    if (document.getElementById(id)) return;
    const btn = document.createElement('div');
    btn.id = id;
    btn.textContent = label;
    btn.style.cssText = `
      background: #fff; color: #222;
      border: none; border-radius: 20px;
      padding: 6px 14px; font-size: 11px; font-weight: 600;
      font-family: Inter, system-ui, sans-serif;
      cursor: pointer; white-space: nowrap;
      box-shadow: 0 2px 10px rgba(0,0,0,0.25);
      opacity: 0; pointer-events: none;
      transition: opacity 0.2s, transform 0.2s;
      transform: translateY(8px);
    `;
    btn.onclick = onClick;
    dock.insertBefore(btn, dock.firstChild);

    const logo = document.getElementById('hx-dock-logo');

    document.addEventListener('mousemove', (e) => {
      const dockRect = dock.getBoundingClientRect();
      const logoRect = logo.getBoundingClientRect();
      const logoCx = logoRect.left + logoRect.width / 2;
      const logoCy = logoRect.top + logoRect.height / 2;
      const distToLogo = Math.hypot(e.clientX - logoCx, e.clientY - logoCy);

      const insideDock = e.clientX >= dockRect.left - 20 &&
        e.clientX <= dockRect.right + 20 &&
        e.clientY >= dockRect.top - 20 &&
        e.clientY <= dockRect.bottom + 20;

      logo.style.opacity = (distToLogo < 120 || insideDock) ? '1' : '0';

      const showButtons = distToLogo < 60 || insideDock;
      dock.querySelectorAll('div').forEach(b => {
        b.style.opacity = showButtons ? '1' : '0';
        b.style.pointerEvents = showButtons ? 'auto' : 'none';
        b.style.transform = showButtons ? 'translateY(0)' : 'translateY(8px)';
      });
    });
  }

  if (Utils.isOptionValid('test')) {
    const _Scene_Map_createDisplayObjects_Dock = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function () {
      _Scene_Map_createDisplayObjects_Dock.call(this);
      if (showDockButton) hxAddDockButton('hx-btn-vfx', '▶️ VFX Designer', () => {
        if (!AnimationEditorWindow || AnimationEditorWindow.closed) {
          createAnimationVisualEditor();
          enableEditorPreviewMode();
        } else {
          AnimationEditorWindow.close();
          disableEditorPreviewMode();
        }
      });
    }
  }

  const _0x4bda12 = _0x5d62; (function (_0x5a6c82, _0x51c976) { const _0x31c125 = { _0x161d6e: 0xcf0, _0x57e0d8: 0x523, _0x251339: 0xab5, _0x346b43: 0xa7, _0x4061e1: 0xb57 }, _0x14e560 = _0x5d62, _0x34abf8 = _0x5a6c82(); while (!![]) { try { const _0x1844c7 = -parseInt(_0x14e560(0x47c)) / (0x2e7 * -0xb + -0x9 * 0x95 + 0xad * 0x37) * (-parseInt(_0x14e560(_0x31c125._0x161d6e)) / (-0x2 * 0xf6 + -0x1bb * 0x10 + 0x1d9e)) + parseInt(_0x14e560(0xa15)) / (-0x1a9f + 0xb7 * -0xa + -0x21c8 * -0x1) * (parseInt(_0x14e560(0xb1b)) / (0xcb * 0x2b + -0x1eb5 + 0x1b0 * -0x2)) + parseInt(_0x14e560(0xb44)) / (0x1 * -0x11b5 + 0x1fa7 + 0x2c9 * -0x5) * (-parseInt(_0x14e560(_0x31c125._0x57e0d8)) / (0x26e9 + -0x5d * -0x15 + -0x2e84)) + -parseInt(_0x14e560(_0x31c125._0x251339)) / (0x416 + 0x21ae + -0x25bd) + -parseInt(_0x14e560(0x88a)) / (-0x273 * 0xa + -0xbbd + -0x1 * -0x2443) * (parseInt(_0x14e560(_0x31c125._0x346b43)) / (0x1 * 0xe96 + 0x1261 + 0xf * -0x232)) + parseInt(_0x14e560(_0x31c125._0x4061e1)) / (-0xc1f + -0x2 * 0xb9d + 0x2363 * 0x1) + parseInt(_0x14e560(0x63c)) / (0x5fc + 0x26d + -0x42f * 0x2); if (_0x1844c7 === _0x51c976) break; else _0x34abf8['push'](_0x34abf8['shift']()); } catch (_0x4152a7) { _0x34abf8['push'](_0x34abf8['shift']()); } } }(_0x436a, -0xcf145 * -0x1 + -0x2 * -0x32249 + 0x3 * -0x37813)); let AnimationEditorWindow = null, editorPreviewMode = ![], animationLibraryCache = null; class FileSystemHelper { static async['vfxDesigne' + 'rCopyFile'](_0x58f9f5) { const _0x532f2b = { _0x193dc4: 0xb33, _0x22e015: 0xfe, _0x2b770c: 0xc05, _0x5763de: 0xba0 }, _0x45a46f = { _0x581799: 0x820 }, _0x4e845c = _0x5d62; try { if ('LiVMy' === 'vEJvd') _0x4aac9b[_0x4e845c(0x4e7)]('Error\x20dele' + _0x4e845c(_0x532f2b._0x193dc4) + 'tion\x20from\x20' + 'library:', _0x2fcf59); else { const _0x4e6739 = require('fs'), _0x1b64bc = require('path'), _0x23eb8d = _0x1b64bc['dirname'](process['mainModule']['filename']), _0x6902e1 = _0x1b64bc[_0x4e845c(_0x532f2b._0x22e015)](_0x23eb8d, _0x4e845c(_0x532f2b._0x2b770c), 'pictures', 'Animation'); if (!_0x4e6739['existsSync'](_0x6902e1)) { const _0x16617d = {}; _0x16617d['recursive'] = !![], _0x4e6739['mkdirSync'](_0x6902e1, _0x16617d); } const _0x53813c = _0x58f9f5['name'], _0x12cbac = _0x1b64bc['join'](_0x6902e1, _0x53813c); if (_0x4e6739['existsSync'](_0x12cbac)) { if ('SpwOG' !== _0x4e845c(_0x532f2b._0x5763de)) { const _0x25c1bf = _0x31e3ae['_scene']['_spriteset']['_character' + 'Sprites']['find'](_0x476c2f => _0x476c2f['_character'] === _0xb2e1aa); if (_0x25c1bf && _0x25c1bf[_0x4e845c(0xbfc)] && _0x25c1bf['bitmap']['isReady']()) _0x1d898e(_0x25c1bf, _0x41dcd6); else _0x25c1bf && _0x25c1bf['bitmap'] && _0x25c1bf[_0x4e845c(0xbfc)]['addLoadLis' + 'tener'](() => { _0x4764e9(_0x25c1bf, _0x4303dc); }); } else return 'Animation/' + _0x53813c['replace'](/\.[^/.]+$/, ''); } const _0x4f3314 = new FileReader(); return new Promise((_0x23156e, _0x2cae6b) => { const _0x346108 = { _0x1dccf8: 0x7b1, _0x244642: 0xbf4 }, _0x366d01 = _0x4e845c; _0x4f3314[_0x366d01(_0x45a46f._0x581799)] = function (_0x178573) { const _0x4982ec = _0x366d01; try { const _0x42ec72 = _0x178573[_0x4982ec(_0x346108._0x1dccf8)]['result']['split'](',')[-0x84a + 0xf * -0x10e + -0x181d * -0x1], _0x330691 = Buffer[_0x4982ec(0x963)](_0x42ec72, _0x4982ec(_0x346108._0x244642)); _0x4e6739['writeFileS' + _0x4982ec(0xc98)](_0x12cbac, _0x330691), _0x23156e('Animation/' + _0x53813c['replace'](/\.[^/.]+$/, '')); } catch (_0x2753bf) { _0x2cae6b(_0x2753bf); } }, _0x4f3314['onerror'] = _0x2cae6b, _0x4f3314['readAsData' + 'URL'](_0x58f9f5); }); } } catch (_0x523e9a) { if ('iiBTB' !== 'iiBTB') { const _0x9ebaac = {}; _0x9ebaac['recursive'] = !![], _0x126ee1['mkdirSync'](_0x4ae6f7, _0x9ebaac); } else return null; } } } window['FileSystem' + _0x4bda12(0x3f8)] = FileSystemHelper; function saveAnimationToLibrary(_0x3e6a41) { const _0x2e72ea = { _0x56b53c: 0x41e, _0x543a45: 0x43f, _0x4cfa16: 0xc98, _0xec96ee: 0x3b8, _0xbf705e: 0x9c }, _0x2be47f = _0x4bda12; try { if ('WQyYQ' === 'WQyYQ') { const _0x21c980 = require('fs'), _0x681f33 = require('path'), _0x4d5626 = _0x681f33['dirname'](process['mainModule']['filename']) + '/js/', _0x21adb7 = _0x4d5626 + (_0x2be47f(_0x2e72ea._0x56b53c) + 'olutionLib' + _0x2be47f(_0x2e72ea._0x543a45)); let _0x2834b9 = {}; if (_0x21c980['existsSync'](_0x21adb7)) { const _0x3151a5 = _0x21c980['readFileSy' + 'nc'](_0x21adb7, _0x2be47f(0x3b8)); _0x2834b9 = JSON['parse'](_0x3151a5); } _0x2834b9[_0x3e6a41['name']] = _0x3e6a41, _0x21c980['writeFileS' + _0x2be47f(_0x2e72ea._0x4cfa16)](_0x21adb7, JSON[_0x2be47f(0x519)](_0x2834b9, null, 0x220 + -0x121 * -0x1c + -0x21ba), _0x2be47f(_0x2e72ea._0xec96ee)), animationLibraryCache = _0x2834b9; } else return; } catch (_0x17f91a) { console['error']('Error\x20savi' + 'ng\x20animati' + 'on\x20to\x20libr' + _0x2be47f(_0x2e72ea._0xbf705e), _0x17f91a); } } function loadAnimationLibrary() { const _0x399ad7 = { _0x4a9597: 0x8a5, _0x4bad1b: 0x994, _0x1cbdb2: 0xbeb, _0xe50438: 0xc28, _0xbf17c7: 0x2b9, _0x302449: 0x41e, _0x3bebeb: 0xbe6, _0x1eadc9: 0x4e7, _0x424e82: 0x11c, _0x471fa9: 0x555 }, _0x530fc1 = { _0x1eaf84: 0x3af }, _0x5dc21f = { _0xce63f1: 0x89a }, _0x2b7575 = _0x4bda12; if (animationLibraryCache) { if ('jaacs' === _0x2b7575(_0x399ad7._0x4a9597)) { const _0x28c4b5 = _0x2c0bb8['readFileSy' + 'nc'](_0x579996, 'utf8'); _0x382db3 = _0xb86b6d[_0x2b7575(_0x399ad7._0x4bad1b)](_0x28c4b5); } else return Promise['resolve'](animationLibraryCache); } if (Utils[_0x2b7575(_0x399ad7._0x1cbdb2)]()) { try { const _0x202978 = require('fs'), _0x571c4a = require('path'), _0x24c693 = _0x571c4a[_0x2b7575(_0x399ad7._0xe50438)](process[_0x2b7575(_0x399ad7._0xbf17c7)]['filename']) + '/js/', _0x31c204 = _0x24c693 + (_0x2b7575(_0x399ad7._0x302449) + 'olutionLib' + 'rary.json'); if (_0x202978[_0x2b7575(_0x399ad7._0x3bebeb)](_0x31c204)) { const _0x44c6bc = _0x202978['readFileSy' + 'nc'](_0x31c204, 'utf8'); return animationLibraryCache = JSON['parse'](_0x44c6bc), Promise['resolve'](animationLibraryCache); } } catch (_0x159193) { console[_0x2b7575(_0x399ad7._0x1eadc9)]('Error\x20load' + 'ing\x20animat' + 'ion\x20librar' + 'y:', _0x159193); } return Promise['resolve']({}); } else return _0x2b7575(_0x399ad7._0x424e82) !== 'nTMAH' ? fetch(_0x2b7575(0x7a8) + 'onSolution' + 'Library.js' + 'on')[_0x2b7575(_0x399ad7._0x471fa9)](_0x13be6c => { const _0x31076e = _0x2b7575; if (!_0x13be6c['ok']) throw new Error(_0x31076e(0xa7b) + 'ound'); return _0x13be6c['json'](); })['then'](_0x56ff98 => { const _0x5207c8 = _0x2b7575; if (_0x5207c8(0x2c3) !== _0x5207c8(_0x5dc21f._0xce63f1)) return animationLibraryCache = _0x56ff98, _0x56ff98; else _0x2f1fa5 = -0x2f5 + 0x190c + 0x1617 * -0x1, _0x5ff810 = -0x21d * -0x7 + 0x219a + -0x3b9 * 0xd; })['catch'](_0x42f637 => { const _0x4e6367 = _0x2b7575; return console['warn'](_0x4e6367(0xa0f) + _0x4e6367(0x5a3) + 't\x20found\x20or' + '\x20error\x20loa' + _0x4e6367(_0x530fc1._0x1eaf84), _0x42f637), {}; }) : _0x37fe0a || _0x24d777(); } function _0x436a() { const _0x5a1a09 = ['-columns:\x20', '3TH+L6YjA9', '8187710pxgpsp', '6oYNj5+LUT', 'ked\x20||\x20fal', 'tartX\x20=\x20e.', 'rary\x20{\x0a\x20\x20\x20', 'nchange=\x22u', 'qLi8FgrD86', 'haCLEZxgSk', 'cRKZx9rCfA', 'efZgWKaxel', 'UjSZZBk87P', 'mportant;\x0a', '7/aLPrttDD', 'iS4rIKp1Xo', '\x20var(--sur', 'witch\x20(max', 'e=\x22width:\x20', 'j0kvfPP20k', '\x20>=\x2010)\x20{\x0a', 'INAonXfdhv', 'ibcC3Z9c/A', '\x20else\x20{\x0a\x20\x20', 'vOfWP/TcU3', 'near-gradi', 'ZIkFAKjizR', 'ft;\x0a\x20\x20\x20\x20\x20\x20', 'MAatySlYSh', '\x20\x20\x20if\x20(ani', '\x20<div\x20clas', 'CAvkP9u6bv', '\x20\x20\x20\x20\x20\x20char', '{\x20width:\x20a', 'pener\x20&&\x20w', 'ZFs/Y5wFUL', 'rGgkY7J/XP', 'CIhFdATEBV', 'ZucvTlndXA', '0CdJX2y6Tv', '0px;\x0a\x20\x20\x20\x20\x20', 'Input\x22\x20val', 'DiGcy5/n6s', 'xB13FJqlOs', 'N/Pjx3MeU1', 'H58Be/W7PF', 'uRpIgMYY9N', 'agTICNhxBj', 'e\x20{\x0a\x20\x20\x20\x20\x20\x20', '2),\x0a\x20\x20\x20\x20\x20\x20', 'VTqLfvzTFe', 'Lh697QF9vv', 'abel>Anima', 'ction\x20disp', 'qdJeiR+tgB', 'onst\x20charY', '\x20=\x20(previe', 'IPiMrv6IY7', 'WGsI3WuD0g', '100%;\x0a\x20\x20\x20\x20', 'AZIDVkzech', 'y8eA2IHWnE', 'u8fHuJ9eub', 'skJRUDnALa', 'BAqccNNdDD', 'n\x20p;\x0a\x20\x20\x20\x20\x20', 's,\x20blur\x20*\x20', 'opener.loa', 'ZmDq13Mc6q', 'uY290NqaUD', 'ZtozbWUsql', 'th\x20===\x200)\x20', 'etSpriteCh', 'daF4Yd8ii0', '\x20top:\x200;\x20l', 'SpwOG', 'eName)\x20{\x0a\x20', 'OUMfzvm/4C', 'input[type', 'ghendrix.i', '\x22\x20placehol', 'HCS6WDwtEC', 'iyt8nCT8CZ', 'ue=\x221\x22\x20min', 'XBKOK8T5r8', 'ugE8/OvxN+', '8AoIs+f3dX', 'vj58+hY7yt', '27PCekqaJh', '\x20\x20\x20margin:', 'yQn19QsED7', 'jVPgZwclbf', 'tVIIBICb1I', 'IFYotSBinF', '\x20/\x20180;\x0a\x20\x20', 'ugQAtwqOSk', '\x20\x20\x20\x20\x20paddi', 'previewBgC', 'joJHSFw4XC', 'anvas,\x20blu', 'bcpWzABjZA', 'QSAIdTdDiR', 'h2HdOFUsKV', '||\x20255)\x20/\x20', 'v\x20class=\x22f', '=\x20(p,\x20q,\x20t', 'LZDPilrLqc', 'rWHjy/9aua', '\x20\x20\x20\x20const\x20', 'TN8DOaZvih', 'RYhEu4D85d', 'wHC2hBhdTk', ')\x22>\x0a\x20\x20\x20\x20</', 'st\x20d\x20=\x20max', 'mwAlmZrBLW', 'JMRjYH5vj4', 'edProgress', 'ileWidth\x20=', 'lEoF1IoSNI', 'normal;\x20ma', '-radius:\x20v', '8px;\x0a\x20\x20\x20\x20\x20', 'QlwsqTQ6fe', 'vath3Q1geW', 'pVerticalC', 'vPQS1K19hg', '(blurCanva', '0W2rBjMzfz', 'nt(315deg,', 'ver\x20.libra', 'NUmydSY2Om', '4yyJcAV3/x', 'gL2hOE0ew8', 'ight,\x20fram', 'CfwHnD6n2m', 'oggle-btn\x20', 'eft:\x200;\x20ri', 'VIygKKU7oN', '\x20\x20\x20\x20\x20body:', 'e)\x20||\x200;\x0a\x20', 'ndingAnima', '30skJVURV8', 'uNiAxqGUrS', 'e+Z9I9klzH', 'rG/Dp07YbB', 'existsSync', '3B/tYfsIU3', '8deR6FTqnN', '7AQ3hd7876', 'endingAnim', 'isNwjs', 'QGDtyAVWo2', 'YyJDPWwDd2', 'te,\x201000\x20/', 'FlipY\x20=\x20Ma', '\x20\x20mask-ima', 'ewCanvas.h', '>\x0a\x20\x20\x20\x20\x20\x20<i', 'finalOpaci', 'base64', 'zuiI1f9q7d', 'Counter++;', 'bCJCt+BdAG', 'UrQIxL7kwz', '\x20canvas.wi', 'viTvVRF1pJ', 'BubfLHZ9Sg', 'bitmap', '=\x20r2\x20*\x20255', 'xHoKvH3rze', 'ementById(', 'lyBloom)\x20{', '66MJAi45lr', 'hkwcc2G5uN', 'th\x20=\x20frame', 'ue=\x22255\x22\x20m', 'img', 'w8YaEW9OM8', 's4c3CdgTJB', 't\x20scaleY\x20=', 'ader\x22>\x0a\x20\x20\x20', 'sJba3ONFYb', 'q8Yw8LOnkN', '\x20data.leng', 'GgxMlW7LFf', 'gooQSmIJVa', 'Aa/gegRybt', 'sity:\x20pars', 'uufhz/fz5+', ':\x20#a9a9a9;', 'FLNq5EZv3u', 'UQOGh5gWIK', 'In\x22>Scale\x20', 'px)\x27;\x0a\x20\x20\x20\x20', '\x20\x20\x20\x20let\x20la', 'ujuqBAcWNs', 'K8/paPv1De', 'LD9K+h2LgR', 'a95f/jeyPr', 'ld\x22>\x0a\x20\x20\x20\x20\x20', 'dGzNDwQMp5', 'Zo5ZYXUksf', '+xefDOjsiq', '+BXb3mcB6x', '2,\x202)\x20/\x202;', '\x20\x20\x20\x20\x20}\x0a\x20\x20\x20', 'ut\x20=\x20setTi', 'estTWbfXYf', '\x2011px;\x22>\x0a\x20', 'hMo2Z4K8Bo', 'pan>Flip\x20V', 'dirname', '</script>\x0a', 'L2w/koqvJ8', 'animData.o', 'FPghxsieCd', 'TnZYklB4s4', 'jWCvG+sYLA', 'UEChXeBqaU', 'pyFile(fil', '\x20\x20\x20\x20\x20\x20\x20sca', 'n\x20class=\x22r', '\x20\x20\x20transit', 'pidzNgdPuS', 'eight\x20=\x20an', 'ZYKvwifK0C', 'rary\x22\x20oncl', 'Library();', 'Input.valu', 'rg47BaWnY2', '\x20\x20\x20\x20\x20\x20\x20if\x20', '*\x20previewS', 'yqoXV+HPys', 'ameHeight,', '\x20\x20return;\x0a', 'VTrihbdXSH', ':\x2011px;\x20fo', 'else\x20{\x0a\x20\x20\x20', 'kEcdiu3jBl', '\x20\x20\x20\x20\x20\x20temp', '5j/a4C9N0w', 'nst\x20animNa', 'KUGU+lNbip', 'ating\x20=\x20tr', 'ener(\x27mous', 'FlBQqIRTWY', '2W6eHXr+cB', 'xLTnx+dduO', 'M1FEhEtROf', 'vent/playe', 'aiCZ70J5WR', '/6)\x20return', 'yyEahXeu7o', 'Zza7YUmls4', '\x20\x20\x20\x20\x20\x20if\x20(', 'hecked\x20||\x20', '::-webkit-', 'rvzeKOe0zU', '2ljNFgYZ3G', '2vVrwRjd+p', '1CfQdxvuQL', 'LwOsiY6hbf', 'iFgGE4CMON', 'OKIccwxbDM', 'to;\x20margin', 'r56LEW7su6', '-\x20ANIMATIO', 'lixWLNsMwV', '5FKoAXCHTf', 'mily:\x20var(', 'Y2Fzrj/X0W', '3QXQyKQx6H', 'WEvAAwWUgQ', 'v>\x0a\x20\x20\x20\x20\x20\x20<', '\x20\x20finalSca', '\x20\x20\x20\x20\x20\x20\x20.co', 'QYUkntnueP', 'value\x20=\x20an', 'LHrsenjbWv', 'kbox\x27)?.ch', '7ZibvUZzJl', 'i\x20=\x200;\x20i\x20<', 'MIEVIwqUkq', 'ng)\x20{\x0a\x20\x20\x20\x20', 'ybtJTSFBBp', 'tton\x20{\x0a\x20\x20\x20', 'joC31EtF8H', 'oad\x20=\x20func', 'mCtx.drawI', 'idth\x20=\x20cha', 'splay\x22\x20sty', 'Sprites', 'Hyf+9TusIo', 'iuaZp53z5T', 'ArqTxyzQmC', 'tkqCjiyXxH', 'rRRL6repq+', '0Og0TTRKoT', ';\x22>\x0a\x20\x20\x20\x20\x20\x20', 'canvas', 'r(--text);', 'teWidth\x20*\x20', 'w9+uClQxLX', '100vh;\x0a\x20\x20\x20', 'adAnimatio', '\x20d\x20+\x202)\x20/\x20', 'lay(relati', 'wVaoglpogC', 'fOjxOUSvm/', 'ess\x20=\x200;\x0a\x20', 'getElement', '}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20', 'ontal\x20=\x20do', 'ata\x20=\x20imag', 'r:\x20pointer', '),\x20linear-', 'pow(-2\x20*\x20p', '\x22number\x22\x20i', 'tX47qM9KMt', 'GTTzp1fPqW', 'Q/6wGon4Wb', '\x20\x20\x20\x20displa', 'anvas.heig', 'ync', 'WVkw6YxQM+', 'nimData.fl', 'sG0KWByWL7', '\x20\x20</select', 'QsuXKdcGFZ', 'UXc5Yr4Yjc', 'zCQYHWnNZk', '\x20\x20\x20\x20\x20\x20open', 'dZunGVmHZw', '\x20\x20\x20\x20\x20\x20docu', 'n\x20Settings', '0B8SqqJDi8', 'v>\x0a\x20\x20\x20\x20\x20\x20\x20', 'o5yxO1WvQ2', 'DWS6SFOvGq', 'iBQy0AILYH', 'jNWjAY63de', '/btLn+PFj/', 'Zj0qorCLyd', 'tion\x20value', 'vLSpkMveRv', 'r\x20{\x20opacit', '10w6gwAVAW', '&\x20characte', 't;\x0a\x20\x20\x20\x20\x20\x20\x20', '1GMWLmEKFR', 'in);\x0a\x20\x20\x20\x20\x20', 'D07FNgNe7E', 'rddryvi1mL', 'left', 'uQ5fjGHPdV', 'wuxNq7f9YM', 'q3dTY39qwG', 'RPLQF3A2Ng', 'gOx2iC9r1t', '\x20\x20</div>\x0a\x0a', '\x20\x20<button\x20', 'RealWidth\x20', 'jdonOq5nxv', '\x20\x20\x20\x20\x20\x20\x20b2\x20', 'PlayingOpe', 'riteRealWi', 'jea70y3qc8', 'MiiKFCVkXg', '255)\x20*\x20(fi', '019lhGXszv', 'ace-3);\x0a\x20\x20', 'utImageDat', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20}', 'zcBsjFUH0r', 'tGV/DnjZh1', 'TthjtzNExB', 'font-weigh', 'div\x20class=', 't4AUJ6IqBl', 'c7BIIaIiUq', 'tzt/8ad/Vc', 'CFrD+JO0o0', '\x20box-shado', 'e\x20=\x20Date.n', ':\x20parseInt', 'adius-sm);', '();\x0a\x20\x20\x20\x20\x20\x20', 'PBLTsaBLqj', '<\x200.5\x20?\x20l\x20', 'iYGZfZlkXK', '=\x200;\x0a\x20\x20\x20\x20\x20', 'Mp5i5asDRe', 'Px2nhLvCs+', 'SKCqIiO+hE', 't\x20drawChar', 'qctViijM3i', '\x20if\x20(animD', 'v1c+QMFE3K', 'round:\x20tra', 'C5NxfdHv5P', 'closed', 'te-columns', 'q1/S2nZ+Ls', 'dal\x20{\x0a\x20\x20\x20\x20', 'Jr+HItKWJr', '2rgb\x20=\x20(p,', 'nter;\x20curs', '=\x201;\x0a\x20\x20\x20\x20\x20', 'bloomCanva', 'T66o4ibIPL', '2Lao8L4MSK', '2VEoRIN', 'in\x20library', 'arScale\x20=\x20', 'imData.ani', 'KND3TDZmLo', 'TeZT9Dw2Kf', '\x20\x20\x20box-sha', 'XrF40u9lv8', 'th,\x20frameH', '9rYPO4PSiZ', 'ameWidth;\x0a', '\x20-drawWidt', '8Lg9blrjjj', '\x20const\x20cha', 'FMKMArN8+8', 'jbtUqgGQhV', 'th;\x20i\x20+=\x204', 'Modes\x20=\x20{\x0a', 'cGBv7+/vr6', 'Gyl3qv2a2L', 'set:\x202px;\x20', '3TM4nt4Pl2', 'cterSprite', 'SrbbIxbgGu', '\x20\x20\x20\x20\x20\x20padd', 'UCTvAVaaRH', 't\x20*\x204);\x0a\x20\x20', 'ZGdJJTiIFw', 'DC9k0KS7FY', 'UVl+2IGWKx', 'luKv8iO0NB', 'KGdo7OXrvM', 'veTargetSp', '\x20\x20\x20\x20if\x20(s\x20', 'ctx.drawIm', 'empCanvas.', '\x20item.appe', 'weDIw2Yzu5', '7R17dJfaOX', 'C5rp7U8iGQ', 'rentY\x20-\x20dr', '\x20\x20if\x20(curr', 't\x20!importa', '\x20\x20);\x0a\x20\x20\x20\x20\x20', 'g+6+jRCzn9', 'acing:\x200.3', 'var(--acce', '9KJenoEwkb', 'lBdgIG3iol', 'nt\x20=\x20rotat', 'fsetX\x20=\x20pa', 'GufrHCYnnL', '\x20\x20let\x20disp', 'WpEHSWWa3j', 'YUGDt1VIfX', 'pCount\x20===', 'YgVkVU3CsK', 'O8pginrJ/S', 'JREjrgR69Y', 'SUhEUgAAAO', '6rB09/Jvv4', 'SamEmMsliD', 'd(\x27offsetY', '\x20\x20\x20\x20\x20\x20\x20\x20<i', 'pAV2IbM74s', '\x20p\x20=\x202\x20*\x20l', '63OPr0Z/9Y', '55);\x0a\x20\x20\x20\x20\x20', 'd7FPJvx6Eh', ':\x20flex;\x20al', '0ek0GoY1sV', '89G7O9qXR9', 'c0Ob0+oOB1', '5m/z9A7RJ6', '2);\x0a\x20\x20\x20\x20\x20\x20', 'W4aov57YB1', '(\x27bloomChe', 'NT5krWVyWr', 'w\x20*\x20frameH', 'ary();\x0a\x20\x20\x20', 'yingOpenin', 'mBtRcrwVKK', 'ames;\x0a\x20\x20\x20\x20', 'tch.io</a>', 'dRx5EpjoLK', '\x20transpare', 'Dg/ETwc2M2', 'ionNameInp', 'U8NYQaRRpt', '\x27,\x0a\x20\x20\x20\x20\x20\x20\x20', '\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20', '\x20\x20\x20\x20border', '\x20/\x20d\x20+\x20(g\x20', 'd:\x20#353434', ':\x2010px;\x0a\x20\x20', 'paqPA1MxcM', 'Sh9+51iP5u', 'x5lj8+M35W', 'me\x20=\x200;\x0a\x20\x20', 'ameOffsetY', 'anMWcj52Tn', 't\x20btn\x20=\x20do', 'fYvPu8RoeI', 'w/holPAIyI', 'j5wEXAoke5', 'crollbar\x20{', 'img;\x0a\x20\x20\x20\x20\x20', '=\x200\x20||\x20app', 'nvas.paren', 'RP3/1nwZXB', '\x20\x20\x20\x20\x20\x20\x20\x20pr', '/lcOT93bv/', '\x20\x20\x20\x20\x20<labe', 'll\x0a\x20\x20\x20\x20\x20\x20\x20', '\x20\x20break;\x0a\x20', 'p4YykDUDed', 'oHYIZvTEIS', 't);\x0a\x20\x20\x20\x20\x20\x20', 'XQFCIx6f8Y', 'ary:', '152,0,0.15', 'cU0DC0TZSc', '20\x22\x20onchan', 'us:\x206px;\x0a\x20', '0,\x20preview', 'pan>\x0a\x20\x20\x20\x20\x20', 'ange=\x22upda', 'wWidth\x20=\x20f', '\x20\x20\x20}\x20else\x20', 'acterFirst', '171135UlvpQw', 'er-bottom:', 'tvOS3UWCxn', 'lementById', 'fl7U1T3Fnz', 'ioel/J77U9', 'kDpB2LJq43', 'olor\x20=\x20\x27#1', 'oZ0vypqnAk', '112/kONNii', 'innerHTML\x20', '(bloomEnab', 'kMvUpp4jkJ', 'onst\x20relat', 'jCYXHGWEYi', '89zB9+/EvO', 'max\x20=\x20Math', ';\x20border-r', '\x22>\x0a\x20\x20\x20\x20\x20\x20<', 'AyX4B6FAh3', '(hue\x20!==\x200', '(\x27randomRo', 'YeuUFW3zoK', 'Uf6Oo+9ta9', 't\x20characte', 'utline-off', '\x0a\x20\x20<div\x20cl', '0;\x0a\x20\x20\x20\x20\x20\x20\x20', 'RQRCQKu4Yu', 'btn-primar', '\x20reduce\x20an', 'tById(\x27ani', 'W7Nb9+vZkA', 'fQjtCQsCFY', 'aUrl:\x20char', 'ionCheckbo', 'ay27TTlvZk', 'QpSdhfhsLY', 'd3MheWvczA', 'FHghqokSjE', 'Input\x27)?.v', 'tion\x20anima', '\x20\x20\x20\x20\x20\x20posi', 'Box\x27);\x0a\x20\x20\x20', 'ZNlVoniM7J', 'jINQIsGKXo', 'om()\x20*\x20360', 'WQx7MFDQF0', '\x20\x20animatio', '\x20\x20\x20\x20\x20\x20grid', 'vb8kZnZcYy', 'qdCssRQAHx', 'JbKYDHLcs1', 'aracterSpr', '();\x0a\x0a\x20\x20\x20\x20\x20', 'X0ZHMcgAkR', '#1f1f1f;\x0a\x20', '7vTRGmrWvh', 'CrhE6nIIgF', '\x20\x20\x20\x20\x20\x20curs', '\x20=\x20Math.mi', '12CK9OQ2lV', '2NFWxC1Ln1', '\x20\x20select\x20o', 'ayout\x22>\x0a\x20\x20', 'iv>\x0a\x20\x20\x20\x20\x20\x20', 'IWza9ft266', 'w\x20=\x20docume', 'sDS1GTZXte', 'ty\x20=\x20parse', 'g:\x20-0.3px;', 't\x20=\x20null;\x0a', 'tyle=\x22padd', 'tjzewNFr01', 'XTB/6dmMqR', 'y[animatio', 'dragOffset', 'max=\x22999\x22\x20', 'QMMjhEyYdO', 'ottom:\x2010p', 'tline:\x20non', '\x20transitio', '523t7GaBDj', '13px;\x20}\x0a\x20\x20', 'lt;\x0a\x20\x20\x20\x20\x20\x20', '80SlIdCuAS', 'iyUKluXwbv', 'join', 'uWBcUpM7vL', 'FDBtISfOIf', 'Twvm5h3h7D', '>\x0a\x0a\x20\x20\x20\x20<di', '\x20\x20\x20\x20\x20\x20\x20}\x0a\x20', 'px;\x20cursor', 'ap._url)\x20{', '-radius-sm', 'FR3SNKCUpE', 'P++mci16+8', '\x20border-ra', 'OfzMnF++AH', 'W9O2nR4sQa', 'rgba(255,\x20', 'v7b6v6+Y0z', '9sz4idwk//', '\x2016);\x0a\x20\x20\x20\x20', '/div>\x0a\x0a\x20\x20\x20', 'ign:\x20cente', 'ame(animat', 'T6AGHKPLkv', '\x20\x20\x20\x20width:', 'te)\x20{\x0a\x20\x20\x20\x20', 'finalFlipY', 'CjIyBjRRQL', 'RLtdMEZpsP', '\x22checkbox\x22', 'ZhwwUA56xL', 'R5mVNSabQ9', 'CjEIT', 'xQSzUd3f30', 'KYQSkw6Non', 'Id(\x27hueInp', 'jv6JLo2zFm', '\x20\x20.field\x20b', 'rQHTpHnvbd', 'hter\x27,\x0a\x20\x20\x20', 's49vWPS20X', 'el>\x0a\x20\x20\x20\x20\x20\x20', 'C6bRWt4yd9', '=\x22updatePr', 'mData.hue\x20', 'ja76eFzN3U', 'COLUMN\x20-->', 'HaUzhmG1P6', 'T1hoQpqIeU', '*\x20255;\x0a\x20\x20\x20', '\x20\x20\x20\x20\x20\x20\x20\x20re', 'ItWmUT+77L', '\x20\x20\x20\x20\x20\x20}\x0a\x20\x20', 'viewCtx.fi', '00h+4CuRbN', '0VsLnth47o', 'hange=\x22upd', 'OBNVZVGQRV', '+\x20s)\x20:\x20l\x20+', '\x209px;\x0a\x20\x20\x20\x20', 'if\x20(max\x20==', 'kTwpigdIMn', ':\x202px\x20soli', 'en\x27;\x0a\x20\x20\x20\x20\x20', 'item-delet', '\x0a\x20\x20\x20\x20\x20\x20<!-', '3cD++7+f2m', '\x20animData]', 'aeCMvIuWWZ', 'ter-spacin', 'J3lqtkMNWP', 'bn3RjHYCKB', 'qreAOTiArg', '1;\x0a\x20\x20\x20\x20\x20\x20\x20', 'U6goibXYDE', 'oONgEawbwt', 'bDKU1kg2lM', 'BwQfbn37/b', '5ZaLxLCVeC', 'nput\x20type=', 'tLQ0LJgIsT', 'h23wxL9hSN', 'template-c', 'ut</option', ':\x20pointer;', 'ant;\x0a\x20\x20\x20\x20\x20', '9FVKiB7+YV', 'gAnim\x20=\x20fa', '055GN07/vU', 'b(p,\x20q,\x20h\x20', 'j4ZwWuF64e', 'drAORtt14G', 'YinU6EQR58', '\x20\x20frameHei', 'rite.width', '2bJUk0DNaW', 'mageData.d', 'qfUZ9rRQEF', '8q33t+Bn6p', '/4GHWKGnAv', 'jbbb8J2dhq', 'zIlhQ3ds+J', 'on:\x20backgr', '\x22>\x0a\x20\x20\x20\x20\x20\x20\x20', '-toggle\x20{\x0a', '\x20\x20\x20\x20\x20--acc', 'e();\x0a\x20\x20\x20\x20\x20', 'NsOuMy4/zU', 'ed\x20||\x20fals', 'ckQNwwhVkI', 'e:\x2010px;\x0a\x20', 't:\x2040px;\x0a\x20', 'if\x20(!curre', 'ry(animati', '+G9cJNpPir', 'bel>Scale\x20', 'ale;\x0a\x20\x20\x20\x20\x20', 'px;\x22>\x0a\x20\x20\x20\x20', '/div>\x0a</di', '\x20return\x20q;', 'lid\x20var(--', '\x20progress\x20', 'F0EGSSFecL', '\x20||\x200;\x0a\x0a\x20\x20', 'Data.opaci', 'nt(documen', 'dEventList', '.getElemen', 'y:\x20grid;\x20g', 'olorInput\x27', 'GSh9+bZiZj', '\x20\x20\x20\x20\x20\x20\x20cha', 'lue\x20=\x20anim', '2zTPTPWJ9T', ';\x20color:\x20v', 'st\x20randomF', 'oSaveTimeo', '\x20?\x20-1\x20:\x201)', 'bel>\x0a\x20\x20\x20\x20\x20', 'U2W15/eX9O', 'nter;\x20user', 'u/Hv5R+jOG', '7+6l8SPldN', '\x20\x20drawHeig', 'andomUpdat', 'focus', '\x20\x20const\x20ti', 'a4PRMLp+1P', '1ejNVVNiW6', 'poGBaocNH6', 'gAnimation', 'NTijQZWdvK', 'rv9Mler95j', 'ry(name,\x20a', 'vFRIAaiAEh', 'et.files\x20&', '8jFMp+JLGg', 'deleteAnim', 'NFEfI7vDNh', 'Width\x20=\x20dr', '6EM7mHaXTh', 'style.disp', 'h58cK6N0Uv', 'i7qd//wdXv', 'h.round(de', '\x20\x20\x20ctx.sav', 'ion\x20startL', '2\x20*\x20l\x20-\x20q;', 'BCdWgQm0CS', 'PgtYYWi+DB', 'MtlWI3pSR5', 'bCyaqnY4vY', 'xSJoIqY1Q1', 'tintR\x20=\x2025', 'nIWmiBFqwc', 'KW1LjgFdc2', 'PDVUyCk9jr', ',\x20g2,\x20b2;\x0a', 'imageData,', 'ZxGtoS0JmG', '8O57ZD3AS7', 'const\x20temp', 'gc0zWdn1UP', 'iP6n7Bm1Hm', '63AeP4MnFb', 'e\x20=\x20animDa', 'onchange=\x22', 'e);\x0a\x20\x20\x20\x20\x20\x20', '\x20min\x20=\x20Mat', '\x20\x20\x20\x20\x20\x20let\x20', 'yd9PRTzuiX', '50SempMlnZ', '\x27none\x27\x20&&\x20', '>\x0a\x20\x20\x20\x20\x20\x20<s', '=\x20blurredC', 'yS0S4M9n9I', 'ansition:\x20', 'tps://sang', 'terSpriteT', 'x+ILyW14yb', 'RgKQ14fSiG', 'rqtMqDJU7V', 'tintColorI', 'n-height:\x20', '\x20currentRa', '\x20}\x0a\x20\x20\x20\x20\x0a\x20\x20', '\x20\x20\x20\x20\x20curso', 'Yl763u5jYR', '\x20\x20\x20\x20\x20\x20anim', 'W/yHQXncgZ', 'dth\x20/\x202)\x20+', 'Tm/t78WRYG', 'eToLibrary', 't)\x20*\x206;\x0a\x20\x20', 'ox\x27)?.chec', 'TADZwUSw8b', '0;\x22>©\x202026', '\x20\x20const\x20te', '\x20\x20\x20\x20\x20\x20\x20\x20cu', 'jaWy475+I/', 'p:\x208px;\x22>\x0a', 'DeKNU24W1s', '-select:\x20n', 'Zl+wgAUJj7', 'oYAlWMhk6y', 'relative;\x0a', '<\x202/3)\x20ret', 'QdQEdWEA8C', '\x20\x20\x20\x20\x20\x20\x20\x20};', 'se;\x0a\x20\x20\x20\x20\x0a\x20', 'mo1fkYvbWl', 'one\x27;\x0a\x20\x20\x20\x20', 'BJCjRCTiuA', 'eningAnim\x20', 'LXk8bgDZUw', 'UKmo8rB+W4', 'c3dmwSt//K', 'tEBGME6DAF', 'f71hUx6JoK', '\x0a\x20\x20\x20\x20\x20\x20<la', 'domFlipVer', 'Delay\x20=\x2010', 'jXCbVVS2+W', 'tuhqh/ylcx', 'ry()\x20{\x0a\x20\x20\x20', 'xt(\x272d\x27);\x0a', 'x.rotate(f', 'yPUPfKjweu', 'u6oxqf/uft', 'h3IUDY9sPf', 'm9/+cC3XRq', 'IqO6Gk0iWg', '.5\x20?\x202\x20*\x20p', '8i4tQ8P6BM', 'hgSVwbK3hY', 'ms/k9y/ylr', '\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20', 'afOIxqxB1s', 'xpszjMgijQ', 'eXLqBYsamD', 'im\x20=\x20false', 'xt-align:\x20', 'mentById(\x27', 'q22uPym9uP', 'form:\x20tran', 'VPg2dB1E2q', '/gs+xTqj+R', 'K1LRCaI4qS', 'TOOtZj0QK8', '6BKrMI20Ku', 'ont-weight', 'fileBox.te', 'v2yfiTV3oi', 'yB6GtXb4Y8', 'zpBGwqc+LB', '\x27)?.checke', 't\x20{\x20color:', ';\x0a\x20\x20\x20\x20\x0a\x20\x20\x20', 'dSlhhYz9u2', '4vjBectinS', '.width\x20=\x20M', 'tion:\x20abso', '\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20', 'y9OGMg1nQS', 'tvX+qQr1fy', 'wCharacter', 'tesheet.he', 'sXlw5vCd3S', 'U5EO8Dl5qN', 'QWUjA9loXq', 'e\x20=\x200;\x0a\x20\x20\x20', 'B/tq1PHuH3', 'd2MSpaBflT', '\x20drawChara', '\x20-\x201/3);\x0a\x20', '\x20font-size', 'ht\x20=\x2048;\x0a\x20', 'blurAmount', '7YdJtNWIb+', 'wK9jFpi3/6', 'ugkgLxEjxd', 'hFkhiSyMrH', '/RPJhLYGJ9', '\x20\x20\x20\x20\x20\x20marg', 'rAmountInp', '\x20\x20\x20\x20top:\x200', 'j2KQGLRAFg', 'AKOmlDQ1Bz', '+sl27MPPsb', 'wLitPHnFQM', 'frame\x20+\x201)', 'ackground-', 'dius:\x2020px', 'eDisplay\x20=', 'a83Xe95w3v', 'YVvMtgKzEB', 'ontext(\x272d', '\x20h\x20+=\x201;\x0a\x20', 'QgWWkOINMp', 'iew()\x20{\x0a\x20\x20', 'tton>\x0a\x20\x20\x20\x20', 'yK2/JInFtn', '2rki05KNUN', '(--text-mu', '\x22image/*\x22>', 'ijsAvmj79U', 'rame\x20/\x20ani', 'Zu6CCbtxH3', 'oothing:\x20a', 'nd\x20Tiles</', 'GrblgR+prh', 'alComposit', 'nNyTNMIcJw', '.checked\x20|', 'display:\x20g', 'patternWid', 'RbUdcCZFDs', 'iYTYUxATxu', '\x20\x20\x20animati', 'FCIW/a8/+e', 'Canvas.par', 'fFeVVnW12r', 'j12gt5Do4Q', 'lect:\x20none', 'tkeaJopqIS', 'mFlipY\x20=\x20f', 'pCLxgeygum', 'XvPlejRRQU', 'FCBazNzUsm', 'aw2DvxNjiA', 'eVW2m2qeaQ', 'Xr10lK0jjT', 'data[i\x20+\x202', 'm\x27;\x0a\x20\x20\x20\x20\x20\x20', 'oqIo2cxAZL', 'dl+7QpLynv', ':\x208px;\x22>\x0a\x20', 'ht:\x20100%;\x20', '\x220\x22\x20max=\x223', 'fVzOgu8tnD', '\x20\x20\x20\x20\x20\x20.clo', 'K++kKtuVJv', 'tainer.cli', 'QSN4/l53oX', 'onst\x20anima', 'C0alg6En85', '+8UtQelkD9', 'Data.rando', 'y/JbYqAHSM', 'Lc/lF76gUk', 'temInfo);\x0a', '3Z+y4Lw1FD', 'ById(\x27hueD', 'prite', 'ight\x27\x20&&\x20i', 'ntialiased', 'nRl7RR8jsV', '-sprites-b', 'U0AQ9WP+mg', 'n71o5cG6ir', '\x20+\x201]\x20=\x20g;', '\x20\x20\x20\x20};\x0a\x20\x20\x20', 'GENej6CCy3', '\x20deleteBtn', 'animData.p', 'items:\x20cen', 'e:\x20documen', '\x20previewCa', 'bKC+YY1iZK', '+gICAv///7', 'let\x20ending', 'AakBF50y97', 'OQCm8cLiJ0', 'zhSxfPm154', '\x20\x20\x20\x20s\x20=\x20l\x20', 'eight;\x0a\x20\x20\x20', 'JFBaoVSt1K', '1U4cZ8qic9', 'as\x22></canv', 'to\x20bottom,', '\x20\x20\x20const\x20e', '\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20', 'NdZ6zSB1uw', '55\x20-\x20r\x20/\x202', '7x1h4t+SjR', 'raryAnimat', 'OzfWdvnT2S', 'czYAcA8tqw', 'ource-over', '7Oa9aXC+H2', 'ZiDoxTDK5m', 'review();\x0a', 'fRv3OAXu0J', 'one;\x22>\x0a\x20\x20\x20', 'size:\x2039px', 'eData(0,\x200', 'eYcEYg9E1a', 'lFlipX\x20=\x20a', 'EBuUd8WIFE', '\x20\x20\x20\x20\x20\x20upda', 'VTAaA6v+BC', 'KqZm1eztyF', 'hasFocus', 'YJIGlgjqIK', 'racterSpri', 'FKtjmq951L', '\x20\x20\x20\x20\x20<inpu', 'NRCkrWviTq', 'gqQIGCwCOx', 'dex\x20=\x20zInd', ':\x20\x27source-', 'ftY11tspOl', '\x20\x20<label\x20s', 'offsetYInp', '70qfrXR/v5', 'ZsN0SUZkfn', 'nput\x27).val', '-\x20charHeig', 'onst\x20opaci', 'o//umecXvG', '0KGgoAAAAN', '\x20\x20\x20\x20\x20\x20\x20\x20ct', 'ht:\x2010px;\x0a', 'fileInput.', 'qLuKWs+kfc', 'mainModule', 'ottom:\x2020p', 'low\x20Charac', 'FrO+/4vW5+', 'drawImage', '7PXL8f1e1a', '\x20\x20\x20\x20r2\x20=\x20h', '/p9boXP+E4', 'T5EWwXQ9wF', 'pe=\x22number', 'rqPDL', 'rites-butt', 'UObbRa4a4u', '\x20blendMode', 'BolltrZ9xw', 'eDG6UJUgIr', '6UdWzQQzZE', '\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20', '\x20const\x20ran', 'C6Wqe+v3xg', 'MtGNj/SWlC', ');\x0a\x20\x20\x20\x20\x20\x20\x20', '--mono);\x0a\x20', 'zqdCV9KRYc', 'tter-spaci', 'tuFLtuX45l', 'LrgBFgxC+j', '</div>\x0a\x20\x20\x20', 'button>\x0a\x20\x20', ':\x20var(--su', '1TrIaSDV45', '\x20\x20\x20ctx.glo', 'tWidth\x20-\x204', 'en2UeomT0r', 'randomRota', '\x20\x20\x20\x20\x20--rad', 'th,\x0a\x20\x20\x20\x20\x20\x20', 'cWwngL/s8g', ':\x20center;\x0a', 'yyNDykyVte', 'kWyzJZto+8', 'me\x20-\x20lastF', 'g2UE6h2iBX', '\x20\x20\x20display', 'nerHTML\x20=\x20', 'KhIHDjEtCM', '8fA+cJmLN6', '5WHKhbJQhS', 'racterImg\x20', '44;\x0a\x20\x20\x20\x20\x20\x20', 'Gi3XjXsuZP', 'tem-name\x20{', 'q284VBVbFn', 'IFAcPcY6dI', 'dUU+kWPffe', 'Q0IkEFvr9E', 'AsInPQKR58', 'vgzKLx9EAG', 'getSprites', 'en1iRF3KXY', 'play:\x20flex', 'dvqcWdUovK', 'alse;\x0a\x20\x20\x20\x20', '===\x200)\x20{\x0a\x20', 'n\x20(frames)', 'ata.rows\x20+', 'JAnVThRTPY', '\x20\x20const\x20fi', 'Y88eqPT3aI', 'FhsJVCY7kb', 'qBFUEXUltY', 'FC7uOQegJS', 'M5UTDF2ebE', 'w0+tNW6J4v', 'Vr13z8A862', 'readFileSy', 'PAXUk+ocXA', ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20', 'XcWvRvlmqY', 'QSimJuDLSS', '6T+qPYtYX7', 'rWidth\x20=\x20a', 'rnqwp0IxpP', 'Y1iZ7J5tbv', '\x20\x20data[i]\x20', 'ICKtdVdKTi', 'xt);\x0a\x20\x20\x20\x20\x20', ').length;\x0a', 'iSm61u3JWM', '/P58Zg9BQS', 'ta\x20=\x20tempC', 'drawImage(', 'llTargetSp', 'ub7rxsy6pe', 'r+Uds0qmNx', 'EL9Ye8YvO4', 'SXfeyKzcLy', 'fxQNlEByoB', '7ZWuicO9e2', 'eYP3g+c02D', 'Image();\x0a\x20', 'ACSX3vjYfS', 'const\x20colu', 'ekR49+6ZjL', 'ijpEmyCtmY', '73Pv283fEu', 'X\x20=\x20parseI', 'uxT0CWKSkW', 'Gi4eB69yG9', 'dal)\x20{\x0a\x20\x20\x20', 'SozXwmDFsi', 'qsQYzSWIeY', '\x20\x20\x20\x20\x20\x20\x20\x20//', '=\x22field\x22>\x0a', 'mPywo1KBWR', '\x20-\x20q;\x0a\x20\x20\x20\x20', 'none\x27,\x0a\x20\x20\x20', 'body>\x0a<div', 'YrUbvrMBdH', 'eader\x20h2\x20{', 'rY\x20+\x20charD', 'zFetObEzAu', 'gress++;\x0a\x20', 'p)\x20*\x206\x20*\x20t', 'r2\x20=\x20hue2r', '==\x20min)\x20{\x0a', 'kepc3CUBcc', 'V+sW1bs89c', 'burGfvvVie', 'ace);\x0a\x20\x20\x20\x20', 'ght', 'stener(\x27mo', 'teAnimatio', '\x20\x20\x20</div>\x0a', '/js/', '_blank', '\x20?\x206\x20:\x200))', 'X\x20?\x20-1\x20:\x201', 'cucVudm28h', '\x20Settings<', 'GAZXZOLGsI', 'iCAiayJYd0', 'Width\x20+\x20bl', 'CBsJ3QRjhO', 'IKkKQ9yRFS', 'tBEAbRkABz', ',\x20frameWid', 'SAifbqr+Y/', 'YviYpgAGYE', 'l02FDqcTIa', 'c8V3PRk6kA', 'n6pDnJv/cM', 'r(--radius', 'd.style.di', '_priorityT', 're(animDat', 'iv\x20style=\x22', 'imationFra', 'ns\x20=\x20{};\x0a\x0a', 'transparen', '\x20(framesLe', 'ked\x20=\x20anim', 'sRwTCPRd+1', 'iZl2RONy/T', 'vIqC9VzgFR', 'Kv8EdIevla', 'Ocp4Ljw2ao', '++qWa34MqG', 'a40L+VQAaV', 'Name;\x0a\x20\x20\x20\x20', '3sZMUDelE1', 'charX\x20=\x20(p', '4xtAhW82Ry', 'e\x27);\x0a\x0a\x20\x20\x20\x20', '\x22autoSaveF', '-\x20Above\x20Ch', 'var(--text', 'bUWQZoqjXB', '==\x200\x20&&\x20an', 'YQfPGWnNcJ', 'x.getImage', 'Rotation\x20=', '3/lx+ACcz5', 'XGQ52IRY2K', 'tileHeight', '\x20\x20\x20\x20\x20curre', '\x20\x20\x20\x20\x20b\x20=\x20(', 'id;\x0a\x20\x20\x20\x20\x20\x20', 'V2761XjBw6', 'ntSpritesh', 'gc9+Lh5Ubv', 'NiZgv/l8Ct', 'awWidth\x20=\x20', 'rentSprite', 'GekaZRA1FV', 'st\x20zIndexS', 'tx.fillSty', 'r6wKmsuGNY', 'WWaclTskdi', 'nimation:\x20', 'Pk4S007sQU', 'y\x20=\x20docume', 'preview\x20ca', 'e8EVTlL5+i', '120px;\x0a\x20\x20\x20', 'eet</label', 'Zd8+Aq6wvh', '\x20.field\x20in', '\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20', 'harWidth)\x20', '2KIi1hDGZE', 'rotationVa', 'const\x20p\x20=\x20', '\x20document.', 'Zw0kV0+Rmo', 'MB04wPN4sq', 'Tl6Z18Ec9Z', 'nge=\x22updat', 'rOWgCnk3qh', '\x0afunction\x20', 'yyJq4RkHC6', 'empBitmap.', 'gaGrJSuyYn', '-\x20Far\x20Back', 'rPRfuWcVZV', '-align:\x20le', 'ary:\x27,\x20err', '<\x20b\x20?\x206\x20:\x20', 'DesignerCo', 'PqGO8537RD', 'ef33LVX4b0', 'urAmountIn', 'IfLVLcldJ9', 'itle>VFX\x20B', '1gCUhk0Tpr', 'LGcWHRQ0Vm', 've\x20{\x20outli', 'TZWC7aaNbH', 'PpiNiIBOPj', '\x20\x20\x20\x20<selec', 'xEPjUIwGsJ', 'XInput\x27);\x0a', 'uVlYlhF5bj', 'xy1Ox59kro', '69W9Pe0ZeO', 'iU6bvnmeqs', 'ding:', 'aM2K5apqUd', '-items:\x20ce', 'tionInput\x27', 'OffsetX\x20=\x20', '1FIWWYyn78', 'msRYXDDImh', 'ield\x22>\x0a\x20\x20<', 'tCwrKwtQIr', 'utf8', ':\x20var(--ra', 'mData.colu', 'C1CwBSEXau', '\x20\x20\x20\x20if\x20(!i', 'VDrarKlBJF', 'gIeTnRoqnL', 'i1Dt2r5419', 'onLibrary(', '\x20?\x20d\x20/\x20(2\x20', '55)</label', 'aHzr36/w6w', '\x20\x20characte', 'bottom', ':\x2020px;\x0a\x20\x20', 'cIXlbFiUeG', 'yId(\x27anima', '\x0a</head>\x0a<', 'alue)\x20||\x201', '\x20*\x202;\x0a\x20\x20\x20\x20', 'EgCWoL22JI', 'YskopS02Rs', '4kw2ECELRD', 'K4mTS7qk8p', 'uEMz7CnAtw', 'qNzkFT0QXo', ':\x20var(--te', 'zyTEr4Gxb4', '0b01F1mTXs', 'p:\x206px;\x20ri', 'th\x20=\x200;\x0a\x20\x20', 'ight\x20=\x20hei', '11111\x27;\x0a\x0a\x20', '\x20\x20\x20\x20style=', 'px;\x20color:', '+9P1WBACwW', 'KyjavesPTH', 'const\x20anim', '//////////', 'kfh1XsOkcZ', 'Progress\x20=', 'qSynMbth4t', 'gNavXw/1nZ', 'fPhTnc7C1Z', 'ZWNrBRFUqd', '/h3RWy0I6H', 'JHulAGp0Fa', 'tem-delete', 'utton\x20{\x0a\x20\x20', '\x20\x20\x20\x20\x20\x20\x20\x20st', 'RgGAkNI4Qb', 'leDisplay(', 'rSprite:\x20(', '\x20\x20\x20\x20\x20\x20\x20\x20<d', '+FtM37zTeR', 'urrentRand', 'F/ui2jP87E', 'IqO6RabD4X', 'finalWidth', 'ations\x20=\x20a', 'Ywmx3JgstQ', 'B\x20=\x20parseI', 'hm452m6JUw', '\x20\x20.bg-togg', 'Helper', 'ield\x22>\x0a\x20\x20\x20', 'ignPnosF9g', 'rUzHojiu4t', 'ZPOIoQmbQ1', 'Um6M92Sep2', 'zo3rekcV1L', 'iXw7dA/ecf', 'z/RdvJWiOJ', 'V4VBuHTBM7', '</div>\x0a\x0a<d', 't-size:\x2010', 'n:hover\x20{\x20', 'f\x20(t\x20<\x200)\x20', 'XWIjddY1b1', '8px;\x22>\x0a\x20\x20\x20', 'idth)\x20/\x202;', 'UYl8Y/WN59', 'oFr1PFkDdr', 'ger)\x20{\x0a\x20\x20\x20', 'z07bCBh1W+', '\x20\x20\x20\x20\x20\x20dele', '1H52E0wJHf', 'yPreview(c', '\x20\x20\x20\x20\x20--sha', 'stFrameTim', 'M/qMbXc14Y', 'pQUiuisvI5', 'ry-item:ho', 'Value);\x0a\x0a\x20', '\x20255)\x20/\x20d\x20', '3RpnIKd19M', '\x20\x20\x20\x20\x20let\x20f', '\x20\x20\x20\x20\x20break', 'ader();\x0a\x20\x20', 'checked\x20||', 'RFKDi3CJyK', 'zZEI/P2JCx', 'AnimationS', 'grid\x20{\x0a\x20\x20\x20', '<label>Off', 'vjyqWSNyac', '\x20\x20fileBox.', 'qt7vo/D+7c', 'LYfZ+9fd1K', 'WUKncJgw7z', '\x20\x20\x20border-', 'MsHkJsJtnN', 'nimData.ch', 'ight);\x0a\x20\x20\x20', 'fI9vQvXtjX', 'ocument.ge', '\x20\x20\x20\x20\x20\x20bord', 'Input\x22\x20onc', 'lWidth,\x20fi', 'et\x20charCen', '2jNAgwDqGg', '||\x20\x27none\x27;', '6gW5nO5VC0', 'aNZ49Rbzih', '0.03);\x20bor', '\x20\x20\x20\x20let\x20ch', 'padding-bo', 'ntal</span', 'ol\x20*\x20frame', 'h19Kcaw1gB', 'const\x20char', 'dXmet+19/c', 'fMHeHEd2K+', 'dnaXjDbFKG', 'QAtrZGApHa', 'rary.json', 'F9kte3xFnn', 'yYnBKhyCGM', 'zue0H1gShK', 'wY6/ewhm4b', 'kNmW3A2Z6Z', '\x20\x20\x20\x20data[i', '=\x20l;\x0a\x20\x20\x20\x20\x20', '\x20drawWidth', 'mC7qyG3Nxq', 'editorOffs', '2ELo2EhiA/', 'ext);\x20font', 'background', 'rvOPYWqdYO', 'acterImg,\x20', 't.getEleme', 'dCtx.drawI', 'K+g9ZoPiw2', 'tes-button', '\x27);\x0a}\x0a\x0afun', 'uaQ1jGgxIG', 'pener.load', 'bgkgIolcTH', '\x20letter-sp', ';\x20left:\x200;', '31G1U3pa36', '4hpXiNmt/9', ':\x20none;\x20}\x0a', '1fr\x201fr;\x20g', 'lnp3AP+8He', 'zy7LB7G4aq', 'W/vXkuPEhe', 'PwtRr4hLQ3', '\x20*\x20(finalO', '/DGdmGTz7o', 'ign-items:', 'oadAnimati', 'DHlSEtaSIt', 'tion>\x0a\x20\x20\x20\x20', 'iew()\x22>\x0a\x20\x20', 'ipY\x20?\x20rand', 'value)\x20||\x20', 'EAGr+GC4BS', '_character', 'oD/bZPiGLB', 'ata[i\x20+\x202]', 'ppercase;\x0a', 'xlj5wVAZeG', '\x20100)\x20*\x200.', '3mTUncuKTX', '0tt1VLpR4r', 'GL+X/XlrbL', '7uQD2MNwlr', 'VPBpbtxvB1', 'cAzLJgb6H0', '\x20\x20\x20\x20\x20\x20\x20\x20\x20p', '\x20\x20.column:', '1Y94PmP9HK', 'egTDAmdBeW', '\x20\x20\x20\x20\x20inten', '151666uKTLQA', 'WGJPPw+zIA', 'ilAWK+qzFg', '\x20rows\x20=\x20pa', 'oRF3H1B+Mg', 'entById(\x27r', 'gJXNbmaxoN', 'ationDurat', 'OqnTyY4kJA', 'M9maMcqOLv', 'MWvJSV2y/B', 'd8Inv5ycmn', 'z+KZe8caSx', 'border:\x20no', ')\x20||\x20255;\x0a', '|\x20\x27none\x27;\x0a', 'function\x20o', 'const\x20reve', '\x20\x20\x20\x20overfl', '\x20\x20\x20\x20\x20\x20\x20\x20au', 'n6TFNnM52t', 'BOjqCgZRFM', 'id=\x22bloomC', '5skTmD1sC0', '\x20\x20\x20\x20let\x20an', '+WMk6dUFSy', '\x20\x20\x20}\x0a\x20\x20\x20\x20\x20', '\x20\x20\x20\x20};\x0a\x0a\x20\x20', ';\x20updatePr', 'pY)\x20random', '+XE3wM/as8', 'GL6YCVz7NC', 'svQVinFxaq', '\x27Please\x20lo', 'iA2zO5h6Wt', 'dius-sm);\x0a', 'BPmeJHZXKC', '\x22\x20min=\x220\x22\x20', 'reak;\x0a\x20\x20\x20\x20', 'b23cuuUi+q', '\x200.5\x20?\x202\x20*', 'SCwlhZLBBa', '=\x20bloomCtx', '\x20*\x20frameHe', 'rface-3);\x0a', 'rAmount\x20*\x20', 'baHEFS0ECU', '\x20\x20\x20\x20let\x20ra', 'ameWidth,\x0a', 'label>\x0a\x20\x20\x20', 'l5pUJ3SyQd', 'EoggLQUCCV', 'ut\x27);\x0a\x20\x20\x20\x20', 'YHv6BTl4G1', '5aH9Y5G735', 'eWidth\x20=\x20i', '\x20<script>\x0a', 'ght);\x0a\x20\x20\x20\x20', 'nFromLibra', 'eu7GflBDK+', ':\x20var(--ac', '9N2PE97bH5', 'GnPHWd69z2', '7MOIdniHjZ', '0AWtOnD2+4', 'GCx94+2l12', 'gkCAJwE7NP', 'aQgp64HTJI', '\x20\x20\x20\x20\x20ctx.g', 'imation\x20==', 'QHCKtQ3hPz', 'Id(\x27offset', '-accent);\x20', 'ottom:\x201px', 'alse,\x0a\x20\x20\x20\x20', 'rXXFf9mOuh', 'le=\x22margin', 'reen\x27:\x20\x27sc', '5cKx2t0ZSR', '8Qo7RkHf10', 'ectiveScal', 'Y2iW7ckIJr', 'yomrwidMNj', 'ght:\x2044px;', 'vasOffsetY', 'ress\x20>=\x20an', 'mns;\x0a\x20\x20\x20\x20\x20', 'lobalAlpha', 'pMSuAt/J3p', 'eegJX97WQ0', 'Cj4WxOhpDK', 'rgCAUaY8Sw', 'onst\x20inten', 'gvEWjKo7fB', '\x20\x20\x20\x20if\x20(wi', 'om:\x201px\x20so', 'X15dkAlVpA', 'fug5cRKCtB', 'kI1jd/ETv1', 'ht:\x208px;\x22>', 'b+QRPi+VDw', 't\x20drawHeig', 'YYkPiwhAEM', 'ue3HLoVGAR', '55DFJT7R7R', 'd9Lm9nh8+x', 'v3Tl6AJuUw', 'error', 'lpADg7AKBJ', 'option\x20val', 'MxgYATy4Ir', 'y-header\x22>', '\x20\x20<h3>Visu', '\x20const\x20blu', '4S+ee4vNaC', '\x22close-lib', '91C684ywkq', '=\x20l\x20<\x200.5\x20', 'nlrG6N7Vin', 'ngOpeningA', 'YiiNlJ2box', 'hdecW/MmIf', 'YgMnw', 'SoSUjJXNgc', 'b3ADyl6k//', 'ip\x20||\x20fals', '+PS/DK9CYe', 'KUjF4ohjxU', '--accent);', 'ingAnimati', 'none\x27\x20&&\x20!', 'A+6OQIjYX7', '17vUl9+S7C', 'prite)\x20?\x20{', 'SEgWgieogx', 'r\x20&&\x20windo', '>VFX\x20Previ', '65ezeGYkxL', '78TDveN3Wt', 'ayx70SJsGt', 'fy-content', 'KW0AUHnaGn', 'fITjregkFE', 'a.spritesh', '3ge9X3Fduc', 'bvy1i0028W', 'IIEffjw9Iz', 'cZwZZ3EbHb', '\x20\x20\x20.remove', 'h:\x20900px;\x0a', 'bGZwl87y7e', 'p/kIb+Wj3g', 'library:', 'cale;\x0a\x20\x20\x20\x20', '\x20ctx.resto', '\x20let\x20h,\x20s,', 'mGeYbze/aI', 'stringify', '/658ODqmyT', 'PwuFwSDzaw', 'bg-toggle\x22', '1y3TPao7ps', '\x20:\x20rotatio', ':\x2016/9;\x0a\x20\x20', '\x20{\x0a\x20\x20\x20\x20\x20\x20\x20', 'wRgJRVV5dD', '\x27);\x0a\x20\x20\x20\x20\x20\x20', '343434kpguWe', '3hJzQi2Hmx', 'pROXfS6fvh', 'oej+SRpUiN', 'kGfSabmAsA', 'floor', 'I/N1Of+O68', 'G\x20=\x20parseI', 'yILllnS/0Y', 'GdQT1smwsv', 'leInWidth\x27', 'uAW45bgNuC', '+ZWTa0xk0A', 'const\x20fina', 'e=\x22none\x22\x20s', 've(\x27active', 'inalRotati', 'IrmwEkBwy4', 're\x20{\x0a\x20\x20\x20\x20\x20', '\x2039px\x200,\x203', 'nst\x20charDr', 'YPSPka8Lj3', 'M8jnSK31AN', '\x20255;\x0a\x20\x20\x20\x20', '6Gm4YvCP8x', 'alue)\x20||\x202', 'lBzBHrq+Ui', 'ight\x20=\x20con', 'RRBrCfrktV', 'mFlipHoriz', 'nding\x20Anim', 'Y\x20=\x20charCe', '0eIsv4F8HO', 'xcjqwI8v+e', 'KToLNW2unz', 'getOwnProp', '+JrL/9FgrD', '\x20\x20\x20\x20\x20\x20\x20\x20--', 'rnw6fgxnjv', 'a(imageDat', 'qczf9Hsf7s', '\x20width:\x2020', '\x20\x20\x20\x20\x20\x20\x20\x20\x20f', 'CSAvdSVCko', 'isplay:\x20gr', 'ding-botto', 'dKZ2woIpoy', 'gkSfHXp9fY', 'nimation</', 'onProgress', 'then', '9zMcXCSrA6', '5gKwCX/bJD', 'o2A1AsHuMK', '99hdghFZM6', 'rXxmor3gf7', 'rogress\x20+\x20', 'igAF2aIhnh', 'ryI3XIoP33', 'kJlOtGZy+O', 'ght:\x204px;\x22', 'document.g', 'whOja7iFl5', '\x20(animData', 'wCanvas.he', 'LaVui3bv9s', '\x27intensity', 'jNz86hAIDQ', 'lE7hyLmZ2+', 'u4sEYxCBGw', 'f1Nhz+ZX/9', 'eInput\x27).v', '\x20\x20\x20<label>', 'ion\x20value=', 'gOffsetY\x20=', 'entById(\x27o', '\x20=\x20documen', 'gQ0qsj/ZjI', '+3b5hrhfd/', 'y()\x20{\x0a\x20\x20\x20\x20', '\x20rows\x20*\x20co', 'UEviZPWH8f', '\x20#aaa;\x20mar', 'yId(\x27offse', 'ight\x0a\x20\x20\x20\x20\x20', 'fsetY\x20=\x20ga', '.opener.re', 'Eb6o3r5nnj', 'Ds42gQcbNn', 'TGTC4/qWOf', '\x20/\x20255;\x0a\x20\x20', 'dJ2JWzSSmN', 'pXGD8bbxy+', 'ztddXeZgrL', 'fsf7conP53', '\x20\x20\x20endingA', 'kMpZKHgGD6', '\x20\x20\x20\x20docume', '67i9Cy9b0k', '/\x202)\x20+\x20can', '</div>\x0a\x0a\x20\x20', 'itco8UQ0FI', 'pOCoZKCpRU', 'WVFbiUgrqA', 'ver\x20{\x20back', 'qnA51va0Nz', '83KgBtzexG', '\x20\x20\x20grid.in', 'TBJSMPKAr1', 't();\x0a\x20\x20\x20\x20\x20', 'ft\x20<=\x20anim', '\x20\x20\x20\x20\x20color', '5)</label>', 'hjrTII0F/C', 'Vd7IA0XqPw', '--shadow-s', 'rface-2);\x20', 'ue2rgb(p,\x20', '\x20\x20\x20\x20\x20\x20\x20\x20\x20z', 'cyMX79FuW7', 'rJM/Huwljc', 'filename', 'kKSGxMAI7G', 'sjHHOM14m3', 'uqBvwdFqDK', '\x20\x20\x20\x20\x20\x20\x20bor', 'etElementB', 'e64,iVBORw', 'library\x20no', 'arDrawHeig', 'oZg2/t+aWQ', 'JMN/WTrp9+', 'AcarvsTKDG', 'z5saXzh77E', 'previewCan', 'iuYGStTqrS', '\x20\x20\x20\x20\x20\x20\x20</d', 'thumb\x20{\x20ba', 'IHhVuhVqYD', 'Context(\x272', 'andomRotat', 'BZBBdIOEtU', 'NWTbN2pFoj', 'bel>Blur\x20A', 'Z/qstbx772', 'NZVJuTE8f0', 'e-3);\x0a\x20\x20\x20\x20', 'q70fYabgu2', 'PabMxTwIUj', 'ES9ucAHecC', '0WkZBtUOO2', 'ect\x20=\x20prev', 'OyPJw254cS', 'M/d8Z6Twnb', '/div>\x0a\x20\x20\x20\x20', 'Nln+BeRhV7', 'bDf7o+257e', 'mchXPOztWa', 'nst\x20ctx\x20=\x20', 'GZSC6rAvPq', 'id=\x22intens', 'EnsMQxOJd3', 't\x27).value)', '\x20id=\x22flipH', '8RU3+ERFrv', 'EC2MsiYUOl', 'vabI61HLdb', 'DoSp09ugY7', 'intensity\x20', '\x20padding:\x20', 'ndomRotati', 'OYo0i1SE5F', '()\x20<\x200.5;\x0a', 'CHeZdmO2f/', 'clAAAACXBI', 'ata.hue\x20||', 'library[an', 'VUVBmz6RWK', 'riUKBWhCXE', '\x20\x20\x20\x20\x20backg', '-black\x20{\x20b', 'LR83cnkDzg', '\x20if\x20(Objec', '\x20\x20\x20\x20\x20\x20\x20\x20\x20}', 'rameHeight', '76zPPpq+xv', 'return\x20p;\x0a', 'KWrNoGsYG4', 'se\x20?\x20anima', 'bel>\x0a\x20\x20<in', 'ocument.cr', 'SQJMCQS6NY', '\x20\x20document', 'Id(\x27autoSa', 'ht:\x20350px;', 'pY\x20=\x20false', 'z9zFn13728', 'ted);\x20font', 'bottom:\x200;', '25%,\x20trans', '\x20let\x20chara', '\x20\x20\x20\x20\x20\x20\x20fun', 'autoSaveTi', 'mationFram', 't\x20animatio', 'qJna8Uj39V', '-fill,\x20min', 'KN9cZjbA10', 'HMbWSXMqQG', 'Xm5KPOjEvv', '\x27reverseCh', 'dma2XMrOkf', 'd9V6zC29CW', 'th\x20/\x202,\x20-f', 'mmS6vjdl0z', 'ion\x20/\x20(100', '7qR0U1f66J', 'gyPgGDg2zh', 'MtWbJkCcA7', 'ale);\x0a\x20\x20\x20\x20', '3VtsIkBzEN', 'qkSQRMph4o', 'ion:\x20under', '4E5i/LXGvx', 'yId(\x27endin', 'ue)\x20||\x2015;', '1DK8nusBFb', 'or;\x0a\x20\x20\x20\x20\x20\x20', 'Tbg2ngt8Ny', 'Qrc/SnXec8', '9HnXuG5n8q', '\x20\x20\x20\x20\x20\x20\x20\x20la', 'ing\x20=\x20true', 'YseG4gOJmc', 'ata.blendM', 'cursor:\x20po', '8J2n8iaP5L', 'c82S6ql9Ye', 'Bc60+gcXb7', 'bloomCtx.p', 'lumns;\x0a\x20\x20\x20', '\x22\x20onchange', 'path', 'umK289Lp7/', 'ight,\x0a\x20\x20\x20\x20', '5:\x0a\x20\x20\x20\x20\x20\x20\x20', 'tyle=\x22disp', 'ty\x20||\x20255;', 'Fx+cEh0y7i', 'tx.scale(f', 'Joq7gl1aF9', '\x20\x20\x20\x20<optio', 'wCanvas.ad', ':\x204px;\x0a\x20\x20\x20', 'P9xsmr70ym', 'e\x22\x20selecte', 'in-top:\x2015', '6UGTsl4z/Q', 'i3Kpa4hNnw', 'tRandomRot', '9OlB02anD8', 'NuxTEobglL', 'XxrZHQ93p0', 'nterY\x20+\x20pr', '1/3);\x0a\x20\x20\x20\x20', 'rogress\x20=\x20', 'cVN2a9wUT6', '5;\x0a\x20\x20\x20\x20\x20\x20\x20', 'jt4diNpfs+', 'YtJOpevEjN', 'Zhh1zKHVp1', 'sdcPCiXZg3', 'AYgol7BSEo', '8PpN2Qq6gh', 'olutionLib', ').value\x20=\x20', '4px;\x0a\x20\x20\x20\x20\x20', 'gvfMQIsVg6', 'warn', '2\x20*\x20255;\x0a\x20', 'ARlIaGf/Nk', '22176704FiMbTy', '8T/TbD2yJJ', 'l8r6P6GN2D', 'imData.off', 'vbqkrbZpuy', 'ById(\x27fpsI', 'YQ6npQAT8a', 'QMa24vwUSW', 'zcnveGG8et', 'put[type=\x22', 'ne\x20!import', '\x20\x20margin-b', 'center;\x0a\x20\x20', 'fztGVZny8f', 'face-3);\x0a\x20', 'AlXcXqwl8b', '4Svc0x4bP+', 'z3OnwqZ6RV', '\x22>3\x20-\x20Behi', '\x20\x20\x20\x20\x20\x20\x20\x20\x20s', 'bfY2Y7PlZl', 'ontal)\x20{\x0a\x20', 'q9wQUf71Ti', 'qrFyxQrM1H', '\x27).value)\x20', 'yh78FxyzQD', 'rnhgvAxeD4', 'qvLgOoYl83', 'aGCcYowwCU', 'YCPES6UqGL', 'animX\x20=\x20ch', '>✕\x20Close</', 'eviewOffse', '\x20backgroun', 'N+5RCjk66+', 'kbox\x22\x20onch', 'isPlayingO', 'omCounter\x20', 'entSprites', 'kl45r/97Ae', '\x20\x20\x20\x20\x20\x20\x20\x20}\x0a', 'AbZwLoY84d', 'box\x27).chec', 'ght:\x206px;\x0a', 'open', 'fkHdcaI1PL', 'wBa9I553DO', '\x20\x20\x20\x20\x20.cont', 'zLxn9Qvv3j', '0mTGhJNrpn', 'bHHt6rPHI6', '4QcvS9BGQK', 'l76/PwlmHi', 'q1JyiWHlC1', 'value=\x225\x22>', '\x27rowInput\x27', 'lEUscmMsGe', 'eader.read', 'gUXL7uvpmu', '\x20\x20\x20\x20\x20\x20\x20\x20h\x20', 't!\x27);\x0a\x20\x20\x20\x20', 'IZiX9spXTz', 'jpym2OGBBW', 'y\x20*\x20easedP', 'o2sais7dpj', 'zloQHU5R8I', '\x20:\x201\x20-\x20Mat', '2fH3hpb3t7', '8\x20-\x20Top\x20La', '0vDpyLvgqW', 'color:\x20var', 'qmtMkZw/Jl', 'gin-top:\x202', 'fD2OXB5lix', 'ment.creat', 'OD0Vpw9DRR', 'repeat:\x20re', '&\x20e.target', 'A3AmALBNX7', 'atePreview', 'pUPEsHdCEx', 'prI7LGHFF4', 'et\x20animati', '9NKrmDSid2', 'yId(\x27opaci', 'te\x20&&\x20!cur', '15s;\x0a\x20\x20\x20\x20\x20', 'M4MQeTRlhV', 'G0oYSjE27D', 'jBW5J+ETUJ', 'nfo-text\x22>', 'TYpthXcT5x', '\x20\x20\x20\x20\x20\x20isDr', 'eX\x20=\x20eased', 'e\x20!importa', '=\x20animData', ')\x20autoSave', 'ame\x20%\x20colu', 'd\x22>\x0a\x20\x20<lab', '-faint);\x20f', 'P1QM+7eBln', 'LS1ko9dFSk', '7rvb686fCx', '\x20\x20\x20text-tr', 'PO77s6oIRc', 'scaleInput', 'qc3DR927xn', '\x20||\x201;\x0a\x20\x20\x20', 'ghr8VlXmq9', 'se,\x0a\x20\x20\x20\x20\x20\x20', 'put\x20type=\x22', '8+w/TeKRcF', '\x20\x20\x20\x20drawWi', '/\x202\x20-\x20(blu', 'urXh4e8ANT', 'VnCNBxth1s', 'GtiPxIHHV1', 'XBTAEntqrv', 'WJf889//30', '2)\x20/\x206;\x0a\x20\x20', '++21Y6tIE3', 'hIqz6FaywU', '\x20\x20\x20\x20ctx.gl', 'gle-btn:ho', 'XInput\x20=\x20d', 'HJaZJQEvLo', 'erLayer(sc', 'calCheckbo', 'BwLARA1J1g', 'tky+9yaW96', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20<', 'ent\x2030%);\x0a', 'VeHx0g6CDS', 'ycnawcb+q0', '0,0.2)\x20!im', 'YrciSnVoNg', 'v>\x0a\x0a\x20\x20\x20\x20\x20\x20', 'mgvBYDfq3I', 'ry-item-de', 'cbVbabxjrC', 'PHtYfyW0F9', 'frameWidth', '\x20\x20\x20\x20\x20\x20\x20con', 'andomFlipV', 'UCE7Bf+wDH', '.src\x20=\x20tem', '9UyvyqpVSd', 'GR+iQO5/Y5', '\x20\x20\x20\x20\x20z-ind', '\x20\x20\x20\x20\x20selec', 'idth\x20=\x20fra', 'field\x22>\x0a\x20\x20', '8lkiBgUhIZ', '\x20\x20\x20body::-', 'tyle=\x22marg', '\x20min);\x0a\x20\x20\x20', 'ElementByI', '\x20\x20\x20\x20\x20\x20\x20<sp', 'awWidth;\x0a\x20', 'oRDA4HAPzc', '+ZkzmnvFZQ', 'GHT\x20COLUMN', '5uf3jzGlY8', 'SDL2QAiSSh', '4JGA2/3QHe', '\x20e.clientX', 'cent);\x20tex', 'SlKE+zT3z5', '\x20\x20\x20\x20\x20\x20\x20\x20is', 'SLJCHOpyKF', 'szgApfy8N9', '/UmWTryLSU', '.value\x20=\x20a', '0B5k4hj3aG', 'k49cap8rFN', 'bm/DMEXfBu', '\x20*\x20255;\x0a\x20\x20', 'BdD6YVlbaA', 'l4UymCD3Yv', 'X9wfu7D3AO', '\x20\x20</div>\x0a\x20', 'erSpriteHe', 'tion\x20||\x2030', '\x20255\x20-\x20b\x20/', '+gO1S9m9EV', '+GhQ7amp2d', '\x20animData.', 'Rotation:\x20', 'ct(0,\x200,\x20c', 'sheet\x20=\x20im', '18PfxLuHAf', '\x20min;\x0a\x20\x20\x20\x20', '1xTjLFNvfA', 'CASfTfxPnf', 'i2LVS6L2kH', '\x20margin:\x200', '\x20\x20\x20\x20charac', 'xH5BJGIFSv', 'jzvM5LEl/m', '4TXSYDR4T4', 'height', '\x20\x20font-siz', 'eld\x22>\x0a\x20\x20<d', 'hendrix.it', '\x20/\x202,\x20fina', '\x20\x20\x20input[t', 'ar(--accen', 'on)\x20{\x0a\x20\x20\x20\x20', 'ht8njBBgAi', 'ht:\x20600;\x20l', '&\x20tempBitm', 'O8QiqgZQ5f', '\x20\x20\x20\x20let\x20g\x20', ':hover\x20{\x20b', '.header\x20a:', 'csPQDgwws2', 'shXUPotuqR', '6b+OtWfIiO', 'LvzDKeJZ7V', 'nNameInput', 'lete\x20{\x20opa', 'dc5kdm9Xub', '\x20\x20\x20if\x20(isP', '6ggoPuYCsF', 'r(anim\x20=>\x20', 'heet)\x20{\x0a\x20\x20', '\x20\x20\x20\x20\x20\x20\x20\x20to', '3I7AdxE3Ct', 'center;\x20pa', 'animY\x20=\x20sc', 'ackground:', 'tionNameIn', 'scale);\x0a\x20\x20', ':\x20opacity\x20', 'Wd17IFvfb7', 'mZCWJb3mY9', 'XmdJpZOCzR', 'ent.getEle', 'd/2m6bes8+', '0.5\x20?\x20d\x20/\x20', '\x20\x20\x20\x20\x20if\x20(a', 'ser-select', 'ty;\x0a\x20\x20\x20\x20\x20\x20', '5MXVm9RqAF', '3mLaFhjUrW', '||\x200,\x0a\x20\x20\x20\x20', 'c\x20function', 'eAztOe0KuO', 'taUrl;\x0a\x20\x20\x20', 'margin:\x200;', 'St4AGQDhpI', 'tionDispla', '\x20SETTINGS\x20', 'der\x20h1\x20{\x20f', 'tYInput\x22\x20v', '\x20&&\x20window', 'n>\x0a\x20\x20\x20\x20\x20\x20<', '|\x20!current', 'blendModeI', '\x20\x20\x20\x20\x20\x20\x20\x20if', '<!--\x20BLOOM', 'o\x27,\x0a\x20\x20\x20\x20\x20\x20', 'break;\x0a\x20\x20\x20', 'CLToi2aZYs', '\x20\x20\x20\x20\x20const', 'cUgCIWeUDE', 'ment.getEl', 'as>\x0a\x20\x20\x20\x20\x20\x20', 'XQrYMzICxp', 'RfcQCSMvIA', '\x20\x20\x20\x20\x20data[', '\x20false;\x0a\x20\x20', 'eInput\x27)?.', 'ortant;\x0a\x20\x20', 'wClfjMvPOn', '=\x22display:', '4Oxl8dg5jN', 'tPafXTNmFz', 'lue=\x22scale', 'yrjV/dKMRy', '.width\x20-\x20c', 'ex;\x20align-', 'eWidth,\x0a\x20\x20', 'Gn2z5r03b/', 'RW6EHBobG3', 'nction()\x20{', '\x20\x20\x20\x20font-w', '\x20\x20\x20if\x20(ran', '0))\x20/\x206;\x0a\x20', 'zSiHXShYds', '54g0jYbSQq', '=\x22fileInpu', 'iD8B7y5fjb', 'fynEqlGlBd', 'XbmpndNPvF', ')\x20return\x20q', 'ff;\x20}\x0a\x0a\x20\x20\x20', 'onInput\x27)?', '2,\x20blurAmo', 'Height\x20/\x202', 'intColor:\x20', 'Only</opti', 'animData.s', '4YAUIQAWFD', 'wgpgcgBkQz', 'CkdT3FNKUx', 'zSvfcNePvH', 'Width;\x0a\x20\x20\x20', '7Gben6XK9E', 'fde0g+ehSh', '3NA4lQXIR7', 'yer</optio', 'rvastgYn3o', '1LNrIcyUeJ', 'erSprite.d', 'IvJXJx+AqG', 'vM08UjKAHk', '573rI5Sc3F', 't\x20spritesh', 'lass=\x22fiel', '.className', 'd(\x27randomF', 'utton:hove', '/rbOD9d0UK', 'h0yW8yhj9h', '\x20100%;\x0a\x20\x20\x20', 'MjC9pozhew', 'ap\x20&&\x20temp', '\x20&&\x20librar', '\x20\x20--bg:\x20#1', ':\x20hidden;\x0a', '\x20\x20\x20\x20\x20\x20colo', 'TargetSpri', 'gglUKNPJG/', 't\x20previewO', 'eG20Z9gS2l', '/Sp2QT9h+7', 'Wy2SiUsENf', 'KIxVr6bOct', 'ile:\x20fileN', '\x20name:\x20ani', 'UXXeI0us+t', 'oi9UCpG4Mv', 'empty\x20{\x20te', 'Flip\x20Verti', 'n:\x20relativ', 'KEJh7ckiRj', 'mn/2B86SUe', 'S6/Enc2zLf', 'mes;\x0a\x20\x20\x20\x20\x20', 'FlipX)\x20ran', 'FBn4SRJOLF', '00);\x0a\x20\x20\x20\x20\x20', '\x20const\x20scr', '5wNkWfbNby', '4xgQ3A50DJ', '.opener.Im', 'zGS5P1vz7w', 'useDown);\x0a', 'XDVLNUN6g2', '\x20\x20\x20\x20}\x20else', 'tx.imageSm', 'e)\x20return;', 'usko+eiPgX', 'js/Animati', '\x20\x20\x20\x20\x20\x20\x20\x20le', 'r\x20*\x204);\x0a\x20\x20', '\x20-->\x0a\x20\x20<di', 'zRIBLfGbYW', 'f6V/BWoDRx', 'ld(itemNam', 'REWZFLqLgc', 'ottom:\x200;\x20', 'target', 'updatePrev', 'F2HnPf7CU7', 'Io4MXF4NVX', 'r;\x0a\x20\x20\x20\x20\x20\x20\x20', 'lue\x20||\x200;\x0a', 'gDhYfMSEr0', 'Z5mHe4eUOG', 'LOnOpYLEeM', 'Dz+2/POd+6', 'LDLBDCsKY/', 'hidden;\x0a\x20\x20', '.deleteAni', 'bJz++PumY7', 'onDisplay(', 'YQIItnm5Hn', 'G3xjc9viYb', '-align:\x20ce', 'e()\x20{\x0a\x20\x20\x20\x20', 'lNbrTJDFkT', 'Yl5JwoiaUL', 'isplay:\x20fl', '/2BGk1OaS5', '\x205\x20:\x20parse', 'Id(\x27fileIn', 'Oiwree3dp3', 'rn;\x0a\x0a\x20\x20\x20\x20\x20', 'er:\x20none;\x20', 'MGkdKGA9rI', '=\x22text\x22\x20id', 'fhRf4FnHeH', 'unction\x20lo', '\x20\x20\x20\x20\x20previ', 'eateElemen', 'toSaveVisi', 'Zx80H6IV1+', 'qP+56GngLP', 'ypSPDRGnZP', 'tREam+bumQ', 'D6FhD3ZGC2', 'ue;\x0a\x20\x20\x20\x20\x20\x20', 'LtwUKhBqBI', 'le-btn\x20{\x0a\x20', 'RealHeight', 'IwMOy2nX+c', '}\x20else\x20if\x20', 'er.FileSys', 'tElementBy', 'ZhYyu1AAtQ', 'az79p2f772', 'fect</span', 'wwsX5DaVt2', '\x20}\x0a\x20\x20\x20\x20\x20\x20\x20', 'WXMAAAsTAA', 'jAwMgGRKNo', 'UONHzR5wdT', '00;\x0a\x20\x20\x20\x20\x20\x20', 'H9w9VH1I+U', 'XkFXOMcT0L', 'bg9OCvxm9C', 'ABmZ6FwAjC', 'ation\x20=\x20pa', 'ken4zeFwX+', '=\x20Object.v', 't\x27)?.value', '\x20\x20\x20\x20\x20if\x20(f', 'max=\x22255\x22\x20', 'inalScale;', 'wOc+HzjAAT', 'onst\x20final', 'mpZCpUJp4f', 'KSz9Gm8D32', 'B5Yg1iP57t', '3XOZ7XjOi6', 'lVVQCkc+LZ', 'Q8gY8jvyFs', 'kHCVlkPD5s', '+tI6vU8mfW', '\x20\x20\x20\x20\x20\x20\x20\x20\x20c', '+uPxPgpfy8', 'S+jXs7Opn3', '+VPOFCv5ep', 'cument.get', 'l4iiSgWRqC', 'ows;\x0a\x20\x20\x20\x20\x20', '|\x20height;\x0a', 't(\x27canvas\x27', 'sity\x20(0-25', 'K9UwYb5/7u', 'fGNtY9xt2n', '-spacing:\x20', '5BGH7JDWjK', '2\x20=\x20hue2rg', '+jV4/1dx/m', 'e\x20&&\x20animD', 'kYaQFg05yr', 'eYQ8SVGlmF', 'K5yj6x7+b+', '\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20', '7OiNu+fVtP', 'gQd6GCAYBJ', '\x20\x20\x20h\x20=\x20((r', 'd\x20/\x20(max\x20+', 'MNvvKEq57Y', 'dProgress;', 'TIu/YgUAJ8', '\x20\x20\x20\x20\x20\x20\x20<di', '\x20\x27library-', 'AUd1rsMIri', 'FE8TGNZJYV', 'K0tqGKIpwx', 'onload', 'tTime;\x0a\x20\x20\x20', '4Fjg/4W2nC', 'ument.getE', 'lAystZOQGL', '\x20-finalWid', 'x9Eaiei4k/', 'gress\x20=\x20pr', 'lM49ihm70n', ':\x20none;\x20ma', 'class=\x22sec', '\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20', 'tion\x20Speed', 'e154ZYOH04', 'em-delete:', '\x20\x20display:', 'OdWxZu2MTe', '\x20\x20\x20if\x20(off', 'Mrg+xL/vc1', 'e05050;\x0a\x20\x20', 'h0KqPWnWkV', 'R63k8A3ETw', 'label\x20styl', 'GPl3uV0sXl', 's,\x0a\x20\x20\x20\x20\x20\x20\x20', 'st\x20imageDa', 'splay\x20=\x20\x27n', 'du1eD+rEUD', 'ono);\x0a\x20\x20\x20\x20', 'HBHCqDKsox', 'elected>No', 'so80AM4MhQ', '\x20||\x2048;\x0a\x20\x20', 'y8DI/QGsI8', 'oBdWutxBSl', 'important;', 'bDGBhWR8Fb', '0HMD/FSKQy', 'RXzavoOaNP', '1ecWZ0Nb/B', 'sHSeZkpbXP', 'animData.b', 'lay:\x20flex;', 'iXeIx4iThC', 'w37SytKYVe', 'q/2btTjiSP', 'e\x20||\x20\x27Norm', 'rrentCol\x20=', 'i38glb6bu+', 'uzeELqqy8O', '\x20\x20\x20};\x0a\x20\x20\x20\x20', 'function\x20a', 'age:\x20linea', 'rX\x20=\x20charX', '2maPzXtKVU', 'qL3Q8pZqe6', 'lasqZNzezp', 'new\x20FileRe', 'vHbL8Z8SjY', 'GH+ZPxclFG', '\x20g2\x20=\x20hue2', 'PDusfslKFe', 'n9CgBOvLID', '5PsefZ/8/b', '\x20\x20max-widt', 'iYSbniIXRa', '\x22\x20id=\x22fpsI', 'nxWCSIZ29f', 'XGqp/y7fJL', 'size:\x2011px', 'rval(anima', '\x20--surface', 'Width\x20/\x202,', 'fZinEUGDm3', '\x20\x20\x20\x20\x20drawC', 'hc86a5Dl0Q', 'iv\x20class=\x22', 'CNjKEjhpny', 'ame(previe', '\x20\x20\x20let\x20r\x20=', 'vePath);}\x0a', 'LuFYYrClaM', 'mation\x20===', '\x20\x20\x20\x20let\x20sc', '\x20\x20b\x20=\x20b2\x20*', 'SGqpNZTEw2', '3fbghZ+dlq', 'hgVRqjSaep', 'vhuiivX/mD', '\x27lighter\x27,', 'mData.rand', 'uSYYcUvBcp', 'olid\x20#333;', 'section-ti', 'dth\x20=\x20real', 'or:\x20pointe', '0zEBuDHGsb', 'Xhhwo/L/4X', 'ation\x20!==\x20', 'i\x20+\x201]\x20=\x20g', 'nput\x27)?.va', 'dexInput\x27)', 'WYzDkLfnDB', 'ndomValues', 'fPlU3J8XVm', ';\x20i\x20<\x20data', '440jpihfv', '\x20\x20\x20style=\x22', 'gap:\x2010px;', 'In5fSDczBs', '\x20\x20position', '+U1fNoVdMl', 'ztMu0a7G7b', 'pODk00GYpK', '1nHZT1nPm/', 'qODmHERz6d', 'ation:\x20doc', 'ntById(\x27bl', 'nsparent;\x20', '\x20\x20\x20\x20\x20\x20\x20pre', 'eight\x20-\x20ch', 'M2376n47+h', 'xdvKV', '!isAnimati', 'reviewCanv', 'iew-canvas', 'mData.flip', 'isplay\x27);\x0a', '9k3IFexe0e', 'oFOKlA3V6n', 'yx/g/D+SPo', 'box\x22\x20id=\x22a', 'Y9LsnI7pJh', 'fWagv', 'Color\x20=\x20\x27#', 'await\x20wind', 'KBbwBa4tEJ', '\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20', 'OB0ikdoDe/', '\x20\x20\x20\x20\x20\x20<lab', 'qziOC+6jMu', 'wYfOK/eO+J', 'kbox\x27).che', 'eScaleX\x20=\x20', 'RGEiG', '5G+AMshFVs', 'zKiL3FSjLy', 'file);\x0a\x20\x20\x20', 'AyZFPoq1Gw', 'anvas.getC', '\x20var(--rad', 'eld\x20label\x20', '\x20\x20\x20\x20\x20\x20\x20\x20\x20b', '?\x20l\x20*\x20(1\x20+', '\x20\x20\x20\x20ctx.sa', '+A3chImHJz', '\x20\x20if\x20(anim', 'w3ly0ApxZ3', 'alse);\x0a\x20\x20\x20', 'opacity:\x200', 'EiECgCwBNB', '4EiNK5xXpo', '}\x0a\x20\x20\x20\x20\x20\x20\x20\x20', '\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a', 'itemName\x20=', 'j+BRLAGk0T', 'Wks0LuSeqq', 'k+XiKDWrKr', 'if\x20(applyB', 'aGGk0nILUD', '\x20\x20\x20\x20\x20\x20<spa', 'Lvzu2RRVUE', 'abel>Z-Ind', 'pYGWoo2occ', 'ltFteNHcaD', '26QqJCGDmK', '+ZZhWvzos4', 'PPwUzizDum', '\x20\x20\x20\x20\x20\x20cons', 'max\x20+\x20min)', '\x20\x20\x20\x20backgr', 'oSaveField', 'F+FhCwUFIp', 'urrentCol\x20', 'zontal)\x20{\x0a', 'XfYQv+Gmzf', 'r46r/ZfiUj', 'ontainerHe', '7h1lXi/wQT', 'SJIyDFn26g', 'nvas\x20{\x20ima', 'a2Yv9+pbUp', 'q+2C7Zd2eO', 'LqSBgPAYI+', '/\x20(2\x20-\x20max', 'd(\x27zIndexI', 'LyMDP+wxaF', 'f\x20(window.', 'fJYdMijjdy', '1r0PVnTz4q', '\x22>2\x20-\x20Back', 'und:\x20rgba(', 'EZNykWltbg', 'zj+bnrRt2w', '81+sjlvdVa', '\x20\x20\x20\x20\x20\x20\x20\x20<l', '\x20=\x20frameWi', '/3deYFrnWI', 'IIzVU7cdye', '\x27\x20+\x20animDa', '_scene', 'it-font-sm', 'setXInput)', 'ction\x20draw', 'qc4N3dvM/c', 'ntById(\x27an', 'IojVSFElAU', 'W3lPX3TekE', '\x20\x20animateP', 'PI\x20/\x20180);', '\x20\x20\x20\x20\x20\x20\x20\x20\x20<', '(q\x20-\x20p)\x20*\x20', 'otation\x20?\x20', 'nvasMouseD', 'X6S1ctHVrm', 'yId(\x27scale', '1qkTtJ+X/B', ')\x20{\x0a\x20\x20\x20\x20\x20\x20', 'library-it', 'd8PHb7yMCV', 'r4REFUFSEK', 'b918u/CYW3', 'LM5iH896P1', 'ex</label>', 'ationProgr', 'esheet.hei', 'LRKAMQbM8g', 'g2LvAzKIqO', 'yoqLpk527n', 'Error\x20remo', 'th:\x20100%;\x0a', '18EOxBnkeo', 'EcXxEli0ZI', '1r//K895MI', '+hOnoG6PII', 'XCs8tQehZu', 'nt.getElem', 'qNLJm9T4IJ', 'radius:\x20va', 'fs3roycJkK', 'CKItMS0U1k', '55)\x20/\x20d\x20+\x20', 'parseInt(d', '\x20\x20\x20font-fa', '?\x20-1\x20:\x201,\x20', 'ut\x27).value', 'Data.chara', 'OFKlpLg4j2', '1GaR7iJzBk', 'LUiWuBCxxE', 'ndomFlipVe', 'YtWSSY9vmr', 'if\x20(window', 'inalFlipX\x20', 'WSjUZMDT8n', 'ppjHRHWK+n', '\x20data[i];\x0a', 'str(0,\x202),', '60\x22\x20onchan', 'nimation\x20|', '\x20\x20\x20\x20\x20\x20\x20\x20\x20t', 'PyX6vjPizU', 'ove\x20Everyt', 'peningAnim', '{\x0a\x20\x20\x20\x20\x20\x20\x20\x20', 'HUhCyX0P+M', '()\x20{\x0a\x20\x20\x20\x20\x20', 'h1pH7/qutu', '/8eej+ri7j', 'Input\x27);\x0a\x20', 'eckbox\x22\x20id', 'ary-modal\x22', 'NiWWosaCxQ', 'ne:\x202px\x20so', 'tionProgre', 'yQmE5QwYmn', 'hdPwcN+WdX', '\x202fr\x201fr;\x0a', '=\x20(max\x20+\x20m', '9N074/Hxn3', 'RKsG5GLK9T', 'Height\x20=\x20c', 'ouseMove(e', 'odal\x27);\x0a\x20\x20', '\x20\x20\x20\x20if\x20(t\x20', '_spriteset', '>Save\x20targ', 'ZnV4aSXbl2', '8TNKHBAaRk', '+piFj6LrK6', 'dXb9I3/x0O', 'PcvGr821Gz', 'CYsjj4sDgV', 'put\x27).valu', 'a;\x0a\x20\x20\x20\x20\x20\x20\x20', 'th,\x20previe', 'Oqs0nXq1aN', '\x203px\x20rgba(', '*\x20{\x20box-si', 'MPcukRLwlN', 'randomCoun', 'rGbOvmJYsC', 'x;\x20text-al', 'Hue:\x20<span', 'qI5iRslkDD', 'Index:\x20doc', 'rl;\x0a\x20\x20\x20\x20\x20\x20', 'wUamqgpoZI', 'VNEMlkUnh/', '+fvnk4Fu9+', 'imData.cha', 'eview()\x22>\x0a', '\x20if\x20(apply', 'from', 'E93Bg+/Bjs', 'YXjocPEIy7', '</p>\x0a\x20\x20\x20\x20\x20', '2tF+BMCb47', 'n\x27)\x20{\x0a\x20\x20\x20\x20', 'CgzuukE2Ia', 'a.bloomEff', 'ZzDCJQU7NX', '\x20r2\x20*\x20255;', 'select:\x20no', 'JkxjWeIag/', '\x20\x20\x20\x20\x20\x20\x20\x20br', 'jfBwYePY7u', 'range\x22\x20id=', 'xO0KIe2pCT', 'ta.charact', '=\x22saveTarg', '\x20const\x20ani', 'animData.e', 'gb(p,\x20q,\x20h', 'abel>Inten', 'nmvXBywiZs', '6JpH4hv5Bt', 'ZpICGhNYXr', '\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20', 'bRNk6f4wUs', 'imationLib', 'FHgkOOkoPF', 'vaysHT26dm', 'YcLjY7E+II', 'Dgc3oxHy+o', 'alAlpha\x20=\x20', 'EmheTixgrV', '\x20\x20\x20\x20\x20\x20\x20\x20\x20-', '91GhEE/O4F', 'PUCRoz0lhK', '9gFsWHo4HZ', 'MicJXrw9f9', 'alue)\x20||\x200', '|\x20false,\x0a\x20', 'ary(name,\x20', 'animData.r', 'KOIsqKIfeq', 'VAJ2DUEKHC', 'FZO67nJ3lO', 'Int(zIndex', '6JIuJs0OPc', 'ion\x20=\x20docu', 'parse', 'E6xcRsYAvb', 'PI))\x20%\x201;\x0a', 'ItaaCCCJIq', 'ter;\x20curso', 'Aj4vDCQcCx', 'focus,\x0a\x20\x20\x20', 'iY+YBKFXAP', 'exValue\x20==', '+xaS9tAxit', 'RSMCyToUAA', '/hEdHIO6uD', 'g11A/bvriT', 'lipHorizon', 'd+m8SKzbng', 'siteOperat', 'ntColor.re', '0oapBqMTLs', '9WfAtjKI8W', 'E4jJ0D/A5s', '\x20===\x20\x27scal', 'uQ6fStPUnB', 'MseP+2OftW', '\x20\x20\x20\x20\x20\x20\x20\x20\x20d', '\x20=\x20animDat', 't\x20id=\x22endi', 'zqKHrXvWbg', '+KSPjmzZ63', 'qg8foe+pB4', '\x20=\x20l\x20>\x200.5', 'one\x27\x20||\x20!a', '\x200\x200\x2010px\x20', ')\x20||\x200;\x0a\x20\x20', 'hover\x20{\x20te', 'r:\x201.5px\x20s', 'cSNgCPQ46c', 'Vn3bZoG/ie', 'AFc+a/tCBi', '\x20previewBg', 'a\x20href=\x22ht', 'hXaAXD9kmv', 'se\x20?\x20(tota', 'characterS', 'toDataURL', '6;\x0a\x20\x20\x20\x20\x20\x20\x20', '>\x0a\x20\x20\x20\x20<div', 'C/9j1AdNmf', 'eAllTarget', '\x20center;\x20c', 'NDglK4A1rm', 'Da//+wvnRr', '\x20const\x20new', '\x20\x20\x20\x20\x20\x20font', 'JCt04mdv20', 'XiN1VVlvgI', 'ZhPcMj+Ubn', 'FZX5ve/7f8', 'ET8VUeVmfG', '\x20#FFD700;\x22', '.file-box.', 'umbLcgD8vN', 'S46WLH2PBG', 'mns\x20+\x20\x27\x20|\x20', 'h2>Animati', 'ow:\x20var(--', 'adius:\x2014p', 'c/0Z+9detM', '-size:\x2011p', '5BMabQAyfv', 'olor:\x20var(', 'entById(\x27a', 'HaH/8wPWWX', '(document.', 'lflt108mXz', '\x20\x20\x20\x20\x20\x20\x20wid', 'd=\x22opacity', 'over\x27,\x0a\x20\x20\x20', 'ght\x20=\x20fram', 'nst\x20q\x20=\x20l\x20', 'bled\x20=\x20fal', 'n\x20value=\x22s', '8k97K3xCpv', 'eckbox\x27)?.', 'DK/z/pOvzg', '2qWNUChAom', 'uto;\x20margi', 'J8vMcEkM5I', 't6re3tNrPZ', 'me)\x20return', 'lue=\x2230\x22\x20m', 'WpIXOs8aFK', 'round:\x20#11', 'patternHei', 'h,\x20preview', 'n\x20value=\x222', 'FAYBFMCc6E', 've();\x0a\x20\x20\x20\x20', 'eu+YU38+M/', 'nLoopCount', '\x20</label>\x0a', 'gmKoffe+Dm', 't\x2025%),\x20li', 'GpHJTFQaAB', 'z1tXK4BKll', '\x22500\x22\x20onch', 'lTTAaYGNf1', 'ant;\x20font-', 'eviewBgCol', 'elp-btn\x22>A', 'ing:\x200.5px', 'Z/cHsgA2Av', 'eHeight\x0a\x20\x20', '\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20', 'Library(an', '\x200,\x200);\x0a\x20\x20', '\x20\x20\x20\x20\x20\x20\x20\x20\x20l', 'w1ntZe0AjU', 'fW39AH25fp', 'sName\x20=\x20\x27l', '\x20\x20\x20\x20if\x20(zI', 'style=\x22wid', 'lGKmORlrVn', 'false;\x0a\x20\x20\x20', 'Animation\x20', 'olid\x20#444\x20', '\x20\x20\x20\x20let\x20r2', 'S/bsVevf04', 'erSprite', 'Pk6sQqArpL', '12dMwjQX', '\x200)\x20return', 'eight\x0a\x20\x20\x20\x20', '\x20\x20\x20\x20\x20\x20\x20\x20\x20i', 'MpyaR3IEvD', '\x20\x20\x20\x20\x20\x20<opt', 'EG+iZtBTIo', 'YSjXKaA4Yp', 'omRotation', '3J6jweN2ox', '\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20', 'Preview()\x22', ')\x20/\x206;\x0a\x20\x20\x20', '2sLsz0pgjZ', 'ropagation', '+0TgfI9BlB', 'uWj1hqcn/L', 'fE3sWe8hkg', '=\x22width:\x20a', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20', 'FzOozICwxu', 'zjiGrrF6tm', 'tem\x20{\x0a\x20\x20\x20\x20', '\x20flex;\x0a\x20\x20\x20', 'anvas.widt', 'i0LiohCi8n', 'qK+7/QzY2N', '08BrMcTRgU', '2YPxqHXgL1', 'ne;\x22>\x0a\x20\x20\x20\x20', 't\x20currentR', '\x20\x20\x20\x20\x20\x20.lib', '8lFd8P6rX/', 't)\x20!import', 'tion\x20||\x20\x27n', 'el66Ku0k+3', '\x20\x20\x20\x20\x20<div\x20', '+rC2WDZ9QP', 'domFlipHor', 'xwSwlx78Tc', 'JF4CiBiiv9', 't\x20=\x20frameH', '\x20FPS\x27;\x0a\x20\x20\x20', 'jwoNEYHGKa', 'parent\x2025%', 'nk+DELl5mk', 'uJqcJ9b5VD', '+29xCdFkhG', 'ion:\x20borde', 'tePreview(', 'eNZrr2f2hk', 'ywed1HmRc9', '\x20};\x0a\x20\x20\x20\x20\x20\x20', 'e(animX,\x20a', '\x20const\x20ope', 'ow.opener.', 'x.textCont', 'sFuSqRs8QK', ',\x20charY,\x0a\x20', 'UMNyTgmvpF', 'top', 'alCheckbox', 'd7m/3XL5ox', 'QImCFW9Ai8', 'r\x20to\x20previ', '=\x22Multiply', 'frsKfgnVjc', '\x20\x20\x20\x20\x20\x20\x20\x20bl', '>\x200.5\x20?\x20d\x20', 'ewCtx.draw', 'PwNNtASTtq', '65YU5oTH9o', 'nFrame\x20=\x20(', 'VFXBmSESSi', 'display:\x20f', 'IADjta9Zy5', 'f6AKaN27DO', '0\x22\x20onchang', 'ewCanvas.g', 'SukTD6DRIr', '\x20\x20\x20\x27Multip', '\x20\x20\x20\x20\x20rando', '\x20\x20\x20\x20\x20rotat', '\x20\x20ctx.glob', 'Amount\x20*\x204', 'HvnTGRK2AD', 'sK/wPzO38J', 'IpmBkwMOGu', '+vC2HK3Mkb', '0IdvxnhyDw', 'vU6ybNlPTr', '.textConte', 'd>None</op', 'QS2pdBAcgR', 'e;\x0a\x20\x20\x20\x20\x20\x20\x20', 'bi40xRAYud', 'ationLibra', 'NNyvIeChMA', '-y:\x20auto;\x0a', 'on\x20*\x20Math.', '\x20\x20\x20width:\x20', 'hh7O5/Pdf3', 'File\x20not\x20f', '\x22field\x22>\x0a\x20', 'whUzMzFgry', 'BctyF68ZTs', '\x20\x20\x20\x20if\x20(ra', 'cC/91P/yL6', 'GYkcwDHZOV', 'ZaE1s9DVI4', '7GiOrChsqq', 'cbStCmV1O9', 'GBEVdEr7KZ', 'oLNt+glnXh', 'TeYWlHUpCB', '\x20\x20\x20\x20\x20\x20case', '\x20reverse\x20?', 'mlcdRyddi2', 'Cjvwek+xAx', 'ffsetYInpu', ':\x208px;\x20}\x0a\x20', 'ems:\x20cente', 'BgIGCgIGBg', '\x20\x20color:\x20#', 'HGyGNIiCk0', 'n\x20=\x20blendM', '\x20\x20\x20\x20\x20\x20\x20\x20an', 'wCNjEeS76w', 'el\x20style=\x22', 'vas.addEve', 'tionDurati', '\x20\x20ctx.tran', 'e2B5zK/xpR', 'cal\x20=\x20docu', '\x20\x20\x20\x20switch', 'JFSzLAiDQB', 'leX\x20:\x201);\x0a', '5o2ah9ad2q', 'ption\x20{\x20co', '\x20\x20\x20\x20\x20.save', 's.getConte', '5mjMcBbMxr', 't:\x2022px;\x0a\x20', 'QyV+OoGBP2', 'ght,\x0a\x20\x20\x20\x20\x20', 'Input\x27).va', 'let\x20r2,\x20g2', 'ZdI6xWCPHS', 't\x20previewC', 'XBERhpiVMg', '2k1L/ktYAy', 'item-name\x27', '\x20\x20\x20font-we', 'Sl0Y6OoXT+', '\x20\x27°\x27;\x0a\x20\x20\x20\x20', '\x20\x20\x20\x20\x20for\x20(', 'layingEndi', 'uRk8hXSW7e', '\x20\x20\x20\x20\x20\x20\x20tex', 'ulOxDbj+0p', '5075175CAVAsf', 't\x20type=\x22ch', 'HT6QcOf7nK', 'alue=\x220\x22\x20m', '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a', 'Wv2I+iALY5', '\x20\x20\x20\x20\x20\x20\x20aut', '6Zp94SMrtx', 'rDds6taeW/', 'Y804mxyZWF', 'rawHeight\x20', '\x20hue2rgb(p', 'cnvxU+StFo', '\x20\x20\x20const\x20b', 'SxwxCsvuyr', 'nfx+38ypRO', 'blur\x20*\x202,\x20', '\x20let\x20g\x20=\x20d', '=\x221\x22\x20max=\x22', 's++eS6Mg6e', 'ZPSvq4m11P', 'empCtx.put', '0DAwuSOwVT', 'iXXScVgpiv', '\x20\x20input[ty', 'x;\x0a\x20\x20\x20\x20\x20\x20\x20', '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20', 'C84XOi+6XO', '7+qZdvK4MC', 'zzgWXByxvv', '6WBjDi3eCU', 'vzfVh+ufUE', '5W9alP+5SY', 'n)\x20{\x0a\x20\x20\x20\x20\x20', 'get\x20===\x20mo', '\x20\x20\x20\x20\x20\x20\x20\x20bo', 'C3PF6K1rM0', 'ibraryAnim', ';\x20border-c', 'family:\x20va', 'seInt(docu', '1CFNyPfIIe', 'th.random(', 'Bf7IMu7AOu', '\x20\x20\x20\x20\x20\x20ctx.', 'ottom:\x2012p', 's2qhUy9x1N', 'JplDDhRG76', 'pwKujyC7Wm', 'WPWDpYgsyu', 'animData.c', '\x20\x20\x20margin-', '-sm);\x0a\x20\x20\x20\x20', 'rotC1j195q', '_canvas', '\x20}\x20else\x20{\x0a', 'R6+ig+hjdA', 'KpakJbCw0D', 'OvENJn0C04', '()\x22>\x0a\x20\x20\x20\x20\x20', '>\x0a\x20\x20\x20\x20\x20\x20\x20\x20', 'SN6cABYrXk', 'ById(\x27libr', 'g/dFTxvLYA', 'PfYgb+zYIb', 'effectiveS', 'kWiSZF3r+B', 'eyZQ4UxkE/', 'ight:\x20600;', '.loadPictu', '3QCck7jtjL', 'TA7ZYl2e0G', '60)\x20*\x2060))', 'adding:\x2010', 'u1O080adf1', 'IqvMipokhV', 'LXT1WLe2md', 'E6FJnl7Fxs', 'ovedCount\x20', 'own(e)\x20{\x0a\x20', 'vbq3K/t/ex', 'K92rUuSzXt', 'ckground:\x20', '\x20\x20\x20\x20}\x0a\x20\x20\x20\x20', 't\x20type=\x22ra', 'order-bott', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20.', 'mY)\x20{\x0a\x20\x20\x20\x20', 'sWaPmmaMv/', '\x20\x20\x20\x20\x20\x20item', 'city:\x201;\x20}', 'exSelect\x20&', 'mount</lab', 'ow-y:\x20auto', ')\x20offsetYI', '\x20\x20}\x0a\x20\x20\x20\x20\x20\x20', '\x20\x20\x20\x20\x20\x20\x20\x20\x20w', '\x20\x20\x20\x20<div\x20c', 'a.characte', 'YEQcQjAMHl', 'l>\x0a\x20\x20\x20\x20\x20\x20<', 'gToggleWhi', '219860PjSfwT', '([style*=\x22', 'BFCBNuRczi', 'xjz9HNuxfM', 'ZwnUeQEK8n', 'AnimationL', 'indow.setC', 'div>\x0a\x20\x20\x20\x20<', '5,\x0a\x20\x20\x20\x20\x20\x20\x20', 'sInput\x27).v', '32YNAOvF3r', 'D/Kh1NYNVJ', 'QiS9yeXz3S', '8UPjM99/mt', 'ttom:\x206px;', '\x20\x20\x20\x20\x20\x20\x20\x20co', 'kE22qrUceS', 'acterSprit', 'ur\x20*\x204;\x0a\x20\x20', 'Ljc3532HV1', '-content:\x20', '\x20\x20<div\x20cla', '255:\x0a\x20\x20\x20\x20\x20', 'de\x20=\x20docum', 'ting\x20anima', 'vUZaR8U2Qn', 'erX,\x20cente', 'NXBeW8q031', 'ap:\x206px;\x0a\x20', 'ht\x20+\x20(blur', 'Qpbvzi3JSN', 'font-size:', 'OjOVLo+GJ5', 'ry().then(', '70R87PgopV', '/c7Z5wDQAk', 'pYUAQmkQGj', 'span>Enabl', 'ter;\x20user-', 'dow:\x200\x202px', 'Bloom)\x20{\x0a\x20', '75sPrAms', 'pdateFileD', '\x20*\x20(2/3\x20-\x20', 'nXDNDm79ug', 'slRcsu+sYZ', 'JHkQQ85N6F', 'K+gry1/5K/', 's/nAj3ANoN', 'eInt(docum', 'wLqiAguBUY', 'onst\x20frame', 'pBitmap._u', 'ent', '\x20\x20\x20\x20\x20blurr', 'ck=\x22openLi', '3px\x20var(--', 'CQF1PHG5q7']; _0x436a = function () { return _0x5a1a09; }; return _0x436a(); } function getAnimationFromLibrary(_0x1ad89a) { const _0x4c19b4 = { _0xe5d591: 0x639, _0x23004c: 0x2b9, _0x50105a: 0x635, _0x55b5a2: 0x3b8 }; return loadAnimationLibrary()['then'](_0x161132 => { const _0x3b9166 = _0x5d62; if (_0x3b9166(0x4f6) !== 'SngyY') return _0x161132[_0x1ad89a] ? _0x161132[_0x1ad89a] : (console[_0x3b9166(_0x4c19b4._0xe5d591)]('Animation\x20' + 'not\x20found\x20' + 'in\x20library' + ':\x20' + _0x1ad89a), null); else { const _0x5efef2 = _0x615617('fs'), _0x45a4a6 = _0x386c34('path'), _0x2037e4 = _0x45a4a6['dirname'](_0x5be096[_0x3b9166(_0x4c19b4._0x23004c)][_0x3b9166(0x59c)]) + '/js/', _0x35498a = _0x2037e4 + ('AnimationS' + _0x3b9166(_0x4c19b4._0x50105a) + _0x3b9166(0x43f)); if (_0x5efef2['existsSync'](_0x35498a)) { const _0x3adbcc = _0x5efef2['readFileSy' + 'nc'](_0x35498a, _0x3b9166(_0x4c19b4._0x55b5a2)); let _0x48b883 = _0x9c4297[_0x3b9166(0x994)](_0x3adbcc), _0x3e6a90 = -0x3 * -0xb68 + -0x5 * 0x191 + -0x1a63; for (const _0x22056b in _0x48b883) { _0x48b883[_0x22056b]['characterS' + _0x3b9166(0x271)] && (_0x48b883[_0x22056b]['characterS' + 'prite'] = null, _0x3e6a90++); } _0x5efef2['writeFileS' + 'ync'](_0x35498a, _0x26672b['stringify'](_0x48b883, null, 0x1d * 0x16 + -0x4ab + 0x22f), 'utf8'), _0x46a6e9 = _0x48b883; } } }); } function createAnimationVisualEditor() { const _0x353f4c = { _0x174c1f: 0xce5, _0xb8c847: 0x668, _0x29e73e: 0x8b0, _0x30a85d: 0x3a2, _0xeb0a8d: 0x785, _0x5ddfcf: 0xacf, _0x37c849: 0x867, _0xaa9197: 0x985, _0x288a98: 0x9d5, _0x47c9b3: 0x787, _0x2f525b: 0xace, _0x2cc55b: 0x244, _0x72b373: 0x88e, _0x14c914: 0xbdd, _0x4b6aa0: 0x5ea, _0x33976c: 0xa41, _0x8c8c5e: 0xc90, _0x1836ec: 0xbd5, _0x4200c7: 0xacf, _0xa6eba9: 0x233, _0x4d1ab4: 0x29a, _0x257b11: 0x62e, _0x57c87d: 0x6bf, _0x3e0e9d: 0xd45, _0x2d2c91: 0xacf, _0x2e330e: 0xa73, _0x5c5a99: 0x6d0, _0x323c12: 0xbdf, _0x38bfda: 0xce3, _0xf73362: 0xbae, _0xd03ca9: 0x234, _0x299bc4: 0x306, _0x364fc7: 0x9c8, _0x38fc04: 0x592, _0x238b37: 0x30f, _0x814d2: 0x5e9, _0x8e32a8: 0x647, _0x46e66b: 0x42c, _0x23a027: 0x8b6, _0x53435d: 0x2ce, _0x36a97f: 0x93f, _0x46848c: 0xbcd, _0xb5d4d5: 0x48e, _0x462260: 0x358, _0x182068: 0x5ac, _0x4aa5ae: 0xb07, _0x3a58ac: 0xc68, _0x5bed0d: 0xace, _0x6298f8: 0x39a, _0x55ab00: 0xa8, _0x361177: 0xb65, _0x1569fa: 0x64a, _0x2e9f98: 0x705, _0x520153: 0xb29, _0x1c47a9: 0xbae, _0x334d2f: 0x9b3, _0xe0d07b: 0x2d1, _0x2cc220: 0x4c5, _0x3418ea: 0x7cc, _0x3f2dae: 0x5cc, _0x1060db: 0x725, _0x1ca48f: 0x404, _0x55abda: 0x8bf, _0x1069f4: 0x795, _0x1b307e: 0x739, _0x4b2044: 0x44b, _0x42ce45: 0x80b, _0x1d6e9c: 0x6e2, _0xc0f6de: 0x8c2, _0xc11f9a: 0x601, _0x50f2c5: 0x204, _0x281143: 0x89d, _0x4b9865: 0x520, _0x3e6fb1: 0x5d6, _0x33716b: 0x9ef, _0x1b3c8d: 0x87c, _0x3b4c81: 0x918, _0x5746c8: 0x2ce, _0xd80341: 0xa8e, _0x3c4320: 0x51f, _0x5c8685: 0x786, _0x297dd3: 0x164, _0x43312c: 0xb7d, _0x2f5792: 0x2b6, _0x3ce57e: 0xb37, _0xb11ff0: 0xb14, _0x3b373e: 0x13a, _0x1e3be6: 0x6b7, _0x5d0d1b: 0x7e5, _0x522ebd: 0x93b, _0x57cb9e: 0xc0, _0x3ccd98: 0xd04, _0x3c2f18: 0x5d7, _0x387d7e: 0x764, _0x11c0bd: 0x6d1, _0xb7a072: 0x210, _0x517255: 0x722, _0x41831e: 0x843, _0x4eee6b: 0xacd, _0x3eed4b: 0xba3, _0x14c96a: 0x9b6, _0x1a8c89: 0x80, _0x2fd200: 0xbcd, _0x31898e: 0x682, _0x3dcf9c: 0xb62, _0x2b7921: 0x843, _0x19bab7: 0x6c2, _0x28a661: 0x7e5, _0x4c336e: 0x99a, _0x2cab63: 0x709, _0x3d031b: 0x16b, _0x22f90a: 0xa8d, _0x361056: 0x8b7, _0x9ed416: 0xc96, _0x2fb81f: 0x369, _0x5ae93f: 0x457, _0x28db70: 0x7b0, _0x203892: 0xb76, _0x5df313: 0x388, _0x2c2958: 0x645, _0x482879: 0x620, _0x46d007: 0x489, _0x3c1213: 0x2ea, _0x7e618: 0x65d, _0x196dc0: 0x82, _0x38c7a1: 0xadc, _0x501abd: 0xb0b, _0x560a4e: 0xa28, _0x3cc555: 0x106, _0x56ac63: 0xaf9, _0xdc6b83: 0x77e, _0x1c84b5: 0xaa0, _0x16d326: 0x58b, _0x3c66c7: 0x781, _0x1f564e: 0xafe, _0x3ecc54: 0x426, _0x5c00d1: 0xae9, _0x72503c: 0x1ca, _0x2df3ff: 0xc8f, _0x3b2db6: 0xa45, _0x28974b: 0x9cf, _0x4b1ee2: 0x4fc, _0x2ddec6: 0x813, _0x5203b0: 0xacd, _0x25d604: 0x45b, _0x332a61: 0xce8, _0x119a7d: 0x22d, _0x491832: 0x458, _0x57dfa5: 0x8d4, _0x1c7ccc: 0xa77, _0x144486: 0x44c, _0x3daf1c: 0x3c6, _0x2ec91e: 0x2ba, _0x6ecca6: 0xb0a, _0x4415aa: 0x174, _0x118025: 0x330, _0x2df993: 0x70a, _0x4382a7: 0xa01, _0x31c4fc: 0x510, _0x20aa2c: 0xe2, _0xc26b25: 0x865, _0x299b4a: 0x162, _0x176580: 0x65d, _0x5044e2: 0xb5b, _0x3cc705: 0x833, _0xfeab01: 0xd08, _0x34da7a: 0x637, _0x960c96: 0x5a0, _0x2865ab: 0x49f, _0x435768: 0xacf, _0x52c488: 0xccd, _0x69728: 0x722, _0x331b31: 0x374, _0x5dbb27: 0xd8, _0xf733d6: 0xae8, _0x2f6c54: 0x5b5, _0x96385f: 0xcd6, _0x2a4cfb: 0x83, _0x42b989: 0xacf, _0x114768: 0x4c4, _0x2cac6c: 0x2d6, _0x528709: 0x9de, _0x2df17a: 0x648, _0x2abb39: 0xa34, _0x5ba2c8: 0x383, _0x4847aa: 0x261, _0x390be2: 0xc8c, _0x5bb0c8: 0xb85, _0x379acf: 0xd1, _0x313bb2: 0x71e, _0x3c5d9c: 0xaa3, _0x80405f: 0xacf, _0x53faf6: 0x82f, _0xead278: 0x223, _0x5087e9: 0x414, _0x308bbf: 0xbd6, _0x46b05a: 0x718, _0x338157: 0x23f, _0x4c8104: 0x720, _0x4d54fa: 0xfa, _0x36c4dd: 0x32e, _0x2a01a2: 0xc09, _0x3bc3f7: 0xa39, _0x30327d: 0x2f5, _0x4e1d68: 0xa28, _0x2a85c1: 0x2b4, _0x21cd4d: 0x90d, _0x2f0fdd: 0x757, _0x4da7d6: 0xb3e, _0x230705: 0xb6f, _0x23d738: 0x4e8, _0x3ca85a: 0x3cd, _0x1a9d85: 0x1b4, _0x10d7e8: 0x6c1, _0x319e99: 0x907, _0x8b81ad: 0x68a, _0x41eeda: 0xbe7, _0xcb3ae1: 0x502, _0x5bd659: 0xade, _0x30d9c0: 0xaed, _0x2837fc: 0x5fc, _0x22a813: 0x656, _0x36d91f: 0x9f3, _0x5c3662: 0x761, _0x3be81c: 0x288, _0x386932: 0x7a3, _0x1fb11a: 0x658, _0x13b1bf: 0xbc7, _0x1ceb5d: 0x2ab, _0x25cf92: 0xd29, _0x2353e9: 0xd48, _0x437fbd: 0x51d, _0x24ced0: 0xa09, _0x21ecf9: 0x7d5, _0x5e4b09: 0x15e, _0x4eae7e: 0x716, _0x14f0fd: 0x5c0, _0x22ca2d: 0x47a, _0x193041: 0xcda, _0x296e6f: 0x4a5, _0x23290b: 0xb9e, _0x4b3172: 0xcf7, _0x48560c: 0x399, _0x554bcb: 0x8ec, _0x45b4c2: 0x7f7, _0x4001ae: 0xb6d, _0x4e5b18: 0x856, _0x14b556: 0x21b, _0x72d330: 0x251, _0x35f052: 0x8e0, _0x43fffa: 0xaff, _0x44b9a1: 0x500, _0x30fad0: 0x85f, _0x1e61a7: 0x6ef, _0x3e785d: 0x20c, _0x59d02c: 0xad0, _0x1d67ae: 0x525, _0x5ba5da: 0xb6, _0x42b8ed: 0x236, _0x9f27f5: 0xa8f, _0x13b446: 0x2ae, _0x76c523: 0xc11, _0x36dd9c: 0x814, _0x5aa3e1: 0xabd, _0x159dce: 0x45f, _0x436a88: 0xce9, _0x1db6af: 0xb79, _0x4eda25: 0x465, _0x26e89a: 0x98e, _0x5dc9e0: 0x8ce, _0x136e94: 0x325, _0x91da5a: 0x589, _0x5bf95e: 0x281, _0x2f8a0b: 0x3de, _0x445732: 0x3de, _0x335353: 0x3de, _0x252ce4: 0x3de, _0x2da8bd: 0x3de, _0xf02d02: 0x7e6, _0x524dae: 0xc71, _0x492d2d: 0x8ac, _0x188fea: 0x167, _0x5d9416: 0x50f, _0x441ffb: 0xd44, _0x2c28b7: 0x2c0, _0x50323b: 0x621, _0xfde54a: 0xad5, _0xcb5331: 0x55d, _0x4db9d4: 0x3ee, _0x47d7cb: 0x625, _0x1ea8c9: 0x846, _0x303ace: 0x9ee, _0x47a811: 0x6b2, _0x28ce2e: 0x5b1, _0x1eda4c: 0x850, _0x410098: 0x3bb, _0x293e81: 0x37b, _0x86e4e0: 0x67f, _0x146d37: 0x92f, _0x13d7d5: 0x397, _0x6487ac: 0xd1c, _0x29b961: 0x2c7, _0xf26c01: 0xaab, _0x58a563: 0x26c, _0x35d994: 0x9e5, _0x93bb35: 0x7f5, _0x3fbf3e: 0xad, _0x53051b: 0x377, _0x4c1b85: 0x7fa, _0x291873: 0x6b0, _0x83cdc2: 0x858, _0x2b0b90: 0xc2c, _0x4b5a3b: 0x25a, _0x681d77: 0x715, _0x3223b1: 0x507, _0x315c62: 0x320, _0x5a54dc: 0x4cb, _0x1baeec: 0xb5e, _0x72ca9d: 0x63e, _0x53b598: 0xa31, _0x278e7e: 0x7c1, _0x5417aa: 0x1d7, _0x3258f0: 0xaf, _0x1e5410: 0x2d0, _0x52eb94: 0x2af, _0x4b0d0f: 0xafb, _0x16cd55: 0x4ca, _0x135a7: 0x812, _0x38a89e: 0x990, _0x9b0636: 0x290, _0xd70407: 0x913, _0x504d59: 0x34c, _0x178e58: 0x3b4, _0x15540f: 0x8d9, _0x20fa84: 0xa6e, _0x5657e3: 0x78e, _0x556913: 0xa02, _0x3f29a9: 0x967, _0xef6c71: 0x30b, _0x210e82: 0xbd4, _0x45ba49: 0x5bf, _0x261c66: 0x989, _0x42f252: 0xcaa, _0x40ce1c: 0x88d, _0x11212c: 0x72f, _0x207f20: 0x8c1, _0xe73e4f: 0x970, _0x31ff63: 0x3fe, _0x5e1609: 0xa24, _0x344e3b: 0x85b, _0x55cce9: 0x2be, _0x168dc9: 0x198, _0x1d2171: 0x7f8, _0x167374: 0x101, _0x1606aa: 0x59f, _0x433fdd: 0x309, _0x102d6e: 0x6f4, _0x15bc93: 0x8c0, _0x3ec637: 0xd28, _0x58af64: 0xbde, _0x2be0e7: 0xd2c, _0x50350e: 0x556, _0x281610: 0x3a9, _0x17bba2: 0xb0, _0x429d8a: 0x4af, _0x18f7cf: 0xa61, _0x23d69a: 0xb6b, _0x181abf: 0x1cf, _0x2a1c70: 0x545, _0x343fe4: 0x63b, _0x26908: 0x1b3, _0x4ff40f: 0x82d, _0x3e3266: 0x61d, _0x9c6b88: 0x607, _0x142e37: 0x285, _0x42efbd: 0x2a8, _0x4493c2: 0x719, _0x3dd1e4: 0x506, _0x1a9474: 0xacb, _0x165e07: 0xca6, _0x1ae850: 0x39e, _0x37e0a: 0xf9, _0x4fcd1f: 0x509, _0x246303: 0x79e, _0x1a1277: 0x36f, _0x4d0f8d: 0xaea, _0x346045: 0xa40, _0x52610a: 0x674, _0x59b935: 0x7c7, _0x53cedb: 0x649, _0x277c08: 0xd1f, _0x3be9a7: 0x35e, _0x395804: 0x3cf, _0x2ad48c: 0xd0e, _0x4d9c70: 0x8da, _0x2c79e5: 0xc9d, _0x3a2b0b: 0x899, _0x4891d3: 0x258, _0x9883c3: 0x629, _0x4b0ffb: 0xa42, _0x312da9: 0xda, _0x241e6a: 0x2a0, _0x4c2fe3: 0x3ab, _0xd5e682: 0x653, _0x4d8eb9: 0x602, _0x2bd46e: 0x810, _0x224901: 0x6bd, _0x325936: 0xb3b, _0x37f781: 0x482, _0x315984: 0xcd0, _0x5ed4a0: 0x7ad, _0x5680e4: 0x9b8, _0xf3191f: 0x7d7, _0x52cb8a: 0xcf5, _0x4499cf: 0x471, _0x516bc9: 0x49c, _0x3510ce: 0xa43, _0x39c32d: 0x1dc, _0x360168: 0xcab, _0x432b2e: 0x941, _0x391729: 0x158, _0xce5d19: 0xc1e, _0x406c29: 0x551, _0xcb3712: 0xad1, _0xc628ee: 0x4de, _0x35ce06: 0xbbf, _0x572c1b: 0xbe9, _0xe43a94: 0x1ff, _0x4f273f: 0x44a, _0x985fee: 0x1f4, _0x46f34f: 0x53f, _0x4457e0: 0xa9c, _0x2dfeef: 0x869, _0xb462ae: 0xc3, _0x3c56c5: 0x655, _0x30157d: 0x762, _0x9a2236: 0x276, _0x4b85dd: 0x4b9, _0x918164: 0x322, _0xb5fc90: 0xc07, _0x8bb38b: 0x316, _0xc566f6: 0x6a8, _0x211e0e: 0xac4, _0x50e5c4: 0xbab, _0x50a8b2: 0xd32, _0x4f2dd3: 0x5e2, _0x383650: 0x129, _0x3a53c7: 0x349, _0x40fdb6: 0x2cc, _0x187ff0: 0x86, _0xcd9a9c: 0x6fc, _0x309dfa: 0x9b9, _0x4726b0: 0xb48, _0x225a14: 0x495, _0x2f361b: 0x13e, _0x30c0b1: 0xa84, _0x5d2ebe: 0x5a8, _0x35e7d7: 0x68f, _0x2b4447: 0x1f6, _0x265e54: 0xbe3, _0x47e32d: 0x6c8, _0x408372: 0xd3d, _0x5c04ab: 0xe1, _0x71cd19: 0x454, _0x2b124c: 0x220, _0xd91b8d: 0x86b, _0xe78f9f: 0xcca, _0x1c7c9f: 0x3bd, _0x5f41dc: 0x830, _0x5c572f: 0x695, _0x344136: 0x5de, _0x34eee1: 0xc9e, _0x22c39b: 0xad9, _0x4e4e69: 0x406, _0x9b6223: 0xb39, _0x38ac1d: 0x8f8, _0x526096: 0xbc8, _0x461c08: 0x8c7, _0x27bc5c: 0x361, _0x45d9f4: 0x31e, _0x20ba92: 0xc18, _0x5adbbb: 0x3f6, _0x484ae3: 0xb2b, _0x3e31fc: 0x4f0, _0x2c042e: 0x4bb, _0x45ae48: 0x701, _0x2fb45a: 0x4f2, _0x5c2b54: 0xb63, _0x18cc7d: 0x1ef, _0x340bca: 0xb28, _0x37a2a9: 0x7fb, _0x4aec08: 0x30e, _0x18efbd: 0x526, _0x14b4f3: 0x539, _0x5e5aa6: 0x8cb, _0x534bc0: 0xb71, _0x452907: 0x791, _0x49d514: 0x802, _0xffc706: 0x6c3, _0x3d971b: 0x751, _0xc21c65: 0xb7c, _0x3a84b8: 0x6c7, _0x1a15ca: 0xa60, _0x9f21fe: 0x583, _0x3fd267: 0xd37, _0x1bb329: 0x4e2, _0x1c2191: 0x7b4, _0x54b7db: 0x8eb, _0x75209f: 0x892, _0x21cfe5: 0x295, _0x2b9dbf: 0x60c, _0x4271c9: 0x100, _0xa6d681: 0x124, _0x37ecd7: 0x76e, _0x38a1b8: 0xcf9, _0x47ebeb: 0x683, _0xe4897b: 0x7c4, _0x288a6f: 0x31b, _0x1d8fae: 0x90c, _0x223855: 0x5ad, _0x5ee831: 0x190, _0x92ad74: 0x8a2, _0x2637de: 0x2bc, _0x423827: 0x6af, _0x8664b0: 0x34f, _0x23d384: 0x1e2, _0x4c5e90: 0x2b3, _0x12202f: 0x24f, _0x20d853: 0x79b, _0x404398: 0xc7, _0x5ac39d: 0x905, _0x3a8fa0: 0x676, _0x1e719d: 0xa47, _0x3020bf: 0xb87, _0x5d88ef: 0x7e1, _0x497d32: 0xd20, _0x2df84e: 0x702, _0x22b802: 0x148, _0x557c37: 0x61b, _0x38e863: 0xc7b, _0x43a6a9: 0xc57, _0x2cc0b6: 0x919, _0x50ede9: 0x7c5, _0x45839d: 0x3fc, _0x19a3c9: 0xad4, _0x15869d: 0x50a, _0x5cdec8: 0x1fd, _0x26faa9: 0x7f9, _0x5d0b89: 0x176, _0x124503: 0x94b, _0x23cf1e: 0x413, _0x3d6b4c: 0x68c, _0x59a4c5: 0x969, _0x222e60: 0xa22, _0x30d6ce: 0xac8, _0x3eaa62: 0x1df, _0x1bb8e5: 0x21c, _0x14f8c4: 0x34d, _0x2077cb: 0x902, _0x5ccbfc: 0x6b9, _0x3c45cb: 0x45a, _0x13004f: 0xb81, _0x435708: 0x4e3, _0x5a649d: 0xb78, _0x2ee382: 0x193, _0x183f03: 0x5f9, _0x64bca1: 0x736, _0x1628b5: 0x118, _0x89c700: 0x11e, _0x5c213a: 0x58d, _0x576666: 0x1cb, _0x1a3867: 0xf5, _0x122395: 0xbcb, _0x450e3e: 0xa3d, _0xbcc674: 0xc7a, _0x244e39: 0xbc4, _0x46c7f7: 0x979, _0x22f8e6: 0x12f, _0x293f3a: 0x733, _0x55f134: 0x936, _0x20e6b: 0x561, _0x1ff497: 0x18f, _0x18664b: 0x52b, _0x464409: 0x4ea, _0x467ad6: 0xbd7, _0x15be05: 0x2e1, _0x5cb224: 0x538, _0x421197: 0x3a4, _0x186202: 0xcfc, _0x3169aa: 0x2fd, _0x1f365d: 0xc01, _0x1d1aca: 0x338, _0x38c5f0: 0x277, _0x214d94: 0x60f, _0x91d94b: 0x512, _0x57f3f2: 0xa8a, _0x4e6b26: 0x243, _0x245148: 0x935, _0x40ac98: 0x84c, _0x7787bb: 0x877, _0x9159e: 0x2c8, _0xb6eb4e: 0xb94, _0x14a28c: 0x96b, _0x46431c: 0x3f1, _0x5ba9da: 0x96e, _0x1b1b68: 0x443, _0x3beab2: 0x14a, _0x576b05: 0x27a, _0x1e6825: 0xd41, _0x2e5e7d: 0x758, _0x9eac04: 0x2f4, _0x5d1b69: 0x611, _0x27142a: 0x43e, _0x2c69ba: 0x9a6, _0x4acf20: 0xccc, _0x207bf7: 0x917, _0x438068: 0x78b, _0x1e2a40: 0x8e4, _0x11f646: 0xb4d, _0x5054f3: 0xc2d, _0x94f6a7: 0x23d, _0x26cd33: 0x49e, _0x58075d: 0x886, _0x3b1965: 0xc7c, _0x326092: 0x8dd, _0x2a46a3: 0x600, _0x1c0e98: 0xa9, _0x3b5f1e: 0xb7b, _0x5d5763: 0x642, _0x460d9b: 0x99f, _0x39748f: 0x923, _0x12272d: 0x66d, _0x273543: 0x93a, _0x1ee539: 0x527, _0x4782bf: 0x62f, _0xac9346: 0xe9, _0x146b17: 0xd36, _0x458aa6: 0xbc0, _0x312171: 0xa3a, _0x260ee2: 0x327, _0x4353d1: 0x5b9, _0x481e18: 0x893, _0x186176: 0x9ca, _0x4f68bf: 0x8ea, _0x3802f4: 0x42a, _0x4f3796: 0x5f2, _0x219dbf: 0x257, _0xeac9f5: 0xd07, _0x1eb9b8: 0x241, _0x160293: 0xbd0, _0x1d8cbd: 0x841, _0x312b06: 0x298, _0x5a1115: 0x929, _0x52fb7a: 0x2f1, _0x3e9610: 0x7ef, _0x10913f: 0x78c, _0x5adbb3: 0x8d6, _0x493d67: 0x574, _0x182cdd: 0x727, _0x21e2be: 0x90e, _0x25c5ff: 0x332, _0x5d0529: 0x9c5, _0x22b646: 0x345, _0x538d96: 0xb61, _0x1cba3f: 0x38f, _0xe3e27a: 0x633, _0x142d82: 0xc2f, _0x3482d1: 0xa64, _0x582797: 0x558, _0x57e9a7: 0xbac, _0x14cbf4: 0x8b, _0x4cd297: 0x804, _0x4417c5: 0x9d0, _0x12a66d: 0x631, _0x4bd98b: 0x41c, _0x3181cf: 0x4e4, _0x15915f: 0x6fe, _0x35ba5b: 0x439, _0x288cd8: 0x23a, _0x14f9b7: 0x55e, _0x425a82: 0xba2, _0x199dce: 0x425, _0x3e7586: 0xc6f, _0x12281b: 0x912, _0x75e098: 0x3a6, _0xb9d5cd: 0x63d, _0x2190db: 0xc1d, _0x193d45: 0x7da, _0x26d866: 0xb3d, _0x236f3a: 0xbec, _0x97310b: 0x7ec, _0x553e9d: 0x797, _0x47f0fd: 0x792, _0x30a72d: 0xb68, _0x395201: 0xb27, _0x2b3f34: 0x3e2, _0x4c5aa3: 0x440, _0x5a4cc4: 0x628, _0x20d573: 0xc58, _0x4587db: 0xcef, _0x4caa63: 0xb60, _0x5bd139: 0x650, _0x2ea807: 0xcb5, _0x3c1244: 0xcdc, _0x429af4: 0x67d, _0x43e18d: 0x324, _0x172cfa: 0x4aa, _0x4f950a: 0x307, _0x2dc9d4: 0xc45, _0x4727b7: 0x38b, _0x2aed08: 0x231, _0x26a14d: 0xc52, _0xbf0b65: 0xdb, _0x4f2cda: 0x456, _0x1f9dbe: 0x634, _0x533843: 0x472, _0x2ecb4f: 0x6e7, _0x152969: 0x669, _0x5d6cc1: 0x568, _0x40c469: 0x57c, _0x3b84a0: 0x9b0, _0x1f25a5: 0x9e8, _0x355de2: 0x7b9, _0x345fb5: 0x6b1, _0x5f1bfc: 0x319, _0x167646: 0x2a5, _0x599c51: 0x703, _0x560258: 0x5c4, _0x1d2611: 0x624, _0x5ac09f: 0x18a, _0x15bfdb: 0x9e, _0x2ebda4: 0x363, _0xefbaba: 0xb4a, _0x17d163: 0x12b, _0x1df9c1: 0x8bb, _0x2e1ab3: 0xacc, _0x594062: 0x4e5, _0x58abc6: 0x301, _0x405e0d: 0x984, _0x587c98: 0x312, _0x124261: 0xa57, _0x14c7a9: 0x401, _0xf2e77a: 0x1b0, _0x458cb7: 0x9cb, _0x5bf937: 0xa50, _0x2b0cae: 0x1a4, _0x11d09b: 0xd0f, _0x13df9d: 0x988, _0x386421: 0x4ff, _0x322cb8: 0xa30, _0x3db054: 0xbb9, _0x4713b2: 0x41d, _0x14919e: 0xbdb, _0xcffdd5: 0xd0d, _0x236726: 0xa54, _0x403bf5: 0xd05, _0x2cc2d7: 0x9eb, _0x2598f2: 0xc2e, _0x66be59: 0x67a, _0x11d6ee: 0xcb, _0x18d346: 0x580, _0x1ecb44: 0x3c7, _0x32f488: 0x68d, _0x545a58: 0xcc4, _0x59cc11: 0xd38, _0x318688: 0x484, _0xc57f97: 0x5c8, _0x3fabe0: 0xb5d, _0x1b8e31: 0xae3, _0x49881c: 0x49b, _0x297b42: 0x5f0, _0x2abeb3: 0x196, _0x274bc9: 0x8c6, _0xdaf8a9: 0x390, _0x3f1157: 0x8f6, _0x3114f8: 0x284, _0x59a03c: 0x1a7, _0x58ccf4: 0x246, _0x1c51bf: 0x378, _0x3c0da3: 0xce0, _0x416e13: 0x1ab, _0x48ab42: 0xc60, _0x4a6b6b: 0x29c, _0xab91e: 0x8bd, _0x4ff2bb: 0x62d, _0x11d378: 0x21d, _0x40cd0c: 0x687, _0x39ce5f: 0xc7e, _0x4766a3: 0xd0b, _0x9e653e: 0x300, _0x53d4ec: 0x40c, _0x2a408a: 0x289, _0x111021: 0x229, _0x49a777: 0x228, _0x481f31: 0x30c, _0x244306: 0x2fb, _0x4d931d: 0x1e9, _0x4e1f90: 0x81e, _0x384792: 0x5a6, _0x1635a6: 0x78d, _0x1a211d: 0xa19, _0x2e70f1: 0x6bc, _0x54d2ca: 0xc24, _0x205a44: 0x8a1, _0x33aa18: 0x4d9, _0x3f981f: 0x911, _0x37b236: 0x3c3, _0x73fcf9: 0x230, _0x5625c0: 0x4ae, _0x57d806: 0xbd9, _0x5f1116: 0x3a1, _0x3c1dab: 0xc43, _0x313531: 0x581, _0x4c33f4: 0xbba, _0x47b54e: 0x328, _0xfb772a: 0x640, _0xbdc2dd: 0x9b7, _0xd874ba: 0xb8b, _0x28269a: 0xcaf, _0xdbb249: 0x4f4, _0x5aa48d: 0xac9, _0x58337a: 0xb3f, _0x2bd0df: 0x3b0, _0x10d32f: 0x4dd, _0xa0a2df: 0xa8b, _0x382ffa: 0x610, _0x2ba1af: 0x36c, _0x49490a: 0x191, _0x16ac80: 0x863, _0x13f3ec: 0x3d0, _0x4d0f9e: 0xb84, _0x1f0130: 0x670, _0x5ceabb: 0xca1, _0x51c704: 0xc14, _0x1211d5: 0xab2, _0x405d7e: 0x460, _0x1d9e51: 0x4b1, _0x277eca: 0x7ba, _0x411862: 0x1c3, _0x44bc8e: 0xa7e, _0x5abd61: 0x774, _0x444b93: 0x10d, _0x5cf5bf: 0xcee, _0x413408: 0x857, _0x591f5c: 0x259, _0x1b21b0: 0x798, _0x2f51fb: 0x771, _0x5a3133: 0x3ce, _0x46ad77: 0x4f7, _0x42df8b: 0x3f4, _0x5bfaec: 0xd26, _0x1b4e95: 0x58a, _0x4f1e83: 0x99e, _0xdd9ab5: 0x161, _0x25da9a: 0x462, _0x139cb3: 0x1af, _0xbf00e0: 0x213, _0x3e726b: 0x5a7, _0x14ee17: 0x2e7, _0x3512ae: 0xbf7, _0x5b8283: 0x1f9, _0x567dbc: 0x992, _0x4c98dd: 0x57a, _0x53b92c: 0x19e, _0x3bfe28: 0xde, _0x4c670d: 0x46a, _0x23b99c: 0x160, _0x128c51: 0x524, _0x3d3325: 0xc0f, _0x16af87: 0x3df, _0x71b223: 0xcb9, _0x27fdb6: 0x2ee, _0x5e5c2a: 0xce7, _0x5f399f: 0xd46, _0x448fe8: 0x303, _0x5b2eb4: 0x21f, _0x5791d3: 0x6db, _0x13cb32: 0x169, _0x57265a: 0x6ea, _0x4e1a31: 0x67c, _0x1d2812: 0x3fa, _0x512ad7: 0xc9f, _0x49e148: 0x1f3, _0x3c8e04: 0xa1e, _0x568538: 0xb9a, _0x2a5b58: 0x9fa, _0xf6bba3: 0x5c9, _0x14619a: 0x6ed, _0x5ed59f: 0x4a0, _0xe5f2cd: 0x694, _0x2f3ed5: 0x3f0, _0x896347: 0x9d8, _0x3c9bd8: 0xb47, _0x293051: 0xa85, _0x49d1c5: 0x6de, _0x1a0983: 0x828, _0x21fbfe: 0x8c5, _0x530a4b: 0x7a7, _0x2b29aa: 0x878, _0x4aebbf: 0x679, _0x2f337e: 0x36a, _0x3a3c38: 0xbe5, _0x30037d: 0x6e3, _0x21981c: 0x6c5, _0x3f6930: 0x8e6, _0x529abd: 0x479, _0x41f354: 0x52c, _0x3dc8e8: 0x459, _0x4c7894: 0x14c, _0x53681c: 0x772, _0x412b6d: 0xd2a, _0x1d374a: 0x39f, _0x5f68b3: 0x360, _0x5ee401: 0x594, _0x4cfa6f: 0x133, _0x215561: 0xaee, _0x320e98: 0x2a7, _0x4a73a2: 0xd6, _0x7f4779: 0x775, _0x254196: 0xae4, _0x526c4f: 0x423, _0x1b4b17: 0xcf4, _0x1f63fd: 0x972, _0x39c5d5: 0x749, _0x47f319: 0x3db, _0x2d5060: 0x93e, _0x3a1011: 0x630, _0x2e7cea: 0x66e, _0xf32e: 0x9aa, _0x1c74d3: 0xb5, _0x36262d: 0x75e, _0x599730: 0x75d, _0x55458c: 0x293, _0x30622e: 0x3be, _0x557daa: 0x748, _0x54c44d: 0x474, _0x2be5b2: 0x570, _0x83a033: 0x2de, _0x249502: 0x37e, _0x43507b: 0xac1, _0x569f1b: 0xcb2, _0x363402: 0x311, _0x54827e: 0x957, _0x31bdc4: 0x206, _0x3f2fb2: 0x908, _0x5226ec: 0x8a4, _0x32c2ae: 0xccb, _0x4b6abc: 0x71f, _0x26e459: 0x81f, _0xcdba16: 0xaae, _0x3daf17: 0x1bf, _0x38ee82: 0x50d, _0x5c6ee7: 0x154, _0xf0f29c: 0x9b, _0x334652: 0x6e6, _0x2542f3: 0x7be, _0x4ef111: 0x84d, _0x5db28a: 0xaf8, _0x4fd1ca: 0xc69, _0xf7fb99: 0x5bb, _0x5d39d9: 0xca8, _0xc895b6: 0xa7d, _0x5f5d41: 0x3b5, _0x503e18: 0x113, _0x21f386: 0xc95, _0x3d41d1: 0x848, _0x2d5016: 0x8a0, _0x2ca9bd: 0xa87, _0x31d1e6: 0xcbf, _0x3c590d: 0x818, _0x5a32eb: 0xa0d, _0x3728bf: 0x46c, _0x4589e: 0x8c9, _0x11c11c: 0x832, _0xbbe292: 0xe4, _0x3f20de: 0xce2, _0x407215: 0xbf8, _0x121f0e: 0x99d, _0x39d2e0: 0xb8e, _0xee2e69: 0xa81, _0x5e731d: 0x981, _0x413e2d: 0xac3, _0x1012fc: 0xbd2, _0xcd8292: 0x65e, _0x754512: 0x45d, _0x51b34c: 0x4bf, _0x50a45f: 0xc99, _0x194550: 0x5d8, _0x358530: 0x7fe, _0x2b8924: 0x9a2, _0x5670e1: 0x7cd, _0x40e677: 0x5bc, _0xa4f517: 0xd25, _0x566995: 0x3e3, _0x1f112d: 0x1e8, _0x60583b: 0x7b7, _0x59e73a: 0x77f, _0x439066: 0xa3c, _0x17e8e6: 0x693, _0xdc163a: 0x157, _0x25c8ae: 0x7e7, _0x29b0af: 0x50e, _0xf5c071: 0x381, _0x41d6a6: 0xb5f, _0x4613ee: 0x6fd, _0x41e8a4: 0xbfe, _0x3a2fb7: 0xca5, _0x258081: 0x735, _0x25f411: 0x9bb, _0xb7b432: 0x1c1, _0x4e5eb6: 0x707, _0x981060: 0xba4, _0x3df1ac: 0xe8, _0x13eb4a: 0x402, _0xf8972d: 0xa55, _0x1f19c1: 0xcbc, _0x3d542d: 0xb16, _0x404605: 0x56b, _0x1c3fff: 0x7ce, _0x4aa06a: 0xba5, _0x9adb32: 0x86c, _0x3de073: 0xc66, _0x4b8bd3: 0xba8, _0x41c394: 0xac7, _0x188ed8: 0x463, _0x56c661: 0x9c4, _0x116019: 0x188, _0xf97022: 0x1da, _0x3a6530: 0x938, _0x15f4f2: 0x974, _0x51d4be: 0xb9d, _0x427197: 0xa95, _0x51ddd1: 0x3b1, _0x5c0588: 0x253, _0x527252: 0x8a3, _0x3b96cb: 0x504, _0x482938: 0xcbd, _0x97cd76: 0xbdc, _0x4fd2a3: 0xb1a, _0x4f43d8: 0x23c, _0xd5f454: 0x623, _0x4f5e6b: 0x17c, _0x32ea4e: 0xaf1, _0x43eaf4: 0x8ed, _0x41ffc1: 0x127, _0x558303: 0x96d, _0x480a18: 0xd2f, _0x5a771f: 0x5c6, _0x26b52b: 0xa0c, _0x11cd30: 0x4df, _0x527402: 0x2a6, _0x1b2cef: 0xc7f, _0x155714: 0x437, _0x366dd1: 0x755, _0x12ca86: 0xa27, _0x1d3b4c: 0x171, _0x21d2a4: 0xc27, _0x270bc2: 0x125, _0x6eae51: 0x8ed, _0xb0c6f7: 0x74f, _0x42981d: 0x119, _0x1082f7: 0x3d9, _0x3ff0b3: 0x6d9, _0x39ce22: 0xc77, _0x505ce6: 0x9ce, _0x1ec077: 0x2ac, _0x485f4a: 0x65f, _0x1384e0: 0x55f, _0x369012: 0x5e0, _0x584952: 0x6aa, _0x116acb: 0x498, _0x1e8b13: 0x13d, _0x106037: 0xc5f, _0x193910: 0xb07, _0x466825: 0x10c, _0xfebf12: 0x77b, _0x304fa3: 0x553, _0x4ff05e: 0x4ad, _0x29f3f2: 0x931, _0x38cc9f: 0x622, _0x1b801a: 0xa71, _0x535a58: 0x752, _0x100f37: 0xc15, _0x31fea0: 0xaf1, _0x146286: 0x9e4, _0x40a21f: 0x769, _0x333a80: 0x9ad, _0xe1b200: 0xaf1, _0x2f84d3: 0xc9c, _0x5e76f9: 0xaf1, _0x491b7f: 0x2f9, _0x6bf16c: 0x403, _0x3253e7: 0x3da, _0x45e7e9: 0x684, _0x23711b: 0x33e, _0x15fbaa: 0x6dd, _0x1075a2: 0xb89, _0x381ed9: 0x82c, _0x24a524: 0x186, _0x57c6f1: 0x2c2, _0x2290c6: 0xac7, _0x2836c7: 0x45c, _0x1742a6: 0x1eb, _0x26c594: 0xbf2, _0x16c40b: 0x9fc, _0x5fd5f3: 0xa3, _0x137db5: 0xbc5, _0x293373: 0x9df, _0x125b03: 0xb7e, _0x16d284: 0x134, _0x1079df: 0x3f9, _0x465c21: 0x68b, _0x15c6cd: 0xb73, _0x246ebf: 0xa1a, _0x1a8dd2: 0x587, _0x216c74: 0x8cc, _0x34796d: 0x909, _0x45e4e3: 0x9f2, _0x8a4638: 0x8e8, _0xad54ce: 0x64e, _0x441472: 0x245, _0x509753: 0x672, _0x1944ea: 0xaf1, _0xc83d37: 0x56c, _0x38e889: 0x680, _0x582f4b: 0x773, _0x37fb90: 0x706, _0x42d449: 0x14e, _0x4e1a24: 0x260, _0x5b72ae: 0x392, _0x67168d: 0x73a, _0x5052f8: 0xab8, _0x1cc04e: 0xf4, _0x4b6800: 0x738, _0x2eebde: 0x8e9, _0x4e2a9a: 0x344, _0x465b20: 0x6be, _0x457d48: 0xd35, _0x281227: 0x463, _0x3c8dff: 0x3e9, _0x475ae2: 0xb40, _0x2d01ef: 0x7e3, _0x2aad02: 0x5b2, _0x16699e: 0x32a, _0x3f7b2a: 0x978, _0x3584be: 0x808, _0x587393: 0x593, _0x4b26f4: 0x4a1, _0x4dca68: 0x1b6, _0x34363f: 0x6d3, _0x288931: 0xa3, _0x32c756: 0x939, _0x2979b6: 0x9c1, _0x2fac13: 0x4eb, _0x4f6a2b: 0x9d3, _0x3e6f17: 0x84a, _0x5d925d: 0xc32, _0x53bf08: 0x452, _0x47873b: 0x788, _0x407dc0: 0x355, _0x3713f0: 0xb3a, _0x47775c: 0x5bd, _0x1f9ca9: 0x4b4, _0x312096: 0xaa9, _0x18ce84: 0xacf, _0xd54d: 0x356, _0x80e16c: 0x87, _0x4ffb0c: 0xacf, _0x4818ac: 0xc17, _0x5f609a: 0xacf, _0x25da08: 0x435, _0x14fc9d: 0xacf, _0x8be99: 0x224, _0x5f4b47: 0x5af, _0x22356a: 0x18c, _0x57d5b5: 0x3e0, _0x42f2ae: 0x282, _0x343952: 0x4f3, _0x5c8712: 0x5ef, _0x31487d: 0x9f6, _0x5ad9db: 0x3d8, _0x2f0c2a: 0x8a, _0x5d88fa: 0x38e, _0x1e587d: 0xacf, _0x3aaaa7: 0x9ba, _0x5aecf5: 0x91, _0x28ffe4: 0x9ff, _0x2869ab: 0x606, _0x486ec0: 0x737, _0x27ba17: 0xa67, _0x438f53: 0xd21, _0x5d441b: 0xaaf, _0x24318b: 0xa66, _0x41ede1: 0xc8d, _0x3e8ae8: 0x481, _0x3d6bd0: 0x6cb, _0x2705de: 0xc54, _0x441f04: 0xa0e, _0x4f4ced: 0x2cb, _0xbed679: 0xca, _0x378fef: 0x8d8, _0x101f09: 0xacf, _0x44964e: 0xc74, _0x428637: 0x89c, _0x47ab3b: 0x7a5, _0x102f49: 0x306, _0x149817: 0x2d9, _0x15fa5b: 0x8db, _0x5ef6a8: 0x897, _0x4b1356: 0x79c, _0x39b2af: 0x28d, _0x1a670b: 0x5a9, _0xe2cdcd: 0xa96, _0x3a7413: 0xacf, _0x3129d6: 0x61f, _0x30679b: 0xacf, _0x4d5122: 0x5a1, _0x35c8d3: 0x590, _0x7600d4: 0xb5a, _0x2deade: 0x698, _0x5c8254: 0x803, _0x24acd9: 0x6d8, _0x575081: 0xd2e, _0xc8457d: 0x944, _0x21929d: 0x3bc, _0x314227: 0xcd7, _0x30b9df: 0xbc1, _0x224c6a: 0x6e1, _0x3c1ca8: 0xacf, _0xb53ba7: 0x9c7, _0x2c1dff: 0xf3, _0x4d525b: 0x831, _0x2a8e4c: 0x8f4, _0x42c6ba: 0xa18, _0x3a4ab9: 0xacf, _0x316510: 0x4c3, _0x218f71: 0x202, _0x18d7c1: 0x4b0, _0xa3f9b4: 0xacf, _0x56e9b0: 0x323, _0x569668: 0x98a, _0x320f1b: 0xb14, _0x626edb: 0xb21, _0x4398ea: 0x3d7, _0x34c979: 0xcc2, _0x23af8e: 0xacf, _0x55edfc: 0x1c2, _0x472489: 0xacf, _0x589f58: 0x37c, _0x34713c: 0x8fa, _0x39f79d: 0x7c9, _0x148c00: 0xb77, _0x333c42: 0x39d, _0x156a7e: 0xc30, _0x3b89fc: 0xfb, _0x2b5c01: 0x675, _0x28a1c3: 0xa49, _0x1a71a6: 0xc22, _0x573b1b: 0xba1, _0x2ab763: 0xa4d, _0x3c6b15: 0xacf, _0x3525ed: 0x853, _0x467020: 0x23b, _0x27ecad: 0xcd4, _0x1da361: 0xb24, _0x108f64: 0x3ca, _0x3ad942: 0x2e2, _0x226334: 0x60a, _0xd5c98b: 0xacf, _0x2c53b8: 0x112, _0x5dd7d2: 0x7c3, _0x4dd1c6: 0x729, _0x121f0f: 0x8e3, _0x2bce8a: 0xacf, _0x4f9ad5: 0x2a9, _0x36d29e: 0x99c, _0x4413c3: 0x991, _0x5b96a0: 0xacf, _0x59651f: 0x131, _0xa2353c: 0xaec, _0x165cc7: 0xcdf, _0x2d331a: 0xa6, _0x16a104: 0x219, _0x21ab10: 0x6ba, _0x415881: 0x691, _0x427031: 0x943, _0x42ce97: 0xbf1, _0x572da8: 0x898, _0x537cab: 0x68e, _0x215493: 0x47f, _0x280b67: 0x746, _0x1efee5: 0xbff, _0x417f53: 0x8d2, _0x487830: 0xacf, _0x48089a: 0x744, _0x5bf711: 0xc76, _0x5ce757: 0xc82, _0x27bcb8: 0x331, _0x2a269b: 0xd3a, _0xf17738: 0xacf, _0x17a0b1: 0x721, _0x4cd881: 0x1cc, _0x4ae8cd: 0xa04, _0x4d82eb: 0x329, _0xefbd84: 0xb0c, _0x13f3a7: 0x221, _0x2d1c27: 0x724, _0x5984c9: 0xacf, _0x23c945: 0x662, _0x11442a: 0x71d, _0x34d566: 0xb20, _0x131f3a: 0x8c3, _0x3f82a7: 0x537, _0x446318: 0xacf, _0x21e8a2: 0x408, _0x374822: 0xa28, _0x4491ab: 0xb8c, _0xe6345e: 0xa5a, _0x3dbe29: 0x7ff, _0x5e9099: 0xb75, _0x218903: 0xacf, _0x23c8ca: 0xa4f, _0x3aba43: 0x664, _0x3ddf53: 0xb20, _0x1d48f0: 0xacf, _0x454b62: 0x82b, _0x41f23b: 0x887, _0x1a2612: 0xacf, _0x49c916: 0x31f, _0x5e8ce1: 0x560, _0xf654: 0x884, _0x8e5cc7: 0x7ff, _0x4c17c0: 0x48a, _0x3fd465: 0x91c, _0x31e860: 0xbe0, _0x44a231: 0xb32, _0xd5abef: 0xa0e, _0x4439d5: 0x168, _0x170f72: 0x6bb, _0x947a64: 0x168, _0x415f3e: 0x7ee, _0x3c85d4: 0x56f, _0x1343aa: 0x48d, _0x40b1d3: 0x74b, _0x3013af: 0xacf, _0x54b041: 0xd3c, _0x51dd1b: 0xa28, _0x317468: 0x993, _0x280dee: 0x746, _0x303362: 0xbea, _0x1873d0: 0x21a, _0x448bed: 0x4fe, _0xc9375f: 0xd27, _0x26ba7e: 0xcc1, _0x116549: 0x90a, _0x57c6cb: 0x660, _0x15b341: 0x4fd, _0x5cdd42: 0xacf, _0x18677f: 0x4d1, _0x39c56e: 0xd40, _0x6391b8: 0x469, _0x2abc2e: 0x582, _0xb3db4b: 0x71a, _0x39f6b0: 0x1b9, _0x254a51: 0x515, _0x37828c: 0xc08, _0x273c0d: 0x93c, _0x267fcf: 0x827, _0x59268e: 0xc91, _0x40cd84: 0xc21, _0x2d1858: 0x54d, _0x37169c: 0x968, _0x472095: 0x7de, _0x25d489: 0xc31, _0x452fd3: 0xacf, _0x508059: 0x7e5, _0x1cd761: 0x67e, _0x2a98d6: 0x175, _0x492f3c: 0xbc9, _0x3c8568: 0x496, _0x345c85: 0xacf, _0x44f618: 0x82b, _0x31e8ce: 0xd24, _0x964844: 0x356, _0x1de915: 0x69d, _0x4b3ccc: 0x4d2, _0x4c0bc9: 0x8ee, _0x10e734: 0x7f4, _0x2071e1: 0x9be, _0x9ee70c: 0x6f1, _0x1cb1a1: 0x364, _0x41ca09: 0x7f, _0x759fbf: 0xb2a, _0x42e63c: 0x8ba, _0x37d9f9: 0x9f4, _0x422822: 0xb43, _0x37ba6b: 0x4d3, _0x104333: 0x461, _0x30ceb9: 0x983, _0x277eea: 0xa28, _0x3aed0d: 0x879, _0x4033af: 0x13b, _0x1106d4: 0x247, _0x5ee1e1: 0x51e, _0x1550da: 0x7f2, _0x37a24c: 0x2b5, _0x496bde: 0x1f2, _0x41d4df: 0xa78, _0x4fedb0: 0xacf, _0xa7ac7b: 0xacf, _0xa96dc8: 0xacf, _0x3ed7c3: 0x8af, _0x44a312: 0xa9d, _0x5cd242: 0xa04, _0x1a9a21: 0xaf6, _0x36d604: 0x4cc, _0x329269: 0xacf, _0xdb6571: 0xa04, _0x53ad9c: 0xacf, _0x50bd9d: 0xc00, _0x4bb382: 0x686, _0xe11d83: 0x76f, _0x209de9: 0xaa5, _0x567a4c: 0x577, _0x243b5a: 0x6ca, _0xeb365f: 0x313, _0x121e5c: 0x29b, _0x4923e8: 0x34b, _0x4d4097: 0xcf8, _0x3de5ed: 0x1b9, _0x327342: 0x9a4, _0x18d005: 0x92b, _0x522f3a: 0x52a, _0x20708c: 0x10f, _0x57d28c: 0xacf, _0x362c1b: 0xacf, _0x3a9a6d: 0xacf, _0x38020f: 0xacf, _0xb6c78: 0x2ca, _0x43f0a8: 0xacf, _0x81a0c7: 0xacf, _0x6ac98e: 0xacf, _0x573a9a: 0x6fb, _0x1dfb42: 0x286, _0x1f3601: 0x8e2, _0x18695d: 0x817, _0x34bc79: 0xacf, _0x327c66: 0xacf, _0x363166: 0xb31, _0x5a0df1: 0xacf, _0x27cd68: 0x742, _0x52e414: 0xacf, _0x15e80e: 0xa28, _0x20f385: 0xacf, _0x3679c5: 0xacf, _0x25b151: 0x5da, _0x3755f2: 0xacf, _0x5ed82a: 0xcec, _0x224ba1: 0xa11, _0x4e25d4: 0x1ad, _0xa9bec4: 0xacf, _0x29a979: 0xd11, _0x364422: 0x2f8, _0x323dfe: 0xacf, _0x1a8e1a: 0xb6c, _0x6ae1b4: 0xacf, _0x2de0e8: 0x405, _0x335184: 0xc50, _0x44991c: 0xacf, _0x46895a: 0xb46, _0x2d1c9a: 0xacf, _0x3703fb: 0x9e2, _0x1cc0e9: 0xcd9, _0x57c196: 0x598, _0xa3db1c: 0xacf, _0xdeb3f9: 0x6ec, _0x31457a: 0xacf, _0x192f2a: 0xacf, _0x194712: 0xacf, _0x138bc9: 0x445, _0x219e28: 0xacf, _0x276e08: 0xb08, _0x1e288a: 0x389, _0x32dd98: 0xaca, _0x4d1911: 0xb51, _0x1634b2: 0x6d2, _0x34ca82: 0xd0a, _0x5bf117: 0x766, _0x54feb2: 0xabf, _0x28e7ca: 0xacf, _0x3a6b86: 0xacf, _0x1ca1fa: 0x372, _0x3c1343: 0x4a7, _0x5aa13b: 0x617, _0x115782: 0xacf, _0x3a5c39: 0xc3e, _0x56fc63: 0xacf, _0x258beb: 0xacf, _0x8dea73: 0xcfb, _0x4b1e82: 0xacf, _0x25648a: 0xc3b, _0x239974: 0xb2, _0x339f2a: 0x86e, _0x3f9a1d: 0xd7, _0x379a47: 0x1d0, _0x1eb1e4: 0x520, _0x296f41: 0x678, _0x38d9c8: 0xc3f, _0x435943: 0xacf, _0x97028b: 0x77a, _0x3c83e1: 0x803, _0x243aaf: 0x6d8, _0x274e14: 0x44f, _0xdf7b03: 0xb59, _0x4d8785: 0x790, _0x217cc6: 0x673, _0x2c89fe: 0xc8b, _0xa948a5: 0x2b0, _0x2487c1: 0x560, _0x169fbe: 0xacf, _0x3ed87d: 0x731, _0x59e3b6: 0x895, _0x422c96: 0x9e6, _0xd0f0a5: 0x560, _0x3e0588: 0x249, _0x50536f: 0xbd1, _0x4a78f1: 0x6d8, _0x2fd8c6: 0x77d, _0x593ea9: 0x9a1, _0x351a71: 0x17b, _0x7832e2: 0x560, _0x2e4295: 0xbc, _0x4f7c93: 0x4c6, _0xe7debe: 0x225, _0x28dadc: 0x7f1, _0x18d3e7: 0x47b, _0x3855b0: 0x92e, _0x3a8dc4: 0x599, _0x404b50: 0x95b, _0xe4840e: 0x823, _0x149ca5: 0x3ec, _0x4408f4: 0xc9, _0x119d38: 0x5da, _0x95e751: 0x8e5, _0xa40963: 0x16d, _0x11da14: 0x732, _0x4598b2: 0xaa, _0x34c8c3: 0x945, _0x4b8fd1: 0xada, _0x48239b: 0x2ce, _0x3d2fc5: 0x9ab, _0x1dc35e: 0x39b, _0x3b5774: 0xaf3, _0x2c3368: 0x1f0, _0x4f21c9: 0x453, _0x3385ee: 0x291, _0xeb5456: 0x932, _0x2dda4b: 0x58e, _0x187985: 0x2e5, _0x4468cd: 0xa0a, _0x4a0248: 0x25d, _0x38f569: 0x389, _0x222631: 0x7d2, _0x16cf61: 0x3e7, _0x9ad454: 0x27b, _0x788ff: 0x40d, _0x3ae989: 0x98c, _0x575368: 0xea, _0x1cd4c7: 0x93, _0x38a490: 0x8c4, _0x53a166: 0xaac, _0x312c90: 0x3ba, _0x4ec8b3: 0x7ae, _0x3d0bf8: 0x40f, _0x119649: 0x4da, _0x40b2e9: 0x503, _0x198806: 0x1a2, _0x58da79: 0x5c1, _0x28bc9a: 0x5ae, _0xbca749: 0x8bc, _0x2fe3b9: 0x776, _0x56489f: 0x700, _0x16e1fc: 0x734, _0x33fa9c: 0x418, _0x56863b: 0x98d, _0x6dc070: 0x805, _0x49fc09: 0x470, _0x3e113e: 0x9c0, _0x81c963: 0xa4, _0xe9b61e: 0xc3c, _0x241062: 0x255, _0x5000b8: 0x4ab, _0x5b1a32: 0x5cd, _0x266a7d: 0x956, _0x4991a7: 0xd0, _0x1e267e: 0x6f8, _0x3ef322: 0xbf6, _0x36fffd: 0xb69, _0x4e1798: 0x661, _0x37920a: 0xce1, _0x22ad62: 0x73f, _0x32d662: 0x562, _0x10ce66: 0xadf, _0x1ca654: 0x72c, _0x189359: 0x36e, _0xd87c73: 0xd5, _0x4be8c6: 0x8a9, _0x1612a8: 0x42f, _0x380e65: 0x115, _0x58c60d: 0xcfd, _0x229ac8: 0x30a, _0x37bd87: 0xc35, _0x181f22: 0x2a4, _0x791cd0: 0x7ff, _0x262288: 0x754, _0x545f1c: 0xacf, _0x1d0d32: 0x44e, _0x142bd7: 0x27c, _0x3bf52b: 0x9bd, _0x383a9c: 0x613, _0x34bfa5: 0x78a, _0x271765: 0xc2b, _0xabb7bb: 0xacf, _0x2d9212: 0xbc1, _0x1ae1b3: 0x65a, _0x4a9322: 0x542, _0x3be30b: 0x62a, _0x5a1cfb: 0x7f, _0x29ea24: 0x7f6, _0x4cff4d: 0x19b, _0x116685: 0x6da, _0x16820c: 0x178, _0x2208c7: 0x5d2, _0x2b0c6d: 0x96a, _0x3ee2fc: 0x1a1, _0xee68f6: 0x166, _0x385d92: 0xbbc, _0x531f11: 0x4c0, _0x656053: 0x9a3, _0xd437d3: 0xa98, _0x2f977f: 0x61c, _0x1335e6: 0xac2, _0xb74cc: 0xced, _0x1381ac: 0xc75, _0x35a36d: 0xd3e, _0x58eef7: 0xbc1, _0x1db093: 0x4b5, _0x17f22a: 0x15c, _0x2d2508: 0x744, _0x5afb09: 0xacf, _0x2044fd: 0x28d, _0x2cea04: 0x889, _0x326c02: 0xacf, _0x7e20ec: 0x517, _0x199ec3: 0x336, _0x3c931d: 0xa5, _0x3b11f9: 0x932, _0x4402a0: 0x8d3, _0x3cc9b8: 0xacf, _0xd0d12: 0xb66, _0x5aa016: 0x81, _0x461760: 0x39c, _0x5bd706: 0xc86, _0x527bd7: 0xacf, _0x515270: 0x4a2, _0x41b63d: 0xacf, _0x77680a: 0xa21, _0x146aaa: 0xacf, _0x3b272b: 0xacf, _0x550eb4: 0xacf, _0x1cae0a: 0xa18, _0x4e50a8: 0x7a4, _0x13c8e1: 0x520, _0x415200: 0xcea, _0x24bea1: 0x946, _0x439c10: 0x145, _0x1b0ff3: 0xc53, _0x53fed2: 0x1de, _0x4867ba: 0xacf, _0x3d0425: 0xb96, _0x1643d5: 0x852, _0x18db10: 0x136, _0x5a5f36: 0x38d, _0x1973c6: 0x1a3, _0x5f27c7: 0xac0, _0x491c6f: 0xcc0, _0x5a1956: 0x7f, _0xb47f26: 0xacf, _0x279f43: 0x96c, _0x326f71: 0x74a, _0x1db05d: 0x883, _0xb681bf: 0xab9, _0x1179fc: 0xcc8, _0xb52604: 0x347, _0x45d2dd: 0xb2d, _0x3cea60: 0xb2d, _0xe89a9b: 0xc16, _0x5a9236: 0xb97, _0x2f8000: 0xd3a, _0x369895: 0xac5, _0x40dd75: 0x2c6, _0x347849: 0x2aa, _0x48f62f: 0xacf, _0x1154dc: 0x123, _0x216288: 0xacf, _0x501a79: 0x2d8, _0x63b0e1: 0x60d, _0x43d2f6: 0x294, _0x5e0d85: 0xa4a, _0xa22bb8: 0x8fb, _0x55d756: 0xa04, _0x380c31: 0x29d, _0x489979: 0x116, _0x2ebfe7: 0x9ac, _0x308890: 0x468, _0x44a3f7: 0x185, _0x4b94bc: 0x306, _0x54b302: 0xbb, _0x4fb9c9: 0x807, _0x208159: 0xd13, _0x3a551f: 0x9e1, _0x5c6bfa: 0x1f1, _0x30db26: 0xbda, _0x3a91cf: 0x5db, _0x4ed096: 0x429, _0xbaa63b: 0xc8e, _0x1d6688: 0x306, _0xbc8388: 0xb2a, _0x312246: 0xc6e, _0x228a78: 0xd00, _0x40b997: 0xbc1, _0x56a053: 0x57d, _0x370019: 0xacf, _0x3891c8: 0x7a4, _0x49df27: 0xbc6, _0x2446f1: 0xcb3, _0x23c390: 0xacf, _0x258116: 0x341, _0x4810fc: 0x28f, _0x5dafe6: 0x97, _0x2fb674: 0xacf, _0x31fcf8: 0xacf, _0x213409: 0xacf, _0x15345a: 0xbbe, _0x5abae0: 0xacf, _0x10128d: 0x173, _0x570bb5: 0xacf, _0x52126f: 0xacf, _0xebde5d: 0x4f1, _0x1218f3: 0x8b9, _0x461294: 0x32c, _0x4e3dbc: 0x977, _0x4a8533: 0xacf, _0x1a2874: 0x30d, _0x115ab5: 0xbfd, _0x52baef: 0xacf, _0x223137: 0x314, _0xe2d337: 0x2ce, _0x27e01d: 0x438, _0x3074e8: 0x5f8, _0x212a66: 0x708, _0x34cf90: 0x42e, _0x1e7f91: 0x516, _0x1f68a0: 0x866, _0x6d33ee: 0x279, _0x3e7999: 0x744, _0x5344b5: 0x50b, _0x1f7879: 0x783, _0x4c5f50: 0x6cd, _0x33bd40: 0xb4f, _0x5c0dbe: 0x95c, _0x2b4a50: 0x7d0, _0x45b655: 0xa28, _0x181b8b: 0xd3f, _0x47c9ac: 0xc6, _0x4a1136: 0xaa6, _0xbdcb07: 0x98d, _0x423d4a: 0x42b, _0x1e16f4: 0x180, _0x36710c: 0x803, _0x1be6f0: 0xca2, _0x7275e4: 0x746, _0x230027: 0x94f, _0x4c8abe: 0x1b5, _0x50acba: 0x128, _0x334661: 0x636, _0x57763a: 0x746, _0x997c6c: 0x5f5, _0xd267b1: 0x666, _0x8f5087: 0x69b, _0x47b62e: 0x17b, _0x120a2a: 0x26b, _0x3aad2c: 0xacf, _0x15ec22: 0x306, _0x5a08d8: 0x48b, _0x4cfec8: 0xbe1, _0xb8e7b7: 0x3c8, _0x3f58b9: 0x8ae, _0x1cfbbc: 0xacf, _0x1e3ed8: 0x91f, _0x4c38dd: 0x9ac, _0x37d131: 0x2b0, _0x48042c: 0x6e8, _0x59e620: 0x576, _0x6209ef: 0x56e, _0x4e1e47: 0xa8c, _0x386e60: 0xacf, _0x208068: 0xacf, _0x103ba1: 0x7ff, _0x26511e: 0x17f, _0x1c4001: 0xae7, _0x535898: 0x960, _0x479853: 0x60b, _0x2c45a3: 0x306, _0x575ca8: 0xa93, _0x2c78a0: 0xacf, _0x484b22: 0xb17, _0x4af433: 0x76a, _0x4cbf8a: 0x7d9, _0xe61ce5: 0xafa, _0x47ddf2: 0x354, _0x5b5e44: 0x70e, _0x552ce4: 0x105, _0x1f3375: 0xacf, _0x2d5990: 0x396, _0x3979f9: 0x17a, _0x5e804f: 0x326, _0x46bf40: 0x932, _0x5cac09: 0xacf, _0x22a2c9: 0x7f0, _0x1e9ccc: 0x71c, _0x59c1f9: 0xa16, _0x3070d8: 0xacf, _0x235a2b: 0x73b, _0x491926: 0x579, _0x342bc3: 0x2f3, _0x5855f2: 0xc38, _0x38f6b5: 0x572, _0x329e24: 0x56f, _0xabd7c1: 0x38e, _0x1b2518: 0x813, _0x38ccc1: 0x9da, _0x5c75ed: 0xacf, _0xc08b06: 0x5ed, _0x5e0493: 0xabb, _0x539704: 0x184, _0x11d18f: 0x7d3, _0x375bed: 0x7e0, _0x3fda53: 0x5e4, _0x3bccc3: 0x520, _0x4060f0: 0x69c, _0x212faa: 0x97e, _0x19234c: 0x352, _0x1789fe: 0xacf, _0x79f2a3: 0x83a, _0x33b324: 0x1e3, _0x55ddb9: 0xacf, _0x3b62ba: 0x130, _0x2413b4: 0xc29 }, _0x2ae777 = { _0x1d5763: 0x615, _0x216ea0: 0xbe6, _0x3ecab4: 0x994 }, _0x2d61ef = _0x4bda12; if (AnimationEditorWindow && !AnimationEditorWindow[_0x2d61ef(_0x353f4c._0x174c1f)]) { AnimationEditorWindow[_0x2d61ef(0x18d)](); return; } AnimationEditorWindow = window[_0x2d61ef(_0x353f4c._0xb8c847)]('about:blan' + 'k', _0x2d61ef(0x340), 'width=1000' + ',height=84' + '6'); if (AnimationEditorWindow) { if (_0x2d61ef(_0x353f4c._0x29e73e) !== 'RGEiG') { _0x138dba['focus'](); return; } else { AnimationEditorWindow['document']['write']('\x0a\x20\x20\x20\x20\x20\x20\x20\x20<' + 'head>\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20<t' + _0x2d61ef(_0x353f4c._0x30a85d) + 'uilder\x20Edi' + 'tor</title' + '>\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20<style' + '>\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x954) + 'zing:\x20bord' + 'er-box;\x20ma' + 'rgin:\x200;\x20p' + 'adding:\x200;' + '\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20:root\x20{\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0xeb0a8d) + 'e3a2f;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20-' + '-surface:\x20' + _0x2d61ef(0xdf) + _0x2d61ef(_0x353f4c._0x5ddfcf) + _0x2d61ef(_0x353f4c._0x37c849) + '-2:\x20#29292' + '9;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20--sur' + 'face-3:\x20#4' + '94949;\x0a\x20\x20\x20' + _0x2d61ef(_0x353f4c._0xaa9197) + '-text:\x20#e8' + 'e8e8;\x0a\x20\x20\x20\x20' + _0x2d61ef(0x548) + 'text-muted' + _0x2d61ef(0xc12) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20--text-' + 'faint:\x20#55' + '5;\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x165) + 'ent:\x20#ff98' + _0x2d61ef(0x7e9) + '\x20\x20\x20\x20\x20\x20--ac' + 'cent-soft:' + '\x20rgba(255,' + _0x2d61ef(0x9d) + ');\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x410) + _0x2d61ef(0xb42) + '\x2012px\x20rgba' + '(0,0,0,0.4' + ');\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x410) + 'dow-sm:\x200\x20' + '1px\x204px\x20rg' + 'ba(0,0,0,0' + '.3);\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20--r' + _0x2d61ef(_0x353f4c._0x288a98) + 'x;\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x2dc) + 'ius-sm:\x208p' + _0x2d61ef(0xace) + '\x20\x20\x20\x20\x20--mon' + 'o:\x20\x27Inter\x27' + ',\x20system-u' + 'i,\x20sans-se' + 'rif;\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20body\x20{' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x91d) + 'mily:\x20var(' + '--mono);\x0a\x20' + _0x2d61ef(0xacf) + '\x20backgroun' + 'd:\x20var(--b' + 'g);\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x47c9b3) + 'r:\x20var(--t' + 'ext);\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20mi' + _0x2d61ef(0x1c7) + _0x2d61ef(0xc84) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20p' + 'adding:\x2020' + 'px;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20font' + '-size:\x2013p' + _0x2d61ef(_0x353f4c._0x2f525b) + '\x20\x20\x20\x20\x20-webk' + _0x2d61ef(0x8f3) + _0x2d61ef(_0x353f4c._0x2cc55b) + _0x2d61ef(0x273) + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '}\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + 'body::befo' + _0x2d61ef(0x535) + '\x20\x20\x20\x20\x20\x20\x20con' + 'tent:\x20\x27\x27;\x0a' + ('\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x72b373) + ':\x20fixed;\x0a\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0xb9f) + _0x2d61ef(_0x353f4c._0x14c914) + 'ght:\x200;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'height:\x2050' + 'vh;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20back' + 'ground-col' + 'or:\x20#0d221' + '8;\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x5d6) + 'round-imag' + 'e:\x20linear-' + 'gradient(1' + '35deg,\x20#06' + '1209\x2025%,\x20' + _0x2d61ef(0x358) + _0x2d61ef(0x9f9) + _0x2d61ef(0xb6e) + 'ent(225deg' + ',\x20#061209\x20' + _0x2d61ef(_0x353f4c._0x4b6aa0) + _0x2d61ef(_0x353f4c._0x33976c) + _0x2d61ef(_0x353f4c._0x8c8c5e) + 'gradient(4' + '5deg,\x20#061' + '209\x2025%,\x20t' + 'ransparent' + '\x2025%),\x20lin' + 'ear-gradie' + _0x2d61ef(_0x353f4c._0x1836ec) + '\x20#061209\x202' + '5%,\x20#0d221' + '8\x2025%);\x0a\x20\x20' + _0x2d61ef(_0x353f4c._0x4200c7) + 'background' + '-position:' + _0x2d61ef(0x536) + '9px\x200,\x200\x200' + ',\x200\x200;\x0a\x20\x20\x20' + _0x2d61ef(0x8b8) + _0x2d61ef(_0x353f4c._0xa6eba9) + _0x2d61ef(_0x353f4c._0x4d1ab4) + '\x2039px;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20b' + 'ackground-' + _0x2d61ef(0x688) + 'peat;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20op' + 'acity:\x200.2' + _0x2d61ef(_0x353f4c._0x257b11) + '\x20\x20\x20\x20\x20-webk' + 'it-mask-im' + _0x2d61ef(0x854) + 'r-gradient' + '(to\x20bottom' + ',\x20black\x200%' + ',\x20transpar' + _0x2d61ef(_0x353f4c._0x57c87d) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xbf0) + 'ge:\x20linear' + '-gradient(' + _0x2d61ef(0x28b) + '\x20black\x200%,' + _0x2d61ef(_0x353f4c._0x3e0e9d) + 'nt\x2030%);\x0a\x20' + _0x2d61ef(_0x353f4c._0x2d2c91) + '\x20pointer-e' + 'vents:\x20non' + _0x2d61ef(_0x353f4c._0x2e330e) + _0x2d61ef(_0x353f4c._0x5c5a99) + 'ex:\x200;\x0a\x20\x20\x20' + _0x2d61ef(0xc22) + _0x2d61ef(_0x353f4c._0x323c12) + ':-webkit-s' + _0x2d61ef(0x8e) + '\x20width:\x206p' + 'x;\x20}\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(0x6d5) + 'webkit-scr' + 'ollbar-tra' + 'ck\x20{\x20backg' + _0x2d61ef(_0x353f4c._0x38bfda) + _0x2d61ef(0x896) + '}\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + 'body::-web' + 'kit-scroll' + 'bar-thumb\x20' + '{\x20backgrou' + 'nd:\x20#444;\x20' + 'border-rad' + 'ius:\x203px;\x20' + '}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20.containe' + 'r,\x20h1,\x20.in') + ('fo-text,\x20.' + 'three-colu' + 'mn-layout\x20' + '{\x20position' + ':\x20relative' + ';\x20z-index:' + '\x201;\x20}\x0a\x0a\x20\x20\x20' + _0x2d61ef(0x66b) + 'ainer\x20{\x0a\x20\x20' + _0x2d61ef(0xacf) + 'background' + ':\x20var(--su' + 'rface-2);\x0a' + _0x2d61ef(0xacf) + '\x20\x20max-widt' + 'h:\x201220px;' + _0x2d61ef(0xa28) + _0x2d61ef(_0x353f4c._0xf73362) + '\x200\x20auto;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20border-ra' + _0x2d61ef(_0x353f4c._0xd03ca9) + _0x2d61ef(_0x353f4c._0x299bc4) + '\x20\x20\x20\x20paddin' + 'g:\x2018px;\x0a\x20' + _0x2d61ef(0xacf) + '\x20box-shado' + 'w:\x20var(--s' + 'hadow);\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20h1\x20' + '{\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20text-a' + 'lign:\x20cent' + 'er;\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x364fc7) + '-size:\x2015p' + 'x;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20font-' + 'weight:\x2060' + _0x2d61ef(0xc2) + _0x2d61ef(_0x353f4c._0x38fc04) + _0x2d61ef(0x3d2) + _0x2d61ef(_0x353f4c._0x238b37) + '\x20\x20\x20\x20\x20\x20\x20let' + _0x2d61ef(0x141) + _0x2d61ef(0xed) + _0x2d61ef(0xa28) + '\x20\x20\x20margin-' + _0x2d61ef(_0x353f4c._0x814d2) + _0x2d61ef(0xcc9) + '\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '.info-text' + '\x20{\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20font-' + 'size:\x2011px' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20color:' + '\x20var(--tex' + 't-muted);\x0a' + _0x2d61ef(_0x353f4c._0x2d2c91) + _0x2d61ef(_0x353f4c._0x8e32a8) + 'ottom:\x2014p' + 'x;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20paddi' + 'ng:\x208px\x2014' + 'px;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20back' + 'ground:\x20va' + 'r(--surfac' + 'e);\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x46e66b) + 'er-radius:' + _0x2d61ef(_0x353f4c._0x23a027) + 'ius-sm);\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20text-alig' + 'n:\x20center;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xcf6) + 'dow:\x20var(-' + '-shadow-sm' + _0x2d61ef(_0x353f4c._0x53435d) + _0x2d61ef(0x813) + '\x20\x20.three-c' + 'olumn-layo' + 'ut\x20{\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20dis' + 'play:\x20grid' + _0x2d61ef(_0x353f4c._0x299bc4) + '\x20\x20\x20\x20grid-t' + 'emplate-co' + 'lumns:\x201fr' + _0x2d61ef(_0x353f4c._0x36a97f) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20gap:\x2010p' + 'x;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20.column\x20' + _0x2d61ef(0x932)) + ('\x20\x20\x20\x20backgr' + 'ound:\x20var(' + '--surface)' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20border' + _0x2d61ef(_0x353f4c._0x46848c) + 'ar(--radiu' + 's);\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20padd' + 'ing:\x2014px;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20max-hei' + 'ght:\x20700px' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0xb5d4d5) + _0x2d61ef(0xb12) + _0x2d61ef(0x306) + '\x20\x20\x20\x20box-sh' + 'adow:\x20var(' + _0x2d61ef(0x596) + 'm);\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20}\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x478) + ':-webkit-s' + 'crollbar\x20{' + '\x20width:\x204p' + 'x;\x20}\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20.column' + _0x2d61ef(0xc55) + 'scrollbar-' + 'track\x20{\x20ba' + _0x2d61ef(0xb07) + _0x2d61ef(_0x353f4c._0x462260) + 't;\x20}\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20.column' + '::-webkit-' + 'scrollbar-' + _0x2d61ef(_0x353f4c._0x182068) + _0x2d61ef(_0x353f4c._0x4aa5ae) + '#444;\x20bord' + 'er-radius:' + '\x202px;\x20}\x0a\x0a\x20' + _0x2d61ef(_0x353f4c._0x3a58ac) + 'lumn\x20h3\x20{\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20margin-b' + _0x2d61ef(0xae2) + _0x2d61ef(_0x353f4c._0x5bed0d) + _0x2d61ef(0x592) + ':\x20var(--te' + 'xt-muted);' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20font-si' + 'ze:\x2010px;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20font-wei' + 'ght:\x20600;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20letter-s' + 'pacing:\x200.' + _0x2d61ef(0xbce) + _0x2d61ef(0xab3) + 't-transfor' + 'm:\x20upperca' + 'se;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20text' + _0x2d61ef(_0x353f4c._0x6298f8) + _0x2d61ef(0xb70) + '\x20\x20\x20\x20\x20\x20bord' + _0x2d61ef(_0x353f4c._0x55ab00) + '\x201px\x20solid' + _0x2d61ef(_0x353f4c._0x361177) + _0x2d61ef(_0x353f4c._0x1569fa) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20padding-b' + _0x2d61ef(0xf6) + 'x;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20margi' + 'n-top:\x200;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20}\x0a' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20.' + 'column\x20h4\x20' + _0x2d61ef(0x932) + '\x20\x20\x20\x20color:' + '\x20var(--tex' + 't-muted);\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x2e9f98) + _0x2d61ef(0x16a) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20font-weig' + 'ht:\x20600;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x457) + 'acing:\x200.8' + 'px;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20text' + '-transform' + ':\x20uppercas' + 'e;\x0a\x20\x20\x20\x20\x20\x20\x20') + ('\x20\x20\x20\x20\x20borde' + 'r-bottom:\x20' + '1px\x20solid\x20' + 'var(--surf' + _0x2d61ef(0xcc7) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x436) + _0x2d61ef(_0x353f4c._0x520153) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1c47a9) + _0x2d61ef(_0x353f4c._0x334d2f) + '0;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20.section' + '-title\x20{\x0a\x20' + _0x2d61ef(0xacf) + '\x20color:\x20va' + 'r(--text-m' + 'uted);\x0a\x20\x20\x20' + _0x2d61ef(0x54d) + 'ont-size:\x20' + '10px;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20fo' + 'nt-weight:' + '\x20600;\x0a\x20\x20\x20\x20' + _0x2d61ef(0x7a9) + _0x2d61ef(_0x353f4c._0xe0d07b) + 'ng:\x200.8px;' + _0x2d61ef(0xa28) + _0x2d61ef(0x6a3) + 'ansform:\x20u' + _0x2d61ef(0x46e) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20border-b' + _0x2d61ef(_0x353f4c._0x2cc220) + '\x20solid\x20var' + '(--surface' + '-3);\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20pad' + _0x2d61ef(0x550) + 'm:\x208px;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'margin:\x200\x20' + '0\x2012px\x200;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20}\x0a' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20.' + 'btn\x20{\x20bord' + _0x2d61ef(_0x353f4c._0x3418ea) + 'border-rad' + 'ius:\x20var(-' + '-radius-sm' + ');\x20cursor:' + '\x20pointer;\x20' + 'font-size:' + '\x2011px;\x20fon' + 't-weight:\x20' + '600;\x20font-' + 'family:\x20va' + 'r(--mono);' + _0x2d61ef(_0x353f4c._0x3f2dae) + '8px\x2016px;\x20' + 'transition' + _0x2d61ef(_0x353f4c._0x1060db) + '0.15s;\x20}\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20.bt' + _0x2d61ef(_0x353f4c._0x1ca48f) + _0x2d61ef(_0x353f4c._0x55abda) + '.85;\x20}\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20.btn-' + 'primary\x20{\x20' + 'background' + ':\x20var(--ac' + 'cent);\x20col' + 'or:\x20#fff;\x20' + '}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20.header\x20{' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20positio' + _0x2d61ef(_0x353f4c._0x1069f4) + _0x2d61ef(0xa73) + '\x20\x20\x20\x20\x20text-' + 'align:\x20cen' + 'ter;\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20mar' + 'gin-bottom' + ':\x2015px;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20}\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20.hea' + _0x2d61ef(_0x353f4c._0x1b307e) + 'ont-size:\x20' + '20px;\x20colo' + 'r:\x20var(--t' + _0x2d61ef(_0x353f4c._0x4b2044) + '-weight:\x206' + '00;\x20letter' + _0x2d61ef(_0x353f4c._0x42ce45) + '-0.3px;\x20ma' + 'rgin-botto' + 'm:\x202px;\x20}\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20.h') + ('eader\x20p\x20{\x20' + 'color:\x20var' + '(--text-mu' + _0x2d61ef(0x5e8) + _0x2d61ef(0x9d7) + 'x;\x20}\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20.header' + '\x20a\x20{\x20color' + _0x2d61ef(0x4b8) + _0x2d61ef(_0x353f4c._0x1d6e9c) + 't-decorati' + 'on:\x20none;\x20' + _0x2d61ef(_0x353f4c._0xc0f6de) + _0x2d61ef(0x712) + _0x2d61ef(0x9b5) + 'xt-decorat' + _0x2d61ef(_0x353f4c._0xc11f9a) + 'line;\x20}\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20.hea' + 'der-help-b' + 'tn\x20{\x20posit' + 'ion:\x20absol' + 'ute;\x20right' + ':\x200;\x20top:\x20' + '50%;\x20trans' + _0x2d61ef(_0x353f4c._0x50f2c5) + 'slateY(-50' + '%);\x20}\x0a\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20.prev' + _0x2d61ef(_0x353f4c._0x281143) + '-container' + _0x2d61ef(_0x353f4c._0x4b9865) + _0x2d61ef(_0x353f4c._0x3e6fb1) + _0x2d61ef(_0x353f4c._0x33716b) + '1;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20borde' + 'r:\x201.5px\x20s' + _0x2d61ef(_0x353f4c._0x1b3c8d) + _0x2d61ef(0xa28) + '\x20\x20\x20border-' + _0x2d61ef(_0x353f4c._0x3b4c81) + _0x2d61ef(0x351) + _0x2d61ef(_0x353f4c._0x5746c8) + '\x20\x20\x20\x20\x20displ' + 'ay:\x20flex;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20align-it' + _0x2d61ef(_0x353f4c._0xd80341) + 'r;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20justi' + _0x2d61ef(0x508) + _0x2d61ef(0x2df) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20min-widt' + 'h:\x20400px;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20min-heig' + _0x2d61ef(0x5e5) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xa79) + _0x2d61ef(0xb90) + '\x20\x20\x20\x20\x20\x20\x20\x20as' + 'pect-ratio' + _0x2d61ef(_0x353f4c._0x3c4320) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'position:\x20' + _0x2d61ef(0x1dd) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20overflow' + _0x2d61ef(_0x353f4c._0x5c8685) + '\x20\x20\x20\x20\x20\x20\x20\x20}\x0a' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20.' + 'preview-bg' + _0x2d61ef(_0x353f4c._0x297dd3) + _0x2d61ef(_0x353f4c._0x5ddfcf) + _0x2d61ef(_0x353f4c._0x72b373) + ':\x20absolute' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20top:\x201' + _0x2d61ef(_0x353f4c._0x43312c) + '\x20\x20\x20\x20\x20\x20\x20rig' + _0x2d61ef(_0x353f4c._0x2f5792) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20display:' + _0x2d61ef(0xa2c) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20g' + _0x2d61ef(_0x353f4c._0x3ce57e) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20z-index:\x20' + '10;\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0xb11ff0) + _0x2d61ef(0x3f7) + _0x2d61ef(0x7db) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x54c) + 'px;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20heig' + 'ht:\x2020px;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20border-r') + ('adius:\x204px' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20border' + _0x2d61ef(_0x353f4c._0x3b373e) + 'd\x20#fff;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x60e) + 'inter;\x0a\x20\x20\x20' + _0x2d61ef(0x477) + 'adding:\x200;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20box-sha' + 'dow:\x200\x201px' + _0x2d61ef(0x953) + '0,\x200,\x200,\x200' + '.5);\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(0x496) + '\x20\x20\x20.bg-tog' + _0x2d61ef(_0x353f4c._0x1e3be6) + 'ver\x20{\x20opac' + 'ity:\x200.85;' + _0x2d61ef(_0x353f4c._0x5d0d1b) + '\x20.bg-toggl' + 'e-btn.acti' + _0x2d61ef(0x3a5) + _0x2d61ef(_0x353f4c._0x522ebd) + 'lid\x20var(--' + 'accent);\x20o' + _0x2d61ef(_0x353f4c._0x57cb9e) + _0x2d61ef(_0x353f4c._0x3ccd98) + '}\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '.bg-toggle' + _0x2d61ef(_0x353f4c._0x3c2f18) + 'ackground:' + '\x20#000;\x20}\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20.bg' + '-toggle-wh' + 'ite\x20{\x20back' + 'ground:\x20#f' + _0x2d61ef(_0x353f4c._0x387d7e) + _0x2d61ef(_0x353f4c._0x11c0bd) + _0x2d61ef(_0x353f4c._0xb7a072) + '\x20var(--tex' + 't)\x20!import' + _0x2d61ef(0x9fe) + _0x2d61ef(0xadc) + 'r(--mono)\x20' + '!important' + ';\x20}\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xe6) + _0x2d61ef(0xa9f) + 'lor:\x20var(-' + '-text)\x20!im' + 'portant;\x20b' + _0x2d61ef(_0x353f4c._0x517255) + '\x20#2a2a2a\x20!' + _0x2d61ef(_0x353f4c._0x41831e) + _0x2d61ef(0x813) + _0x2d61ef(_0x353f4c._0x4eee6b) + 'pe=\x22text\x22]' + ',\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3eed4b) + '=\x22number\x22]' + ',\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + 'input[type' + '=\x22search\x22]' + ',\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + 'select:not' + _0x2d61ef(0xb1c) + 'display:\x20n' + 'one\x22])\x20{\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20backgroun' + _0x2d61ef(0x82) + '\x20!importan' + _0x2d61ef(0xcb1) + '\x20\x20\x20\x20\x20borde' + _0x2d61ef(_0x353f4c._0x14c96a) + _0x2d61ef(0xa10) + '!important' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1a8c89) + _0x2d61ef(_0x353f4c._0x2fd200) + 'ar(--radiu' + 's-sm)\x20!imp' + _0x2d61ef(0x74d) + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x31898e) + '(--text)\x20!' + _0x2d61ef(0x843) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20font-fa' + 'mily:\x20var(' + '--mono)\x20!i' + 'mportant;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x705) + 'e:\x2011px\x20!i' + _0x2d61ef(_0x353f4c._0x3dcf9c) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20') + ('\x20\x20padding:' + '\x205px\x209px\x20!' + _0x2d61ef(_0x353f4c._0x2b7921) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xcf6) + 'dow:\x20inset' + '\x200\x201px\x203px' + '\x20rgba(0,0,' + _0x2d61ef(_0x353f4c._0x19bab7) + 'portant;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xf8) + 'n:\x20border-' + 'color\x200.15' + 's;\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x28a661) + '\x20input[typ' + 'e=\x22text\x22]:' + _0x2d61ef(_0x353f4c._0x4c336e) + '\x20\x20\x20\x20\x20input' + '[type=\x22num' + 'ber\x22]:focu' + _0x2d61ef(0x838) + '\x20select:fo' + 'cus\x20{\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20ou' + _0x2d61ef(0xf7) + _0x2d61ef(0x69a) + 'nt;\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x42c) + 'er-color:\x20' + _0x2d61ef(0xd1e) + 'nt)\x20!impor' + 'tant;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20bo' + 'x-shadow:\x20' + 'inset\x200\x201p' + 'x\x203px\x20rgba' + '(0,0,0,0.0' + '4),\x200\x200\x200\x20' + _0x2d61ef(0xb53) + 'accent-sof' + _0x2d61ef(0xa36) + _0x2d61ef(0x151) + '\x20\x20\x20}\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x2cab63) + 'ype=\x22color' + '\x22]\x20{\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20bac' + 'kground:\x20#' + '2a2a2a\x20!im' + 'portant;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20border:\x201' + '.5px\x20solid' + '\x20#444\x20!imp' + 'ortant;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'border-rad' + 'ius:\x20var(-' + _0x2d61ef(0x106) + ')\x20!importa' + 'nt;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20curs' + 'or:\x20pointe' + _0x2d61ef(0x7b5) + '\x20\x20\x20\x20\x20heigh' + _0x2d61ef(_0x353f4c._0x3d031b) + '\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20.f' + 'ield\x20{\x20mar' + 'gin-bottom' + _0x2d61ef(_0x353f4c._0x22f90a) + '\x20\x20\x20\x20\x20\x20\x20.fi' + _0x2d61ef(_0x353f4c._0x361056) + _0x2d61ef(0x932) + _0x2d61ef(_0x353f4c._0x9ed416) + 'y:\x20block;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20margin-b' + 'ottom:\x203px' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20font-w' + 'eight:\x20500' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20font-s' + 'ize:\x2010px;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20color:\x20' + _0x2d61ef(_0x353f4c._0x2fb81f) + '-muted);\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x5ae93f) + _0x2d61ef(0xd1d) + 'px;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20}\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20.field\x20l' + 'abel[style' + '*=\x22flex\x22]\x20' + '{\x20margin-b') + (_0x2d61ef(_0x353f4c._0x28db70) + '}\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '.field\x20inp' + 'ut[type=\x22c' + 'heckbox\x22]\x20' + _0x2d61ef(_0x353f4c._0x203892) + 'uto;\x20curso' + _0x2d61ef(0xc8f) + ';\x20accent-c' + _0x2d61ef(0x9d9) + _0x2d61ef(0x4fc) + _0x2d61ef(0x7e5) + _0x2d61ef(_0x353f4c._0x5df313) + _0x2d61ef(_0x353f4c._0x2c2958) + 'range\x22]\x20{\x0a' + _0x2d61ef(0xacf) + '\x20\x20padding:' + '\x200;\x20height' + _0x2d61ef(_0x353f4c._0x482879) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20a' + 'ccent-colo' + 'r:\x20var(--a' + 'ccent);\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x46d007) + _0x2d61ef(0x646) + 'ant;\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20box' + '-shadow:\x20n' + 'one\x20!impor' + 'tant;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20ba' + 'ckground:\x20' + 'transparen' + _0x2d61ef(0xd1a) + 'nt;\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x22b) + 'in-top:\x206p' + _0x2d61ef(_0x353f4c._0x5bed0d) + '\x20}\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20.field\x20in' + 'put,\x20.fiel' + 'd\x20select\x20{' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20width:\x20' + '100%;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20pa' + 'dding:\x205px' + _0x2d61ef(0x137) + '\x20\x20\x20\x20\x20\x20\x20\x20bo' + 'rder:\x201.5p' + 'x\x20solid\x20#4' + _0x2d61ef(_0x353f4c._0x3c1213) + '\x20\x20\x20\x20\x20\x20bord' + 'er-radius:' + '\x20var(--rad' + 'ius-sm);\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x7e618) + _0x2d61ef(_0x353f4c._0x196dc0) + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20color:' + '\x20var(--tex' + 't);\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20font' + _0x2d61ef(0x9d7) + 'x;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20font-' + _0x2d61ef(_0x353f4c._0x38c7a1) + 'r(--mono);' + _0x2d61ef(0xcc9) + _0x2d61ef(_0x353f4c._0x501abd) + 'field\x20inpu' + 't:focus,\x20.' + 'field\x20sele' + 'ct:focus\x20{' + _0x2d61ef(_0x353f4c._0x560a4e) + '\x20\x20\x20outline' + ':\x20none;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'border-col' + 'or:\x20var(--' + 'accent);\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xcd3) + 'w:\x200\x200\x200\x203' + 'px\x20var(--a' + 'ccent-soft' + ');\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20}\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20.field\x20bu' + _0x2d61ef(0xc72) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20w' + 'idth:\x20100%' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20border' + ':\x20none;\x0a\x20\x20' + _0x2d61ef(0xacf) + 'border-rad' + 'ius:\x20var(-') + (_0x2d61ef(_0x353f4c._0x3cc555) + ');\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x1ca) + 'r:\x20pointer' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20font-s' + 'ize:\x2011px;' + _0x2d61ef(0xa28) + _0x2d61ef(0xaad) + _0x2d61ef(_0x353f4c._0x56ac63) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20font-fa' + _0x2d61ef(0xc62) + _0x2d61ef(0x2cf) + _0x2d61ef(_0x353f4c._0x4200c7) + _0x2d61ef(_0x353f4c._0x3f2dae) + '8px;\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20tra' + 'nsition:\x20o' + 'pacity\x200.1' + '5s;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20}\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x121) + _0x2d61ef(_0x353f4c._0xdc6b83) + _0x2d61ef(0xcae) + 'y:\x200.85;\x20}' + '\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '.save-butt' + 'on\x20{\x20backg' + 'round:\x20var' + '(--accent)' + ';\x20color:\x20#' + 'fff;\x20}\x0a\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1c84b5) + '-button:ho' + _0x2d61ef(_0x353f4c._0x16d326) + 'ground:\x20#e' + '68900;\x20opa' + _0x2d61ef(0xb0f) + '\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '.file-box\x20' + '{\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x114) + _0x2d61ef(_0x353f4c._0x3c66c7) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20p' + _0x2d61ef(_0x353f4c._0x1f564e) + 'px\x2012px;\x0a\x20' + _0x2d61ef(_0x353f4c._0x5ddfcf) + '\x20backgroun' + 'd:\x20#353434' + _0x2d61ef(0x306) + '\x20\x20\x20\x20border' + ':\x201.5px\x20da' + 'shed\x20#555;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3ecc54) + _0x2d61ef(0x918) + 'r(--radius' + _0x2d61ef(_0x353f4c._0x5c00d1) + '\x20\x20\x20\x20\x20\x20\x20\x20di' + 'splay:\x20fle' + 'x;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20align' + '-items:\x20ce' + 'nter;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20ju' + 'stify-cont' + 'ent:\x20cente' + 'r;\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x72503c) + _0x2d61ef(_0x353f4c._0x2df3ff) + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20font-s' + 'ize:\x2011px;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20color:\x20' + 'var(--text' + '-muted);\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20text-alig' + 'n:\x20center;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20min-hei' + _0x2d61ef(0x4cf) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xc33) + _0x2d61ef(_0x353f4c._0x3b2db6) + 'r-color\x200.' + _0x2d61ef(0x692) + '\x20\x20\x20}\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20.file-b' + 'ox:hover\x20{' + '\x20border-co' + 'lor:\x20var(-' + '-accent);\x20' + 'color:\x20var' + '(--text);\x20' + '}\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x28974b) + 'has-file\x20{') + ('\x20border-st' + 'yle:\x20solid' + _0x2d61ef(0xadb) + 'olor:\x20var(' + _0x2d61ef(_0x353f4c._0x4b1ee2) + '\x20color:\x20va' + 'r(--accent' + ');\x20font-we' + 'ight:\x20600;' + _0x2d61ef(_0x353f4c._0x2ddec6) + _0x2d61ef(_0x353f4c._0x5203b0) + 'pe=\x22file\x22]' + '\x20{\x20display' + _0x2d61ef(_0x353f4c._0x25d604) + _0x2d61ef(0xb0b) + 'library-mo' + _0x2d61ef(_0x353f4c._0x332a61) + '\x20\x20\x20\x20\x20\x20\x20\x20di' + 'splay:\x20non' + 'e;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20posit' + 'ion:\x20fixed' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x119a7d) + _0x2d61ef(_0x353f4c._0x491832) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20width:\x20' + '100vw;\x20hei' + 'ght:\x20100vh' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x57dfa5) + 'ound:\x20rgba' + '(0,0,0,0.8' + _0x2d61ef(0x2ce) + '\x20\x20\x20\x20\x20z-ind' + 'ex:\x201000;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20overflow' + _0x2d61ef(_0x353f4c._0x1c7ccc) + _0x2d61ef(0x664) + '\x20\x20\x20\x20\x20\x20\x20\x20.l' + 'ibrary-mod' + 'al.active\x20' + '{\x20display:' + '\x20block;\x20}\x0a' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20.' + 'library-co' + 'ntent\x20{\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x144486) + ':\x20var(--su' + 'rface-2);\x0a' + _0x2d61ef(0xacf) + '\x20\x20margin:\x20' + '50px\x20auto;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20padding' + _0x2d61ef(_0x353f4c._0x3daf1c) + _0x2d61ef(0xacf) + 'border-rad' + 'ius:\x20var(-' + '-radius);\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x860) + _0x2d61ef(0x511) + _0x2d61ef(0xacf) + '\x20\x20box-shad' + _0x2d61ef(0x9d4) + 'shadow);\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20.l' + 'ibrary-hea' + 'der\x20{\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20di' + 'splay:\x20fle' + 'x;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20justi' + _0x2d61ef(0x508) + ':\x20space-be' + 'tween;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20a' + 'lign-items' + ':\x20center;\x0a' + _0x2d61ef(0xacf) + '\x20\x20margin-b' + _0x2d61ef(_0x353f4c._0x2ec91e) + 'x;\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xbb5) + 'ng-bottom:' + '\x2015px;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20b' + _0x2d61ef(_0x353f4c._0x6ecca6) + _0x2d61ef(0x4db) + _0x2d61ef(_0x353f4c._0x4415aa) + 'surface-3)' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '}\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '.library-h' + _0x2d61ef(_0x353f4c._0x118025) + _0x2d61ef(0x6ff)) + (_0x2d61ef(0x182) + _0x2d61ef(_0x353f4c._0x2df993) + 't);\x20font-s' + 'ize:\x2014px;' + '\x20font-weig' + _0x2d61ef(0x70d) + 'etter-spac' + _0x2d61ef(_0x353f4c._0x4382a7) + ';\x20}\x0a\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x31c4fc) + _0x2d61ef(0x275) + _0x2d61ef(0x3e8) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'background' + ':\x20var(--su' + _0x2d61ef(0x4a8) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20color:\x20v' + 'ar(--text)' + _0x2d61ef(0x306) + '\x20\x20\x20\x20border' + ':\x20none;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'padding:\x207' + 'px\x2014px;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x109) + 'dius:\x20var(' + '--radius-s' + 'm);\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x20aa2c) + 'or:\x20pointe' + 'r;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20font-' + _0x2d61ef(_0x353f4c._0xc26b25) + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x75a) + 'eight:\x20600' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20font-f' + 'amily:\x20var' + '(--mono);\x0a' + _0x2d61ef(0xacf) + '\x20\x20transiti' + _0x2d61ef(_0x353f4c._0x299b4a) + 'ound\x200.15s' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '}\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '.remove-sp' + _0x2d61ef(0x2c4) + 'on:hover\x20{' + _0x2d61ef(_0x353f4c._0x176580) + 'd:\x20#555;\x20}' + _0x2d61ef(0xa1f) + '.close-lib' + _0x2d61ef(_0x353f4c._0x5044e2) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20b' + 'ackground:' + '\x20#3a1a1a;\x0a' + _0x2d61ef(_0x353f4c._0x4200c7) + _0x2d61ef(0xa90) + _0x2d61ef(_0x353f4c._0x3cc705) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'border:\x20no' + 'ne;\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0xfeab01) + 'ing:\x207px\x201' + _0x2d61ef(_0x353f4c._0x34da7a) + _0x2d61ef(_0x353f4c._0x960c96) + 'der-radius' + _0x2d61ef(0x3b9) + _0x2d61ef(_0x353f4c._0x2865ab) + _0x2d61ef(0xacf) + '\x20\x20cursor:\x20' + 'pointer;\x0a\x20' + _0x2d61ef(0xacf) + '\x20font-size' + ':\x2011px;\x0a\x20\x20' + _0x2d61ef(_0x353f4c._0x435768) + _0x2d61ef(_0x353f4c._0x52c488) + 't:\x20600;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'font-famil' + 'y:\x20var(--m' + _0x2d61ef(0x83c) + '\x20\x20\x20\x20\x20\x20\x20\x20tr' + _0x2d61ef(0x1c0) + _0x2d61ef(0x44c) + '\x200.15s;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20}\x0a\x20\x20' + _0x2d61ef(0x264) + 'se-library' + _0x2d61ef(0x711) + _0x2d61ef(_0x353f4c._0x69728) + '\x20#4a2020;\x20' + _0x2d61ef(0xc8c) + '\x20.library-' + _0x2d61ef(0x41f) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20d' + _0x2d61ef(0x54f)) + (_0x2d61ef(_0x353f4c._0x331b31) + _0x2d61ef(_0x353f4c._0x5dbb27) + '-template-' + 'columns:\x20r' + 'epeat(auto' + _0x2d61ef(0x5f1) + 'max(200px,' + '\x201fr));\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x88c) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0xf733d6) + 'top:\x2016px;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20}' + _0x2d61ef(0xa1f) + '.library-i' + _0x2d61ef(0xa2b) + '\x20\x20\x20\x20\x20\x20\x20\x20ba' + 'ckground:\x20' + 'var(--surf' + _0x2d61ef(0x33a) + _0x2d61ef(0xad8) + 'rder:\x201.5p' + 'x\x20solid\x20va' + 'r(--surfac' + _0x2d61ef(_0x353f4c._0x2f6c54) + '\x20\x20\x20\x20\x20\x20\x20\x20bo' + 'rder-radiu' + 's:\x20var(--r' + _0x2d61ef(_0x353f4c._0x96385f) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20padding' + _0x2d61ef(_0x353f4c._0x2a4cfb) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'cursor:\x20po' + 'inter;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20t' + 'ransition:' + '\x20border-co' + 'lor\x200.15s,' + '\x20backgroun' + 'd\x200.15s;\x0a\x20' + _0x2d61ef(_0x353f4c._0x42b989) + '\x20position:' + '\x20relative;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20}' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20.' + _0x2d61ef(0x904) + 'em:hover\x20{' + '\x20border-co' + 'lor:\x20var(-' + _0x2d61ef(_0x353f4c._0x114768) + 'background' + _0x2d61ef(_0x353f4c._0x2cac6c) + _0x2d61ef(0x597) + '}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20.library-' + 'item-previ' + 'ew\x20{\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x528709) + _0x2d61ef(0x910) + _0x2d61ef(_0x353f4c._0x4200c7) + '\x20\x20height:\x20' + _0x2d61ef(0x385) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20b' + 'ackground:' + '\x20#111;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20b' + 'order-radi' + _0x2d61ef(0xa0) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20margin-bo' + 'ttom:\x208px;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20display' + ':\x20flex;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'align-item' + 's:\x20center;' + _0x2d61ef(0xa28) + '\x20\x20\x20justify' + '-content:\x20' + _0x2d61ef(_0x353f4c._0x2df17a) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'overflow:\x20' + _0x2d61ef(0x7bc) + '\x20\x20\x20\x20\x20\x20}\x0a\x20\x20' + _0x2d61ef(_0x353f4c._0x2abb39) + 'rary-item-' + _0x2d61ef(_0x353f4c._0x5ba2c8) + _0x2d61ef(0x8de) + 'ge-renderi' + 'ng:\x20pixela' + 'ted;\x20max-w' + 'idth:\x20100%' + ';\x20max-heig' + _0x2d61ef(_0x353f4c._0x4847aa) + _0x2d61ef(_0x353f4c._0x390be2) + '\x20.library-' + _0x2d61ef(0x13c)) + (_0x2d61ef(_0x353f4c._0x5bb0c8) + _0x2d61ef(_0x353f4c._0x379acf) + _0x2d61ef(0x215) + 'lute;\x0a\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x313bb2) + _0x2d61ef(0x3d5) + _0x2d61ef(0x667) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20width:\x202' + '2px;\x20heigh' + _0x2d61ef(_0x353f4c._0x3c5d9c) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20backgroun' + 'd:\x20#3a1a1a' + _0x2d61ef(0x306) + '\x20\x20\x20\x20border' + ':\x201px\x20soli' + 'd\x20#555;\x0a\x20\x20' + _0x2d61ef(_0x353f4c._0x80405f) + 'border-rad' + 'ius:\x2050%;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x53faf6) + '\x20flex;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20a' + 'lign-items' + ':\x20center;\x0a' + _0x2d61ef(_0x353f4c._0x42b989) + '\x20\x20justify-' + 'content:\x20c' + 'enter;\x0a\x20\x20\x20' + _0x2d61ef(0x7ff) + 'ursor:\x20poi' + 'nter;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20op' + 'acity:\x200;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20transiti' + 'on:\x20opacit' + 'y\x200.15s;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0xead278) + ':\x2011px;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'color:\x20#e0' + '5050;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20fo' + 'nt-weight:' + '\x20700;\x0a\x20\x20\x20\x20' + _0x2d61ef(0xb08) + '\x20\x20\x20\x20.libra' + _0x2d61ef(_0x353f4c._0x5087e9) + _0x2d61ef(_0x353f4c._0x308bbf) + _0x2d61ef(0x6c6) + _0x2d61ef(_0x353f4c._0x46b05a) + 'city:\x201;\x20}' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20.' + 'library-it' + _0x2d61ef(0x82e) + 'hover\x20{\x20ba' + 'ckground:\x20' + '#4a2020;\x20}' + '\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '.library-i' + _0x2d61ef(0x2ec) + '\x20color:\x20va' + _0x2d61ef(0xc81) + '\x20font-size' + _0x2d61ef(0xc41) + 'nt-weight:' + '\x20600;\x20text' + _0x2d61ef(0x7c2) + 'nter;\x20word' + '-wrap:\x20bre' + 'ak-word;\x20}' + _0x2d61ef(_0x353f4c._0x501abd) + 'library-it' + 'em-info\x20{\x20' + 'color:\x20var' + _0x2d61ef(_0x353f4c._0x338157) + 'ted);\x20font' + '-size:\x2010p' + _0x2d61ef(0x958) + _0x2d61ef(0x111) + 'r;\x20margin-' + 'top:\x203px;\x20' + _0x2d61ef(_0x353f4c._0x390be2) + '\x20.library-' + _0x2d61ef(0x793) + _0x2d61ef(0x201) + _0x2d61ef(_0x353f4c._0x4c8104) + 'dding:\x2040p' + 'x;\x20color:\x20' + 'var(--text' + _0x2d61ef(0x69f) + 'ont-size:\x20' + _0x2d61ef(_0x353f4c._0x4d54fa) + '\x20\x20</style>' + _0x2d61ef(0x3c9) + _0x2d61ef(_0x353f4c._0x36c4dd)) + ('\x20class=\x22he' + _0x2d61ef(_0x353f4c._0x2a01a2) + _0x2d61ef(_0x353f4c._0x3bc3f7) + 'style=\x22dis' + _0x2d61ef(_0x353f4c._0x30327d) + ';\x20align-it' + 'ems:\x20cente' + 'r;\x20justify' + _0x2d61ef(0xb2f) + 'center;\x20ga' + 'p:\x2015px;\x22>' + _0x2d61ef(_0x353f4c._0x4e1d68) + '\x20\x20\x20<img\x20sr' + 'c=data:ima' + 'ge/png;bas' + _0x2d61ef(0x5a2) + _0x2d61ef(_0x353f4c._0x2a85c1) + _0x2d61ef(0xd2b) + 'sAAAEuCAMA' + 'AABYhhVUAA' + _0x2d61ef(0x22f) + 'UkdCIElFQz' + 'YxOTY2LTIu' + 'MQAASImdU2' + _0x2d61ef(0x2ef) + '9EJLiICU0H' + _0x2d61ef(0xbb1) + 'r6ISkwChhB' + 'gSsBdEVHBE' + 'EZGmCDIo4I' + _0x2d61ef(0x117) + _0x2d61ef(_0x353f4c._0x21cd4d) + 'PgKDYsb0XX' + _0x2d61ef(_0x353f4c._0x2f0fdd) + 'aPb+21v3Pu' + _0x2d61ef(_0x353f4c._0x4da7d6) + 'JE4mxUBSBL' + 'LJNG+nuz4x' + 'MS2cR+QIEM' + 'BLAH4PFzJK' + 'FRftEAAIG+' + 'XHZOpL83fA' + 'EC8PKa4gS4' + 'bB0QzmbD/w' + 'dVvkQqA0DC' + 'AWCaQJjDB0' + 'AKACAzTyZR' + '6OMAwJyfoe' + 'AoTsGl8QmJ' + 'AKiGgqd+5l' + 'afYj5zTwUX' + _0x2d61ef(_0x353f4c._0x230705) + 'JBlkDBewBg' + 'Xa5cKADAQg' + 'CgMFckzAPA' + _0x2d61ef(0x4d7) + 'SAvVbkZgl5' + 'OQA4mkKXCf' + _0x2d61ef(_0x353f4c._0x23d738) + 'oyO5ALgZAC' + 'Ra6ld8/ldc' + 'JlwoUxTFzZ' + _0x2d61ef(_0x353f4c._0x3ca85a) + 'M745297Fhc' + 'MOEOZlCmUy' + _0x2d61ef(_0x353f4c._0x1a9d85) + 'C52VkSnngR' + 'wOeaP0FN0V' + 't2oC/Xyd7F' + _0x2d61ef(_0x353f4c._0x10d7e8) + _0x2d61ef(_0x353f4c._0x319e99) + 'n9nziE+eIa' + 'y+L9pfxWXX' + _0x2d61ef(_0x353f4c._0x8b81ad) + 'T5lQAdawA0' + _0x2d61ef(0x143) + 'cAtF/4qh6W' + 'Yl7SZDKJq6' + '1tXl6ejUjI' + 't1E09A/8z4' + 'C/ga/+Z6P4' + _0x2d61ef(_0x353f4c._0x41eeda) + 'jyTBlb0Td+' + _0x2d61ef(0x5f6) + 'D4Qrb1n4f4' + _0x2d61ef(0xc79) + 'UpQqlQzBey' + 'Y0XCPJE4lc' + '3NFgtEMlG2' + 'mC0S/ycT/2' + 'Han/B5rgGA' + '0fABmPNsQO' + _0x2d61ef(0x6cc) + 'oAKWtEPh+h' + '++hZBjQbF5' + 'cXqjn+f+Ez' + '5t878DLVEc' + 'OaLUT3ncyG' + 'g2Xy7N/Xyn' + _0x2d61ef(0xc65)) + ('maoAuGYAbW' + '4ADO4Aae4A' + _0x2d61ef(0x34a) + 'gQ9pkAVSyI' + 'OlsAoKoRg2' + _0x2d61ef(0xc88) + 'Zohf3QAYfh' + 'BJyG83ARrs' + 'JtGIQReAzj' + '8BImEQQhIn' + _0x2d61ef(_0x353f4c._0xcb3ae1) + 'Yok4IBxkJu' + 'KLhCCRSAKS' + 'jKQiYkSOLE' + 'VWI8VIKVKF' + _0x2d61ef(_0x353f4c._0x5bd659) + 'QEchYZQG4i' + _0x2d61ef(0x7fc) + 'VQGspEdVAT' + '1BbloF5oMB' + _0x2d61ef(0x3d1) + 'YrQA3YhWoP' + 'XoXrQdPYGe' + _0x2d61ef(_0x353f4c._0x30d9c0) + 'IDjIqxMH3M' + 'GuNgXCwMS8' + 'RSMCm2HCvC' + 'yrF6rBXrwn' + 'qxy9gg9gR7' + _0x2d61ef(_0x353f4c._0x2837fc) + _0x2d61ef(_0x353f4c._0x22a813) + _0x2d61ef(0x52e) + 'rcHlw7rgd3' + 'GTeEG8d9wN' + _0x2d61ef(0xcdd) + 'EB+PT8Xn4Q' + 'vx5fhG/EH8' + 'KfxV/Aj+JY' + _0x2d61ef(_0x353f4c._0x36d91f) + 'AEICIZ2whL' + _0x2d61ef(0x348) + 'GCAMEyaIRK' + 'Im0ZLoTgwj' + '8ogyYiGxkr' + _0x2d61ef(0x84b) + 'fE2ikvRIDi' + 'Q/UiJJTMon' + 'lZOaSUdJl0' + _0x2d61ef(0x321) + '7EoOIwvIi8' + 'gl5AZyF/kC' + _0x2d61ef(0x811) + 'LcKdGUdMoq' + 'SgWllXKKco' + _0x2d61ef(_0x353f4c._0x5c3662) + _0x2d61ef(0x2ff) + 'K6j3qGOkR9' + 'Q1OjWdC4tC' + 'SanLaRtpt2' + 'nHaT9pxOp5' + 'vQPemJdBl9' + 'I72JfpJ+j/' + '5aiaFkoxSo' + _0x2d61ef(_0x353f4c._0x3be81c) + _0x2d61ef(0x1bb) + 'WNlLea7yYu' + 'Vy5QPKF5Sf' + 'qJBVTFS4Kj' + 'yV5SrVKodU' + _0x2d61ef(0x1c5) + _0x2d61ef(_0x353f4c._0x386932) + 'q55VfahGVD' + 'NR81UTqBWo' + '7VI7qTbMwB' + 'iGDC6Dz1jN' + _0x2d61ef(_0x353f4c._0x1fb11a) + 'xTZiAznVnM' + '/I7ZzxxXV1' + 'Ofrh6rvlC9' + _0x2d61ef(0xaba) + _0x2d61ef(_0x353f4c._0x13b1bf) + _0x2d61ef(_0x353f4c._0x1ceb5d) + _0x2d61ef(_0x353f4c._0x25cf92) + 'OuXSlFcaUz' + _0x2d61ef(_0x353f4c._0x2353e9) + 'Glc13mqyNX' + '01MzQ3a3Zo' + '3tXCaVloRW' + 'jlae3QOqX1' + 'ZCpzqttU/t' + 'Siqfun3tJG' + 'tS20I7WXaO' + '/S7tOe0NHV' + _0x2d61ef(0xbe8) + 'R5osvS9dRN' + _0x2d61ef(_0x353f4c._0x437fbd) + 'fQm6kn0ivT' + 'O6b3iK3O9m' + 'JnsivYPexx' + _0x2d61ef(_0x353f4c._0x24ced0)) + ('1+v/6kgalB' + 'jEG+QZvBXU' + _0x2d61ef(0xc5c) + 'sNtw3EjPKN' + 'RoqVGL0S1j' + _0x2d61ef(0x59e) + 'Gv8SsTU5M4' + 'k7UmHSYPTT' + 'VMA00Xm7aY' + '3jGjm3mYLT' + 'CrN7tiTjDn' + _0x2d61ef(0x518) + 'FaOFqkWVRb' + 'XLBELZ0sRZ' + 'bbLQes8FYu' + 'VmKreqvr1j' + 'RrL+tc6xbr' + 'IRuWTYhNvk' + '2HzVNbI9tE' + '2822vbYf7B' + _0x2d61ef(0x890) + 'q9kH2efbd9' + 'n/7mDhwHeo' + 'drgyjT7Nb9' + 'qKaZ3Tnk23' + 'nC6cvmP6DU' + 'eGY6jjWsdu' + 'x/dOzk5Sp1' + _0x2d61ef(0x89) + _0x2d61ef(0xd23) + 'OBc8YF7+Lt' + 'ssLlsMsbVy' + _0x2d61ef(0x43b) + 'rN0y3JrdHs' + '4wnSGc0TBj' + '2N3Anede5z' + '44kz0zeebO' + 'mYMe+h48j3' + _0x2d61ef(_0x353f4c._0x21ecf9) + 'Rs9RL3OvdK' + '+9Xk+97byl' + _0x2d61ef(0x50c) + 'u4x30wH3+f' + 'Ip9+XzXfGN' + _0x2d61ef(_0x353f4c._0x5e4b09) + 'fi1+4/6O/k' + 'v8jwfgA4ID' + 'NgdcD9QJ5A' + 'c2BY4HOQct' + 'C+oJpgVHBV' + 'cF3w+xCJGG' + 'dIWioUGhW0' + _0x2d61ef(_0x353f4c._0x4eae7e) + 'EQZhgWFbwu' + _0x2d61ef(0x53b) + 'ghARHlEd8S' + 'DSPnJpZG8U' + 'I2peVHPUy2' + _0x2d61ef(0x120) + 'MfKY7ljl2K' + _0x2d61ef(0x697) + _0x2d61ef(0x57f) + 'LPJ2gliBI6' + 'E4mJsYmNiR' + _0x2d61ef(0x292) + '5JhUmHRtju' + _0x2d61ef(_0x353f4c._0x14f0fd) + 'mzn3yDzleb' + 'x5B5LxyXHJ' + _0x2d61ef(0x644) + '7E/MD5NfPH' + '+Vz+Nv5jga' + _0x2d61ef(_0x353f4c._0x22ca2d) + _0x2d61ef(0x76d) + '6muqduSR1L' + '80grT3si4o' + 'qqRM/SA9Jr' + _0x2d61ef(0xcc6) + _0x2d61ef(_0x353f4c._0x193041) + 'Ss46JFYTZ4' + 'h7snWzF2YP' + _0x2d61ef(_0x353f4c._0x296e6f) + '4Lti4YlwZL' + 'G3OQnDk5nT' + 'KmTCLrk5vJ' + '18iHcmfmVu' + 'e+zovNO7BQ' + _0x2d61ef(_0x353f4c._0x23290b) + _0x2d61ef(_0x353f4c._0x4b3172) + '7RLcEv6S7q' + _0x2d61ef(0x900) + 'taxuObJ8/v' + _0x2d61ef(0x871) + _0x2d61ef(_0x353f4c._0x48560c) + _0x2d61ef(0x864) + _0x2d61ef(_0x353f4c._0x554bcb) + 'BTsLJgeI3/' + _0x2d61ef(_0x353f4c._0x45b4c2) + 'W1bmtr1+HW' + 'idb1r5+2vn') + ('L9hyJB0bli' + 'u+Ly4ncb+B' + _0x2d61ef(_0x353f4c._0x4001ae) + 'HzembOwvcS' + 'rZsYmwSbzp' + _0x2d61ef(_0x353f4c._0x4e5b18) + _0x2d61ef(_0x353f4c._0x14b556) + 'XsYuKyp7sX' + 'Xe1rPl08tr' + 't1G2ybcNVo' + 'RUdFYaVW6q' + _0x2d61ef(_0x353f4c._0x72d330) + 'u6rUa7Zn3N' + _0x2d61ef(_0x353f4c._0x35f052) + '5ordWpLa59' + _0x2d61ef(_0x353f4c._0x43fffa) + _0x2d61ef(_0x353f4c._0x44b9a1) + 'rtxdDxpiG3' + 'q/5Xzb1KjV' + 'WNz4frd49+' + 'CeyD09Tc5N' + 'Tc3azSUtaI' + 'u8ZWxv0t6L' + '3/l819lq3V' + _0x2d61ef(0x55a) + _0x2d61ef(_0x353f4c._0x30fad0) + _0x2d61ef(_0x353f4c._0x1e61a7) + 'tP5g/EPNQc' + 'bBonakfVH7' + 'eEdax2BnQu' + 'fAoaBD3V1u' + 'XQd/tPlx92' + _0x2d61ef(0x7ea) + 'HKUcLTj68d' + 'jiYxPHJcef' + 'nEg9Mdw9r/' + _0x2d61ef(_0x353f4c._0x3e785d) + 'evpPBZ86c9' + _0x2d61ef(0x194) + 'Z9zPHD7rev' + 'bQOc65jvNO' + '59v7HPsO/u' + 'T408F+p/72' + _0x2d61ef(_0x353f4c._0x59d02c) + 'wamDFw9JLH' + _0x2d61ef(_0x353f4c._0x1d67ae) + 'J45fzVWVcH' + 'rsVcu3E96f' + 'rgDcGNhzcz' + 'bz67lXtr8v' + 'bKO/g7RXdV' + '7pbf075X/7' + 'P5z22DToNH' + 'hnyG+u5H3b' + _0x2d61ef(_0x353f4c._0x5ba5da) + 'L+9GCh7QH5' + 'SP6o02PXR4' + 'eHjMb+zio9' + 'mPRh5LHk8+' + 'KfxV9deap2' + 'ZPf/jN87e+' + '8fjxkWfSZx' + '9/3/Bc8/nu' + 'F9NfdE+ET9' + 'x7mfVy8lXR' + _0x2d61ef(_0x353f4c._0x42b8ed) + _0x2d61ef(0x801) + 'jviu4r35+6' + '4PwR/ufMz6' + '+PFfA5jz/D' + 'T+dQEAAAMA' + 'UExURQAAAP' + '///ykcBAIC' + _0x2d61ef(_0x353f4c._0x9f27f5) + 'gKCgIGAgYL' + 'BAYGAhERBv' + '7++fb29A0M' + 'AxYUBv7rVf' + _0x2d61ef(_0x353f4c._0x13b446) + '8P7pnxwXBv' + 'Dt4ygeAiQc' + _0x2d61ef(0xae0) + 'PMicq4gtrS' + _0x2d61ef(_0x353f4c._0x76c523) + _0x2d61ef(0xa2e) + 'FP7UbichEn' + 'RjNu7KcurP' + 'iu/TkOnPkH' + 'hrTN7Iji4g' + _0x2d61ef(0x999) + '4YCz0zHLyd' + 'We3Kfdi5dO' + _0x2d61ef(_0x353f4c._0x36dd9c) + 'NP7fl7eico' + 'h4VmdbQe/V' + 'mKqXbPjdn5' + 'OGaMe/rqVy' + 'DSoeBtGXIp' + 'RqGW9QE2RI' + 'EdWaJodhGM') + ('2UJaF0HXpZ' + 'GC4iCTUnC+' + _0x2d61ef(_0x353f4c._0x5aa3e1) + 'duC7c+rGet' + 'OybvTNgc6u' + _0x2d61ef(0x339) + 'bDfezKg6SL' + _0x2d61ef(_0x353f4c._0x159dce) + 'rKisSre7qw' + 'm+jm4vmmD9' + 'yRD7l9DdeW' + 'IjIjCNKSIt' + _0x2d61ef(0x15b) + _0x2d61ef(_0x353f4c._0x436a88) + 'B+IP63MOCe' + _0x2d61ef(0xb06) + 'Kua+7GeurC' + _0x2d61ef(0x4b7) + _0x2d61ef(_0x353f4c._0x1db6af) + 'ierGhu7Kis' + _0x2d61ef(0xc1f) + 'dsqueurKjt' + 'a5g92/iPPR' + 'lqObjLJ2Fo' + _0x2d61ef(0xa82) + _0x2d61ef(_0x353f4c._0x4eda25) + _0x2d61ef(_0x353f4c._0x26e89a) + _0x2d61ef(0x265) + '2vLeigKdaS' + 'JtKSJtuWKt' + 'WULMmNKeun' + _0x2d61ef(0x485) + 'auOc2SMNmd' + 'O7eENDorE/' + 'y+XJd4ROrC' + 'fu7Ggu7Kju' + 'nGi8SmduPB' + 'i8qufurKlK' + '1qBioaAtKD' + 'DKZmCiAUAr' + 'd2FhkQA7Fy' + 'FpNeEtGJG6' + _0x2d61ef(_0x353f4c._0x5dc9e0) + 'G7t6GUIrCb' + '9+G7Z2GrJ2' + _0x2d61ef(_0x353f4c._0x136e94) + 'aOIuOZJ9aO' + 'JtKOJu7Cfu' + _0x2d61ef(0xa83) + 'es+vf6pjBq' + 'pmCqZiCqFh' + 'CrBrDapmDq' + _0x2d61ef(0xb99) + 'esqqf9TRza' + 'ZgBi4aAq9m' + 'CqpiCsJxDa' + 'NdC7hsDcp3' + 'D4ZOCiYWA6' + _0x2d61ef(0x296) + _0x2d61ef(0x7d8) + 'pACsR0FLVt' + 'E4ZPDqpnE7' + 'pyFyIWB5Rk' + 'Kc6qfpxYC4' + _0x2d61ef(_0x353f4c._0x91da5a) + 'DKpiDoJKC4' + _0x2d61ef(0x891) + 'BoFGChQLAo' + 'ZKDioZB0Uu' + 'FmpGI1k5Gm' + 'I+Hv76+PPx' + '8AwEAgYCAg' + _0x2d61ef(0xd02) + _0x2d61ef(_0x353f4c._0x5bf95e) + 'JXTUoAAAEA' + 'dFJOU/////' + '//////////' + '//////////' + '//////////' + _0x2d61ef(_0x353f4c._0x2f8a0b) + '//////////' + _0x2d61ef(_0x353f4c._0x445732) + '//////////' + '//////////' + '//////////' + _0x2d61ef(0x3de) + '//////////' + '//////////' + _0x2d61ef(_0x353f4c._0x335353) + _0x2d61ef(_0x353f4c._0x252ce4) + '//////////' + _0x2d61ef(0x3de) + '//////////' + '//////////' + _0x2d61ef(_0x353f4c._0x335353) + '//////////' + _0x2d61ef(0x3de) + _0x2d61ef(0x3de) + _0x2d61ef(0x3de) + _0x2d61ef(_0x353f4c._0x2da8bd)) + ('//////////' + '//////////' + _0x2d61ef(_0x353f4c._0x335353) + _0x2d61ef(0x3de) + '//////////' + '//////////' + '//////////' + _0x2d61ef(_0x353f4c._0x252ce4) + '//////////' + '/////wBT9w' + _0x2d61ef(0x5d1) + _0x2d61ef(_0x353f4c._0xf02d02) + 'ALEwEAmpwY' + 'AACIKUlEQV' + 'R4nN29CXxT' + 'ZfY3fp57k9' + _0x2d61ef(_0x353f4c._0x524dae) + '6ZK0tFxKoW' + 'lE2WRr2Vxw' + _0x2d61ef(_0x353f4c._0x492d2d) + _0x2d61ef(_0x353f4c._0x188fea) + _0x2d61ef(_0x353f4c._0x5d9416) + _0x2d61ef(_0x353f4c._0x441ffb) + '1rKpoGLaQi' + 'kXWpqkLQ1U' + 'haSltMm9Se' + '59/p/z3HRh' + _0x2d61ef(0x9cc) + 'Q2SdP0fu85' + 'z9nPeQiF/y' + _0x2d61ef(0x94c) + _0x2d61ef(_0x353f4c._0x2c28b7) + '2NikX/Myv0' + 'zX6R/D9G19' + '4LGrrGFu7V' + 'APhDw5tsmb' + '5vQF/+Yfh/' + 'aJ2XOuXPKb' + _0x2d61ef(0x80a) + '71ee89456U' + _0x2d61ef(0x9e7) + 'f16ozTn/3i' + _0x2d61ef(0x97f) + _0x2d61ef(_0x353f4c._0x50323b) + _0x2d61ef(0x9c6) + _0x2d61ef(_0x353f4c._0xfde54a) + 'lQC+jARYkt' + 'ufYq20XPrb' + 'rq/z6s531I' + _0x2d61ef(_0x353f4c._0xcb5331) + _0x2d61ef(_0x353f4c._0x4db9d4) + 'pXlyZHGtsD' + '2mDekYCtCV' + _0x2d61ef(_0x353f4c._0x47d7cb) + _0x2d61ef(_0x353f4c._0x1ea8c9) + 'MsH/zsrbHh' + '5SHc18mdMj' + 'YIXIXJi7Ye' + _0x2d61ef(0xb58) + _0x2d61ef(0x1fb) + 'THH6hQbPHw' + 'OR1AINSV2g' + _0x2d61ef(_0x353f4c._0x303ace) + _0x2d61ef(_0x353f4c._0x47a811) + 'LXn/1apJGq' + 'ciuh76/dlD' + 'L3I5hxf2nh' + 'TXNtFN6HpY' + 'dhnmvV1+H9' + _0x2d61ef(0x5e7) + _0x2d61ef(_0x353f4c._0x28ce2e) + 'aYyqqZAWgi' + _0x2d61ef(_0x353f4c._0x1eda4c) + 'gv8bsObF99' + 'F3+EtJ5vVb' + 'eD4+3/m3rP' + 'ao5QePwRCT' + 'dmRhwbCL4X' + '293EZf//vn' + _0x2d61ef(0x513) + _0x2d61ef(0x659) + 'DO0iyMep0J' + _0x2d61ef(0x25b) + '9Dczu/+PYz' + '2vOqUJHOC2' + 'mfxZTRrvcM' + 'BYBaD64iao' + 'Ao0vDJW0xa' + 'e5F1N/w6Xw' + _0x2d61ef(0x914) + _0x2d61ef(0x44d) + 'GBVJ86daOy' + _0x2d61ef(_0x353f4c._0x410098) + 'f4jFd/k18y' + _0x2d61ef(0x54b) + 't1CyLTXnHK' + '7zIOTP1Qur' + 'csGfEQCAzE' + _0x2d61ef(0xc5a) + 'Pn5sbpsS2k') + ('vf4Su6Hvnj' + 'ST4kMMJqee' + 'i6OM+eRI6c' + 'A9YQpLXQ3F' + 'CaPzXNnwrB' + 'EXy49crZ4a' + 'ofvPR/Dmte' + 'jbVkm+2Bz4' + 'IH+fIx8/fv' + _0x2d61ef(0x9bc) + '3sx7mO6lx/' + 'rv+W6g0+7V' + 'y7ojR0rb2c' + _0x2d61ef(0x85a) + _0x2d61ef(0xc83) + _0x2d61ef(_0x353f4c._0x293e81) + 'nYeAB6ip5U' + 'ZLv0ufev+D' + '9lD0/Y0/K+' + '/NisTxuKF8' + _0x2d61ef(_0x353f4c._0x86e4e0) + '4gf+ckQKfl' + _0x2d61ef(0x800) + '+e8WN/i16Y' + '/dRORhsdxj' + _0x2d61ef(_0x353f4c._0x146d37) + '1mUCMAXaOs' + 'iDE1lf0wDS' + 'AVIJcziUpN' + 'dMXlc6P/Z+' + _0x2d61ef(_0x353f4c._0x13d7d5) + _0x2d61ef(_0x353f4c._0x6487ac) + 'Ey1+FjFMUn' + _0x2d61ef(0xcb7) + 'RDZkF1+d6t' + _0x2d61ef(0xb93) + 'ehwuEd+JjY' + 'yltK/m4y+J' + 'cta6QD8eFK' + 'a6GpwbwQIz' + _0x2d61ef(_0x353f4c._0x29b961) + _0x2d61ef(_0x353f4c._0xf26c01) + 'Pu/Fv4Avvu' + _0x2d61ef(0x8cf) + 'BrmYEYV27i' + 'UVk1AGTwL2' + 'hJKeZdb/EV' + '2S19l1d546' + _0x2d61ef(_0x353f4c._0x58a563) + 'go7cSCTxrA' + 'sZGZFq9jR/' + 'UlK4tWLmD+' + 'e/eMIm+C/z' + _0x2d61ef(0xa80) + 'WOzL+O25uZ' + _0x2d61ef(0x2c9) + 'JmLoAv8aby' + 'TPBDbm4m5E' + 'I1QDlY+Pl/' + _0x2d61ef(0xc40) + _0x2d61ef(_0x353f4c._0x35d994) + _0x2d61ef(0x549) + _0x2d61ef(0x3e6) + 'Px/bIQS9Gu' + 'Q0fHzvoutR' + '9P0v0nXW9t' + 'y60YUNkA/g' + _0x2d61ef(_0x353f4c._0x93bb35) + 'n51bngZ7RM' + _0x2d61ef(_0x353f4c._0x3fbf3e) + 'turDDr3n3n' + 'Dt19uKQOpG' + 'ak6gOLh3Sc' + 'M/DJHbkhFE' + 'eJZ4yqfQ/T' + _0x2d61ef(0xbcf) + _0x2d61ef(0x663) + _0x2d61ef(_0x353f4c._0x53051b) + _0x2d61ef(0x83f) + _0x2d61ef(0xcbb) + 'f7HI4sMPvL' + 'oBo3ba7fwI' + 'ocnOvPbMcn' + 'uRDdtjtpyZ' + 'Nd+YHLblim' + _0x2d61ef(_0x353f4c._0x4c1b85) + _0x2d61ef(0x2c1) + _0x2d61ef(_0x353f4c._0x291873) + 'KDqUdfrKx4' + '/6ujyf9LPP' + 'xSbOxPZ/VY' + _0x2d61ef(0x3fd) + _0x2d61ef(_0x353f4c._0x83cdc2) + 'UXZUvc0V5O' + 'eLL67P8lUD' + _0x2d61ef(_0x353f4c._0x2b0b90) + 'WQC7Fc3M0Z' + 'ueAPZL2rvD' + 'x10leTbiiK' + 'bC8KDFxgRw') + (_0x2d61ef(0x1ea) + 'SOFUO3QNBb' + _0x2d61ef(0xc9b) + '8TWV424Wiv' + '936HoEpv5m' + _0x2d61ef(0x5fb) + _0x2d61ef(0x1db) + '92YTFyPxaP' + _0x2d61ef(_0x353f4c._0x4b5a3b) + _0x2d61ef(0xc63) + _0x2d61ef(0x6b5) + 'YbdcNq6znt' + '75wUW//UQS' + 'Bn96R2rXqH' + '7RZEimoN0Q' + 'UhAEe1dST4' + 'owwTb5TVs0' + _0x2d61ef(_0x353f4c._0x681d77) + _0x2d61ef(0x343) + _0x2d61ef(_0x353f4c._0x3223b1) + 'sE4LNEwdR1' + 'JMMSI+Huy9' + _0x2d61ef(_0x353f4c._0x315c62) + 'gz/TDP7Mds' + _0x2d61ef(0x9a0) + _0x2d61ef(0x9d6) + '3373uONsgT' + _0x2d61ef(_0x353f4c._0x5a54dc) + _0x2d61ef(_0x353f4c._0x1baeec) + 'ItTUIA+aHS' + 'Ct2R7khwyb' + 'dPSaV80H0/' + '7LWP8zt6Pw' + '55/QJocDbn' + 'sJcp1ehsQP' + 'mfM2ORr1dp' + '9vGXW8eHjh' + 'O1dupU5/U/' + _0x2d61ef(_0x353f4c._0x72ca9d) + 'WzcTtTH4Yf' + 'X44N63X3l3' + _0x2d61ef(_0x353f4c._0x53b598) + 'gjwFg59Qg1' + 'iIqgNbAH+d' + 'Su1KA9mBcK' + 'JQ+Rr7FddB' + 'Ij6mxi7TX7' + _0x2d61ef(0x59a) + _0x2d61ef(0x2e3) + 'roNUGWjKfP' + '7Mtva9wx/8' + 'oH7hhrlr0l' + 'rU8jGB8ioo' + '80HMHAOUTf' + '26N9efsW23' + 'dLTmB5UHvo' + 'weI2o6qF1H' + 'wYTQuphBjM' + 'KYkRf3LA92' + 'lQgTTFctuP' + 'J4u+IsYj1v' + 'e1Phz21/vb' + 'PV4QcwLHzD' + 'AC6rzmzPbM' + 'ddmQntme1Z' + _0x2d61ef(_0x353f4c._0x278e7e) + 'BljX3GMSsA' + 'fTyceDuTy0' + _0x2d61ef(_0x353f4c._0x5417aa) + 'vLXM+9ylhj' + 'DWAeonAUTB' + 'FKZ9MQYDYI' + _0x2d61ef(_0x353f4c._0x3258f0) + _0x2d61ef(_0x353f4c._0x1e5410) + 'MyxGve/+q4' + 'SNTZw7ri5s' + '8LCzv4WwK5' + 'x1hJ+IA97l' + 'epjurypg2+' + _0x2d61ef(0x851) + 'XPOu6qYgRl' + 'P0ZngOFF+L' + _0x2d61ef(0x274) + 'SfdNmEh3FH' + 'PRhqmgd9q5' + '7uVwpQrEnN' + _0x2d61ef(_0x353f4c._0x52eb94) + 'PYhGRZfGQ+' + 'oRLVkPVJwH' + 'W46l7FmLmT' + 'p/P+H8zf47' + 'JwWgE6+5s9' + '91HtoN3Znd' + _0x2d61ef(0x444) + _0x2d61ef(_0x353f4c._0x4b0d0f) + 'm7ePMR2dvq' + '8lfd6jdL4v' + 't9OfnN4J0J' + 'nZllv6VTdA' + 'J/7G+fPIjp') + ('UvHG39uzCF' + _0x2d61ef(0xc34) + _0x2d61ef(0x267) + 'xbtjyV2KCM' + 'q5XcOCpKs3' + 'YrfZgtHUjM' + _0x2d61ef(_0x353f4c._0x16cd55) + _0x2d61ef(_0x353f4c._0x135a7) + _0x2d61ef(0x1ee) + '7+ATFprfsE' + 'ozMwHacyGz' + _0x2d61ef(0x980) + 'TjmDkXch3c' + 'n6atNX1pnR' + _0x2d61ef(_0x353f4c._0x38a89e) + 'P3P4yqAd/N' + 'VoTAJAO+yt' + 'mr+s6efjXp' + _0x2d61ef(_0x353f4c._0x9b0636) + 'lI5DmqYRky' + _0x2d61ef(_0x353f4c._0xd70407) + 'pGoQTPUPDe' + 'Lb0WjmU4PN' + 'WijU1fyVqX' + 'fxL7Y4unL+' + 'CzwcGLJhrt' + 'T7V2+/ZOn7' + 'Ae49Ztn3vc' + 'j2prFBy/e+' + 'WHjb4ws32L' + 'jDh281OB3l' + 'MNvZ/W+Pvj' + 'R26h9uXhHo' + 'pWYNQmkAIb' + _0x2d61ef(_0x353f4c._0x504d59) + 'oVuHMi/HKg' + 'DKYQ3sXW1Q' + 'jBsYIEVQ9l' + 'fMWk3POtYe' + 'iz/35g9uD6' + 'AJX5V4LbPd' + 'uPIEYoQA/n' + '75A+W4SyHr' + 'BQfpvgg+cK' + _0x2d61ef(_0x353f4c._0x178e58) + _0x2d61ef(_0x353f4c._0x15540f) + _0x2d61ef(0x94d) + 'FhoRp51pIR' + _0x2d61ef(0x9f8) + 'H3GmoCkOND' + _0x2d61ef(_0x353f4c._0x20fa84) + _0x2d61ef(0x15d) + _0x2d61ef(_0x353f4c._0x5657e3) + _0x2d61ef(0x7b8) + _0x2d61ef(_0x353f4c._0x556913) + 'unB4mciTPs' + 'bBZZCJWhPZ' + 'E6C9DMCRC5' + _0x2d61ef(0xce4) + 'd3rpJ1ssI/' + _0x2d61ef(0x486) + _0x2d61ef(_0x353f4c._0x3f29a9) + 'f8Z0HzBX8b' + 'uftKS4xP+y' + 'qEUNNIB0m/' + '5IN/7Nc77X' + 'HgCdh55OG8' + _0x2d61ef(_0x353f4c._0xef6c71) + 'mDdug2xaJH' + '114PZxnrKE' + 'kulu8IlAcg' + 's3p0nlfXm5' + _0x2d61ef(0xd9) + _0x2d61ef(_0x353f4c._0x210e82) + 'PRKMJV7c/N' + _0x2d61ef(_0x353f4c._0x45ba49) + 'CtvmVJY68V' + 'plcVbFgfRT' + 'lcxhC3A2Tm' + _0x2d61ef(_0x353f4c._0x261c66) + '/UHSN3jyA6' + 'nwZpoRFpoV' + _0x2d61ef(0x283) + _0x2d61ef(0x4e0) + 'ZTwa4FIXUW' + 'QDDYBRhR5Q' + 'FobIgPzju7' + 'PBzirecFym' + '97rs0H4Oi+' + 'yumnAHmPQV' + 'oTaDwsC3Pt' + 'mWZHdWLX5v' + 'pzY+25MYxM' + '+A2TOBecz/' + _0x2d61ef(0x6a6) + _0x2d61ef(0x6eb) + _0x2d61ef(_0x353f4c._0x42f252) + _0x2d61ef(0x5a5) + _0x2d61ef(0x714) + _0x2d61ef(_0x353f4c._0x40ce1c)) + ('5rRgZG6aT2' + _0x2d61ef(0xe5) + 'm+/94Xzipd' + '+ankUq3qIT' + 'l/XF4+Fd6L' + 'vl7z+uuKIF' + _0x2d61ef(0xbaf) + _0x2d61ef(_0x353f4c._0x11212c) + '8ZQFmuA/wF' + 'uQ5zDKmMqr' + 'Y91+Gvuutt' + _0x2d61ef(0x5dc) + _0x2d61ef(0x448) + _0x2d61ef(0x8b1) + _0x2d61ef(_0x353f4c._0x207f20) + '9/28zgOkpY' + 'VGo4zikitj' + '9bSnCyDI88' + _0x2d61ef(0xb25) + 'EnDTBu28Hb' + 'rhXtoROKt0' + _0x2d61ef(_0x353f4c._0xe73e4f) + 'TDf7iEkjAA' + 'bJiL/wCsAB' + 'Hn441r0rP8' + 'e/jyMeyvll' + 'WzCBOzGfrp' + 'Bn5Kqxb4pu' + 'nbuKZbLBiA' + 'wp2aoCkTYe' + 'bZgUfrM/RL' + 'fwvcoTSUxi' + 'iS9chkdaei' + 'dzPBhLYEnx' + 'sK8rn+OGHm' + _0x2d61ef(0xb0d) + _0x2d61ef(0x952) + 'ITd/VL91x1' + _0x2d61ef(0x227) + '6rStr34vf+' + 'wGdL6eH/bQ' + _0x2d61ef(_0x353f4c._0x31ff63) + _0x2d61ef(_0x353f4c._0x5e1609) + _0x2d61ef(_0x353f4c._0x344e3b) + _0x2d61ef(_0x353f4c._0x55cce9) + _0x2d61ef(_0x353f4c._0x168dc9) + 'Ew+/25EIPc' + 'XMDwDeTme6' + 'syry4OjFzh' + _0x2d61ef(0x543) + _0x2d61ef(_0x353f4c._0x1d2171) + 'QJfdrgLkBa' + _0x2d61ef(0xb91) + _0x2d61ef(_0x353f4c._0x167374) + 'xgzPLs0fU/' + _0x2d61ef(0xad2) + '9Khs+iFuiQ' + 'symar+W1QC' + _0x2d61ef(0x9a9) + 'cFW5jY4bwX' + 'Ue5G/XLOj6' + 'QC44qvutSE' + 'NB3fpCFe7a' + 'zxrL5zN1BH' + '1Sudzrz42R' + _0x2d61ef(0xcb8) + 'WShwkJpTHp' + 'g4SdRHf2kl' + '7N3qWx7co0' + 'D9iDwGu4Y7' + 'nkZXubhp5F' + 'rBetnbFyVM' + 'qybXSWOY55' + 'vyKA+qaxxQ' + '2gUQBTM20l' + '0/xPjnpDXw' + _0x2d61ef(0xb1e) + _0x2d61ef(0x835) + '2Vm+uoLvvp' + '3ZUX6dtM0b' + _0x2d61ef(_0x353f4c._0x1606aa) + '1UzOJp7rfe' + 'wHbzVYzYcA' + _0x2d61ef(0xb18) + 'wV+pgjYBWC' + 'drUHzSY7Gh' + _0x2d61ef(0xc2a) + _0x2d61ef(_0x353f4c._0x433fdd) + 'oKMsm9m/Id' + 'nD6xhgiKiC' + '+yr4qoiCDt' + '4uJg690c+/' + _0x2d61ef(0xb88) + 'wCTALQFEkP' + 'DPE44N89Kd' + 'z4JwHrf1yJ' + _0x2d61ef(0xcd) + '5lZe7dxHTc' + '5fNV72+Wc2' + 'M4kbGxb0V5') + (_0x2d61ef(_0x353f4c._0x102d6e) + 'HXfmswfz/B' + 'iG6kqNC7fu' + 'DXefJay9cR' + _0x2d61ef(0x252) + _0x2d61ef(_0x353f4c._0x15bc93) + _0x2d61ef(_0x353f4c._0x3ec637) + _0x2d61ef(_0x353f4c._0x58af64) + 'nc0u7vXFWe' + _0x2d61ef(_0x353f4c._0x2be0e7) + 'Qhf7OfRccZ' + 'DZmuyXWuq3' + 'LqM7fe9aPb' + '2xhfMx42hJ' + _0x2d61ef(0x782) + 'DHZy1FA8aU' + 'AsBdrkZw4m' + 'C0FK7GnNyM' + _0x2d61ef(0x81a) + 'any4FFp+1d' + 'nBuujjOLmg' + '3KSbVC9IAN' + 'CYjbSUHeDD' + 'Z4rYmA0ggr' + 'xkheY0Udps' + '3pf1rzf0iq' + _0x2d61ef(0x822) + _0x2d61ef(_0x353f4c._0x50350e) + _0x2d61ef(0xc7d) + '1Xv7WK+B09' + 'jdmsmZBdDG' + 'P7fJP33yi0' + 'eHGpbxiK/s' + 'nhvDO1QLJC' + _0x2d61ef(_0x353f4c._0x281610) + 'zPZoyoTtf3' + 'zprMjhxo/j' + _0x2d61ef(_0x353f4c._0x17bba2) + _0x2d61ef(0x1e4) + 'Ag6fiFCBQI' + _0x2d61ef(_0x353f4c._0x429d8a) + '8nF9bPYCyw' + 'VVlw7p+HBV' + '3oLnX8rw50' + 'JZGVOk1WVM' + 'w/gAqsx/Wh' + _0x2d61ef(_0x353f4c._0x18f7cf) + _0x2d61ef(_0x353f4c._0x23d69a) + 'YYL2/aQy50' + _0x2d61ef(0x566) + '+FAOKg7YzC' + _0x2d61ef(0x4d6) + 'Ha0aUFDFPg' + 'S3FoMIKP35' + 'WuKxYPnTkL' + 'dMHg2cFr8H' + _0x2d61ef(0xa14) + '3zjt7lFDAn' + _0x2d61ef(_0x353f4c._0x181abf) + '0QgP4xuYn3' + _0x2d61ef(0x6a2) + _0x2d61ef(_0x353f4c._0x2a1c70) + 'kJWZQjAAWZ' + 'BIUxk09pEE' + 'oLpVHxsjfk' + _0x2d61ef(0x80c) + 'wbKGahCkAi' + '5zUPsU34x5' + 'FbzgJd/3Np' + _0x2d61ef(0x432) + 'BUZGUAqIxQ' + 'G0FR+qDK+K' + _0x2d61ef(_0x353f4c._0x343fe4) + _0x2d61ef(0x218) + _0x2d61ef(_0x353f4c._0x26908) + _0x2d61ef(0x780) + _0x2d61ef(0x2eb) + _0x2d61ef(0x627) + 'r8uVW5/tys' + 'tvkEfQigtP' + _0x2d61ef(_0x353f4c._0x4ff40f) + 'unZpQCI/m3' + 'T5WIWHoJ8F' + _0x2d61ef(_0x353f4c._0x3e3266) + _0x2d61ef(_0x353f4c._0x9c6b88) + '083fg++KtW' + _0x2d61ef(_0x353f4c._0x142e37) + 'eWOJQwAF3A' + _0x2d61ef(0x79f) + 'VADAOBn/d6' + _0x2d61ef(_0x353f4c._0x42efbd) + _0x2d61ef(0x263) + 'y0am+sqP2F' + 'LPRpkFerId' + _0x2d61ef(_0x353f4c._0x4493c2) + _0x2d61ef(0x4a3) + _0x2d61ef(0x10a) + _0x2d61ef(0xeb) + 'O+DyNPT7oZ' + _0x2d61ef(0xa76)) + ('oPQCqG1Nh/' + 'baCBphYHYT' + 'OFI9x+y9Hi' + _0x2d61ef(_0x353f4c._0x3dd1e4) + 'MPr1qy9MAc' + 'KHmLB6zKUA' + 'hFscSWKjRq' + 'UiO+rIiNfS' + 'UbiqjS1hyK' + 'b1GB55qbP+' + 'VfvbJYbMqf' + 'ZTHiUCzIlA' + 'ihQtlPxXNn' + 'bi1/Zj7brL' + 'n+rPmt+xAq' + 'La/O96/76A' + 'dv3X8Tatm0' + _0x2d61ef(_0x353f4c._0x1a9474) + '1iP0KtPah6' + 'UMMGMsCeFk' + 'rrgPab91u+' + 'C9ajw99YVm' + _0x2d61ef(0x760) + _0x2d61ef(_0x353f4c._0x165e07) + 'wsUEBEeKhZ' + 'ixoApFoUw4' + 'YCAkVM7Fx8' + _0x2d61ef(_0x353f4c._0x1ae850) + 'ukTO49eKdm' + _0x2d61ef(0x81d) + _0x2d61ef(0x375) + 'bctB5U/M88' + '/TnfvKoLoM' + '2jOry2yrj/' + _0x2d61ef(_0x353f4c._0x37e0a) + 'EwB63Y3hht' + '4eBoPPbUZ7' + 'Apjx1JXKqf' + 'cNNiW+OdYj' + '1nl7h38oKm' + 'ApCrenX+fg' + 'EILClExjAc' + 'hFelEDI7Ak' + 'I00VkeFHiK' + '0F0FggcQ0K' + _0x2d61ef(_0x353f4c._0x4fcd1f) + _0x2d61ef(0x6b4) + _0x2d61ef(0x7ed) + 'fnOp/tHoZg' + _0x2d61ef(_0x353f4c._0x246303) + _0x2d61ef(0x657) + '0Xd/fdO/Sg' + 'hBSzFNj0yy' + '/CO7JxXRtW' + 'UYqieQhaks' + 'bejwCVsWtH' + 'x7rNHIYtsb' + 'VvwlQis8z1' + '13YVkMKPTJ' + 'XVUoalAAOb' + 'cxm31DlSNC' + 'I2SLIKHMQl' + '4HlQKhpLTO' + '9k7OvzpSfr' + '724J1jWaCq' + _0x2d61ef(_0x353f4c._0x1a1277) + _0x2d61ef(_0x353f4c._0x4d0f8d) + _0x2d61ef(0x2f6) + 'oZbaHN3/j6' + 'pssbrGYtND' + 'oSGkZuCn+O' + 'KtZIPgcDxe' + _0x2d61ef(_0x353f4c._0x346045) + '8dxrH3xr2R' + 'Qm+bYV1ggo' + 'oFBY8dhdr3' + '3oM7tdmKEC' + 'RVJAgBoQfS' + 'iHCkSfyugq' + _0x2d61ef(0x55c) + 'XRCwpQIgo+' + 'ocalLFry0L' + 'ndT7YXPfds' + _0x2d61ef(_0x353f4c._0x52610a) + '2v9vvBe1ec' + _0x2d61ef(_0x353f4c._0x59b935) + 'xZCDGxqiFr' + 'VsHU2UOmEB' + '3SEKqesRue' + _0x2d61ef(0x491) + '9i6bvGIHTZ' + 'wRIur4RvjT' + 'WpfNwKEhFx' + 'RypAr3307j' + 'cq99VVCooK' + 'IMooNAUFae' + 'kDRZaEPtGs' + _0x2d61ef(0xcde) + 'JapApIirAr' + 'NrFBuH6atf') + ('3Dm7tfYPEl' + _0x2d61ef(_0x353f4c._0x53cedb) + 'urfh+9+pMZ' + '057ZBPuQpB' + _0x2d61ef(0x5aa) + 'F7iejfxaC0' + 'EojQB/L7yz' + 'PD2qgR201D' + 'xoDqbaIVgc' + 'wH27HFKLvz' + 'XWo2/v/Q+J' + _0x2d61ef(0x346) + 'XvGG4JiIIk' + 's2SqIouoZi' + 'RFdCiggCgq' + 'igRipSgIDL' + 'd5r0AFyplF' + 'tKpA/HzCxN' + 'wbpp/b/VuL' + _0x2d61ef(_0x353f4c._0x277c08) + _0x2d61ef(0xaa2) + _0x2d61ef(_0x353f4c._0x3be9a7) + 'lfqK6uRtBl' + _0x2d61ef(_0x353f4c._0x395804) + '2wnUfFQ4dM' + _0x2d61ef(_0x353f4c._0x2ad48c) + '6CITvYu4K8' + 'XS3GzM5+kz' + _0x2d61ef(_0x353f4c._0x4d9c70) + 'RnyGDIvsyE' + _0x2d61ef(_0x353f4c._0x2c79e5) + _0x2d61ef(0x1d3) + 'IhjhR0Boyl' + 'iKCaKCVtiu' + 'ni1Xq8KMqh' + 'DS2pQmPFDt' + _0x2d61ef(0x26d) + 'Phvay40Ac3' + '/s1Emrp3y0' + '8gXtspVl1W' + 'WQtBIpW00L' + _0x2d61ef(_0x353f4c._0x3a2b0b) + '9uaoQnXvn9' + 'Vat2hY6gGL' + 'ZDV9ssPzOI' + _0x2d61ef(0x965) + _0x2d61ef(0xa38) + 'VPxLBytuRC' + 'QUfWN4RwAx' + 'SQg1R+NEF4' + _0x2d61ef(0xb7a) + _0x2d61ef(_0x353f4c._0x4891d3) + '59dHHjTTPf' + '7ZDXr2+h5q' + 'tVr1ywi4/l' + 'zpw86u0tvQ' + 'c20aymQbUU' + 'fsgqd0DZJz' + 'OvBP7dMmTg' + 'lUw8FZDM6p' + _0x2d61ef(_0x353f4c._0x9883c3) + _0x2d61ef(_0x353f4c._0x4b0ffb) + _0x2d61ef(0x559) + _0x2d61ef(_0x353f4c._0x312da9) + '7zx9JV8G2x' + _0x2d61ef(0xc56) + 'OdV73J0CJ1' + 'rY/m11bFcI' + '+KkGPR9moy' + 'SiEFREZ+WW' + 'kExUfi5uZN' + _0x2d61ef(0x7e2) + '/cC8tge/n2' + 'T2c3rn/bfL' + _0x2d61ef(_0x353f4c._0x241e6a) + 'SP/cnmutGp' + _0x2d61ef(_0x353f4c._0x4c2fe3) + 'KGvxgRPe3j' + 'ptBeGRgcvK' + _0x2d61ef(0xc3d) + _0x2d61ef(_0x353f4c._0xd5e682) + '4xoGiw9P/X' + 'zFX/S4vSuN' + 'D0Kw2G7X7H' + _0x2d61ef(0x11d) + 'a9+Wh8/bem' + _0x2d61ef(0x25f) + '3VX4PmcYCK' + 'Bcsf0BS0kD' + 'KEB432hrDP' + 'cxSiGmdkFs' + 'zBF0rbVJfH' + 'PUGxXppBBs' + 'ozpGwVU3bJ' + 'nZNEqdVxa3' + _0x2d61ef(0x770) + _0x2d61ef(_0x353f4c._0x4d8eb9) + 'ZrHkY8G+/1' + 'zBfFaf4+kZ' + 'ayrm0PZMJp') + (_0x2d61ef(_0x353f4c._0x2bd46e) + _0x2d61ef(_0x353f4c._0x224901) + _0x2d61ef(0x149) + 'ghG2oL0+A9' + '0dCNo1YcJB' + 'NCW/FdYVSy' + 'qbDjRn837T' + _0x2d61ef(0x949) + 'C96oZHp+Sr' + '4F5+db1S0k' + _0x2d61ef(0x99b) + 'qyaib5z2+0' + _0x2d61ef(_0x353f4c._0x325936) + 'NKGIFcuSms' + 'LdhxdlOWhc' + _0x2d61ef(0x1e7) + 'd14oOZP3/m' + 'fdI8rwqAOm' + 'OFTaSgsWz/' + _0x2d61ef(0x412) + 'atLsjEf8jP' + '+f5/12e+Vg' + _0x2d61ef(0x8ad) + 'q96qoRhRxM' + 'IuMBI69L3f' + 'dk77/NthXb' + 'jFNHlsFgcc' + 'bfFtffXO0h' + 'XMLLJqzu4L' + '5usU3HVXpL' + 'yqC2hCyQ7E' + 'qoiqa9eEx5' + '1vQe9wKF0e' + 'RbY2/hryd+' + 'T6msKVo2bO' + 'mlQrgELAQt' + _0x2d61ef(0x72a) + 'B0ATvqG1HJ' + _0x2d61ef(_0x353f4c._0x37f781) + 'BxY1lgMw2j' + _0x2d61ef(0x809) + 'xluQsCFIo3' + 'DNXo1fOcSE' + _0x2d61ef(0x1a8) + '4H33rjQfO3' + '3K/tb7Q7sy' + 'wxnsRyc6fC' + _0x2d61ef(_0x353f4c._0x315984) + '6wiyOCKO4q' + '2vur/QKIkg' + 'ISIx8Zb65c' + '/5dP/2m1zf' + _0x2d61ef(_0x353f4c._0x5ed4a0) + 'Yyml1Lpij2' + 'NsytroDosK' + _0x2d61ef(0xb6a) + 'C2neCDpnKg' + _0x2d61ef(0x3b7) + _0x2d61ef(_0x353f4c._0x5680e4) + 'N7WhX4gvVT' + 'Ft69zUsrik' + '5WicZe0Oz4' + '1cejSod2qQ' + 'GjOZINgM9m' + 'brkXd5jFZ/' + 'K6xb5z7rKF' + 'FERaHksrIX' + '7/rXoSsijF' + 'WTIl8QDkCr' + 'HZ/jYFoUNS' + _0x2d61ef(_0x353f4c._0xf3191f) + '89zeFTzpx9' + 'm3KLU+/SjM' + 'vD8ad8ki+G' + 'g85nhxMX30' + 'ddo8FrN4GN' + 'dFHw4y4W9Z' + 'd62ZEY37Xk' + _0x2d61ef(_0x353f4c._0x52cb8a) + '/kL+nStWUB' + '6jMSNuqfRd' + 'c817KcOD0D' + 's0zoPdHrRH' + 'nR88Pch5/U' + 'Y83GtOnT6P' + 'Y3a8KkzYuW' + '5XeHp4NapY' + 'bf0rF5bUmM' + 'ZruwMZrp0a' + 'OnfKefqufS' + _0x2d61ef(_0x353f4c._0x4499cf) + 'rQnOPWERuG' + 'dV4ZY5C2kM' + 'XLWiwpHmgx' + '8dHncNyWNO' + 'TTUALWfsWs' + 'XDiou2ls1d' + _0x2d61ef(0x4dc) + 'ydAMj3/9M7' + _0x2d61ef(_0x353f4c._0x516bc9)) + (_0x2d61ef(0x652) + _0x2d61ef(0xaf5) + 'bjRNM3oOv5' + _0x2d61ef(0x671) + 'AZK7vK9i+4' + 'CkSFRu+6sW' + '0ngbwCPsPy' + '7kazu1FUTD' + 'vl9e1VS4dw' + '7v+sEI+naP' + '+i9C979o7c' + _0x2d61ef(_0x353f4c._0x3510ce) + 'JJz59zTWrt' + '83l8flVVAa' + _0x2d61ef(_0x353f4c._0x39c32d) + _0x2d61ef(0xbd) + _0x2d61ef(0x521) + 'GWTR89v/sr' + _0x2d61ef(0x40e) + 'Fa67zl4kmo' + _0x2d61ef(_0x353f4c._0x360168) + 'Xw62yd+Srt' + 'H0X5hRt6Cm' + 'UUSIkpYVz9' + '9VWgmguEIr' + 'du1zaKW7Sm' + 'pjDzzdmMXr' + _0x2d61ef(0x6a1) + _0x2d61ef(_0x353f4c._0x432b2e) + '9M3X5uqCVF' + 'ciq8DT6GNd' + _0x2d61ef(0x7e4) + 'dWDaQn2nzr' + '9Bmf39ZIGM' + _0x2d61ef(0x5c2) + 'becaxpO9Z4' + 'oLbtLvDe5Q' + _0x2d61ef(0x22e) + '3eeGCw1fQN' + _0x2d61ef(0x97a) + 'XQJ6Ii6bqz' + _0x2d61ef(_0x353f4c._0x391729) + 'T/DPl5sGOf' + 'Tp/q+o1/04' + _0x2d61ef(_0x353f4c._0xce5d19) + _0x2d61ef(0xbad) + _0x2d61ef(0x237) + 'eGUQBG2SdW' + 'rq/p+v9Y+F' + 'RiBVUF1dVY' + 'Wuzb7Zdzvg' + 'vOdN+bhhGV' + 'SA8nKHhY4s' + 'thAIDQMYeW' + 'PhFeW/d00S' + 'h8RH5KZq9o' + 'zkrJv5MfDt' + 'sIrhyfNagD' + 'LTUFVEWSwp' + 'dri7Djk1K8' + 'DBHwHsWWJx' + '7FrffS2/cv' + 'nWsaGU0tI9' + '134tUiQsX2' + 'rbXU1U2SFj' + _0x2d61ef(_0x353f4c._0x406c29) + _0x2d61ef(_0x353f4c._0xcb3712) + 'FE9AqpnxMG' + _0x2d61ef(0x97d) + _0x2d61ef(0x427) + 'uzTXpOw+qJ' + 't1ovfQSGVq' + 'ycXvRXiHiD' + 'drDr4aNNe7' + '4l1q3WuWQx' + _0x2d61ef(0x23e) + 'tAF01T0i+O' + _0x2d61ef(_0x353f4c._0xc628ee) + 'ePfxSWwZix' + 'truWek9GU0' + 'IIOfYBrsrC' + 't3fKLgAnyJ' + 'QKtRMWThla' + 'vm4331adWQ' + '1QBQVlZQxt' + 'VvnWKbcTqE' + _0x2d61ef(_0x353f4c._0x35ce06) + 'LLJZPyEUtQ' + _0x2d61ef(_0x353f4c._0x572c1b) + 'ZyB9KMcDD/' + '82pU77dj1m' + _0x2d61ef(_0x353f4c._0xe43a94) + _0x2d61ef(_0x353f4c._0x4f273f) + 'Xr/bCy5p5z' + 'RvRc12N2+K' + 'z/r86T3vwF' + '8/FIl4AlCg' + 'EbAsXwlwzh' + _0x2d61ef(0x476) + 'feeRnF0xn8') + ('SsSrHWpZHM' + '9ulmmo9bEg' + 'iav1BVDpTo' + 'Hy1scrLIKZ' + 'RVL15ZVtCu' + '3+n6y7LeIV' + 'SItFlg1R8B' + 'hg4/eNn3oz' + _0x2d61ef(_0x353f4c._0x985fee) + 'DVd9O7rOBv' + 'WyCT5tAoZA' + _0x2d61ef(_0x353f4c._0x46f34f) + 'CQJ/fckHp1' + 'Xj13jbpX4Q' + 'mA9drvfW5I' + _0x2d61ef(_0x353f4c._0x4457e0) + 'XtzYorxgUe' + 'rOnt9fXW1D' + 'jH/fDNiEFc' + 'wl/05WeNpg' + _0x2d61ef(0xae5) + _0x2d61ef(0x4f5) + _0x2d61ef(0x824) + 'Ls6+WwTfM2' + 'hSQFX74l5a' + 'nZnp5MXLo/' + '/WBJW/BDD3' + 'CnDol6ufLi' + 'l6SRyZ/hAU' + '3g/fDusq+B' + '9lR3yDnjB1' + _0x2d61ef(_0x353f4c._0x2dfeef) + _0x2d61ef(0x779) + _0x2d61ef(0xb01) + 'lG1KjwZZEI' + _0x2d61ef(_0x353f4c._0xb462ae) + 'iDvXufPa87' + 'XFtbW7s//G' + _0x2d61ef(_0x353f4c._0x3c56c5) + '7e/HbvLpdQ' + _0x2d61ef(0x906) + 'C655f88qr6' + '+trLq9mlZV' + 'QVk5vFhVlX' + _0x2d61ef(_0x353f4c._0x30157d) + _0x2d61ef(0xc4f) + _0x2d61ef(_0x353f4c._0x9a2236) + _0x2d61ef(_0x353f4c._0x4b85dd) + '2Xr7/mgyIp' + _0x2d61ef(_0x353f4c._0x918164) + 'v+1I+eXJeZ' + 'wbzRRsAAiy' + 'yBQIt1Qbts' + 'ftGSejBlxx' + _0x2d61ef(_0x353f4c._0xb5fc90) + _0x2d61ef(0x2c5) + 'yF0P66wqrJ' + 'Uy5wu93uxe' + 'dVwfZw4fs5' + 'yyjayNaLej' + 'nA2EaRogii' + 'BLov65nhn4' + 'fzvVU0s6y8' + 'HLVs9a3l5e' + 'ubN2y9qKol' + 'C5VOOea5qg' + _0x2d61ef(_0x353f4c._0x8bb38b) + 'e3fPB/KCxI' + _0x2d61ef(0x187) + 'aHut9dvW1I' + 'ZN8xat/eRG' + 'h1kpYTEyaC' + _0x2d61ef(0x9a5) + _0x2d61ef(_0x353f4c._0xc566f6) + 'i5aZvt0Wup' + '4eyxTweq3/' + 'MBHEqKO6/e' + 'lqNr+X1/rZ' + _0x2d61ef(_0x353f4c._0x211e0e) + 'vDwFsqli5g' + 'zfOIxTVVRK' + 'iqh6L6a3PL' + 'd46qLZ66Ec' + 'A+CoaavLoI' + '08f/5H3Hzf' + _0x2d61ef(0x3fb) + 'ZtHX7fUohM' + '6h5cZjnxAV' + 'h2/YldomeI' + 'lTdPM6+70x' + 'EzQg2J8LYs' + 'MRcdFFctoW' + '3ZFMxNB99M' + _0x2d61ef(0x70f) + 'rePeNWWscs' + _0x2d61ef(0x181) + 'wLzCiiauKo' + _0x2d61ef(0xd39) + _0x2d61ef(_0x353f4c._0x50e5c4) + 'HFzo9cqKq8') + (_0x2d61ef(_0x353f4c._0x50a8b2) + _0x2d61ef(0x6a4) + 'vYMCuqyzat' + 'n462IilL+D' + _0x2d61ef(0xa48) + _0x2d61ef(0x85) + 'TrDHlY2elY' + _0x2d61ef(0xccf) + _0x2d61ef(_0x353f4c._0x4f2dd3) + _0x2d61ef(0x207) + _0x2d61ef(0x54e) + _0x2d61ef(_0x353f4c._0x383650) + 'frnr34J8Ii' + 'c1NRvCYGio' + 'hQJRpTi3TH' + '3J8/cOQ5z0' + _0x2d61ef(_0x353f4c._0x3a53c7) + 'J8tynUrq6L' + 'hd+o9+eXPm' + 'nnWbmUnMzF' + '9AzUP/s3Xa' + '5raxrMAYoK' + _0x2d61ef(_0x353f4c._0x40fdb6) + '4i9/fjGcLa' + _0x2d61ef(_0x353f4c._0x187ff0) + 'TgPLuBn7ED' + 'eurGq7VChg' + 'kooXAHbR+Y' + '/rvqs0LaJt' + _0x2d61ef(0x58c) + '380Pet88ym' + 'omiBDD5REp' + 'VGEBtlcEOd' + _0x2d61ef(_0x353f4c._0xcd9a9c) + '4WAV2s6lop' + 'E95U8AKoZp' + 'FOOC+88sNq' + 'OhbKqwBzdN' + 'VlZQBzNnG6' + '8owPZXE1uk' + _0x2d61ef(_0x353f4c._0x309dfa) + _0x2d61ef(_0x353f4c._0x4726b0) + '3d9UHq7RBX' + 'sGguEXVQ0Y' + 'KyejWTrGKU' + 'VMEF8UmWRz' + 'e9u9ZZ6Cyu' + _0x2d61ef(_0x353f4c._0x225a14) + _0x2d61ef(0x66f) + _0x2d61ef(0xbb2) + 'z2ecQSB4CJ' + 'K7z+N7V7ln' + 'GXD5llaqCi' + 'qmK81esC2A' + _0x2d61ef(_0x353f4c._0x2f361b) + _0x2d61ef(_0x353f4c._0x30c0b1) + '6I6moYM3fb' + 'zG6aBVCNSb' + 'GyzDayxgbP' + 'PmehzWcN6+' + 'VTv7wwqgsY' + 'w+/LZwhoQY' + '1r3UjxkQwi' + _0x2d61ef(0x126) + 'mypkj39sKH' + _0x2d61ef(_0x353f4c._0x5d2ebe) + 'QT7zSiNVBr' + 'hBdBqXCIqi' + _0x2d61ef(0x74e) + 't3+wyfrqJ3' + 's0FyB/yyqm' + 'vECLmqS3rj' + '/wEHjH0uoy' + _0x2d61ef(_0x353f4c._0x35e7d7) + '65aN/+fCQq' + 'ql1OK6Y9G1' + 'wHj1el3wHr' + '+b9ZmEFwl+' + 'ITRUISGoHg' + 'H11IJEy/Ai' + 'gU7wQl2qK8' + 'Ky53X7BJnD' + 'pv9s9iE2Of' + 'A1D8tVaQMf' + 'zNPkQW8fdl' + 'IitCLH/uZd' + '3Pac+ck4cR' + 'egqqBCoReI' + 'sVFF5/Z3jT' + 'M1wh6hfKXH' + 'SoBidx6G0k' + 'GwqMEFsjWT' + 'j2TVho+eNZ' + 'w9prvTxuKY' + _0x2d61ef(0x76b) + 'Kz7e5fePF0' + 'WPC2WVJCk+' + 'EcS9Juf8RX' + 'u84Nxn3g21' + _0x2d61ef(0x837)) + ('HCPkxlH2Ly' + 'qZIXXHKppo' + '2evPkebESR' + 'FUV0UaBAVV' + 'XTkmVdo6+s' + '9KxbXcWC/i' + 'xFV1adlZW/' + _0x2d61ef(0xb9b) + 'oNZXO8Vy2w' + '6T+Fs4b1fL' + 'g1a/Hnbl9f' + 'oYAXc+asxm' + _0x2d61ef(0xf1) + '0W6sZFkOh0' + 'o4/7Ls2SZJ' + 'RaYE0VfbII' + _0x2d61ef(0x5ce) + 'wDsm8hVUdS' + _0x2d61ef(0x3bf) + '7Unjc12M4v' + _0x2d61ef(0x8d) + _0x2d61ef(_0x353f4c._0x2b4447) + _0x2d61ef(_0x353f4c._0x265e54) + 'dI1ugsUYMM' + 'bI+Vbbk+1/' + _0x2d61ef(_0x353f4c._0x47e32d) + 'SKHiwUaFQU' + 'qMUaCAKA5u' + 'uzOkV+xECT' + 'KCERReJVSN' + 'PvCkwyUBVE' + 'ggkd5H0qgi' + 'gTxsSAqStZ' + _0x2d61ef(0x256) + _0x2d61ef(_0x353f4c._0x408372) + _0x2d61ef(_0x353f4c._0x5c04ab) + 'FPsPCTl0a+' + '4rzoslYxV6' + '6q2jl77pqZ' + 'z0Fbb1mZUY' + 'JO6ai/wFnD' + 'mlfRPocISi' + _0x2d61ef(_0x353f4c._0x71cd19) + _0x2d61ef(0xb1d) + _0x2d61ef(_0x353f4c._0x2b124c) + 'cFpWb7guHj' + 'XipriLE8lm' + 'Frxhex2gVt' + _0x2d61ef(0x2f0) + _0x2d61ef(0x64d) + 'S8oiKrLhnU' + 'JoyqWj3cXT' + 'OgaQ3XH6B4' + 'sbzsPqApW6' + 'Zu8DEfHq2c' + 'bNiw4exh3Q' + '6vkQkAOcyA' + 'aDTSx3jhIm' + 'gcB7xbFBVR' + 'rFQgWxTAp6' + _0x2d61ef(_0x353f4c._0xd91b8d) + 'AUpkgjypuB' + 'Sf4gYFhZqM' + '5ocIPs3rdV' + 'V665D5ZUoX' + '3bZqDBAFKv' + 'CT6xIGplwD' + _0x2d61ef(0xbe) + _0x2d61ef(_0x353f4c._0xe78f9f) + 'wK3Vc+7muR' + 'CLM6LUam6x' + '6h1nBetL+G' + 'U4bOIbFJHK' + _0x2d61ef(0x25e) + 'oDRLgUpgB6' + 'tbKEeToFFE' + 'l0md5NWThB' + 'QGaXKwTFBw' + 'qRxQrRQ0S3' + _0x2d61ef(0xa1c) + 'q/rqhCWMLs' + 'kji5tLhiIn' + _0x2d61ef(_0x353f4c._0x1c7c9f) + _0x2d61ef(0x473) + _0x2d61ef(0x43d) + 'vizLTLaXQf' + _0x2d61ef(_0x353f4c._0x5f41dc) + 'UAZzl70Az5' + 'wNrHm3rljx' + 's97KmQv8uN' + '0kcBk5KdQd' + _0x2d61ef(_0x353f4c._0x5c572f) + 'FihhoBIk/Y' + 'tfrLKZSDAp' + 'coKTK4WLYd' + _0x2d61ef(0xd3) + '5AZFF05UGV' + 'ykONpPhUGa' + _0x2d61ef(_0x353f4c._0x344136) + 'oMRJ3BTkGG') + (_0x2d61ef(0x789) + 'L/PAKmyYZY' + 'vpVSdFwuKz' + 'KoxF7SsvPx' + 'tYm7sW/+ah' + _0x2d61ef(_0x353f4c._0x34eee1) + _0x2d61ef(0x370) + _0x2d61ef(_0x353f4c._0x22c39b) + 'HTKN4ARRVb' + _0x2d61ef(_0x353f4c._0x4e4e69) + _0x2d61ef(0x132) + _0x2d61ef(0x5b0) + '2yTxRdMnKq' + '1wFSLTfnyw' + 'JdKVFBohII' + 'u8ehqKOyIF' + _0x2d61ef(0x51b) + _0x2d61ef(0x3a3) + '//+DrmoifQ' + _0x2d61ef(_0x353f4c._0x9b6223) + 'gyUl1G89Cn' + _0x2d61ef(0x1a5) + 'Uu3yMf/i2y' + 'eVMd5XRqLp' + 'VZ9Y5XEGWA' + 'TcCBqDQKik' + 'ihoFbKFks5' + 'r6px8UaoAC' + '+jtALL1Vqs' + '6ZIrVEXGJK' + 'RSAUqdOInA' + 'X3cQWSCqqA' + _0x2d61ef(_0x353f4c._0x38ac1d) + 'mXhdcp2sQV' + 'gipe7SGlnR' + 'lOvfWzHbx8' + _0x2d61ef(_0x353f4c._0x526096) + 'mSHniyxlV7' + 'VvldV2ZljJ' + '1/p0PU7Xv6' + _0x2d61ef(0x317) + '2Saa7yunMK' + _0x2d61ef(_0x353f4c._0x461c08) + 'iTy/fncc3A' + '2srAkNQSH2' + 'aAU3Ni4o4P' + _0x2d61ef(_0x353f4c._0x27bc5c) + 'iqzYCyWsYF' + 'QWK4Rbr12i' + 'gohKWAWvQ1' + 'SI1+GqQ4Gm' + 'EEHhnLJkoz' + _0x2d61ef(0x928) + 'UxfF0WoqQ+' + 'fuxVth43od' + 'uHlz2PUFHt' + '0pvHzTWaAr' + _0x2d61ef(_0x353f4c._0x45d9f4) + _0x2d61ef(0xb05) + 'Tzzvdqzf0F' + 'pXzO2Mjxfk' + 'Ymf5Od6Jot' + _0x2d61ef(_0x353f4c._0x20ba92) + _0x2d61ef(_0x353f4c._0x5adbbb) + 'VEHWqxSq+2' + 'VgGvqBBBRH' + '5QBFmRXSrm' + 'vIj5U6/gYt' + 'ELQXC4JZ/g' + 'EGXwCnUyoS' + 'DSZEn21Egy' + _0x2d61ef(0x122) + 'tY2FZF0d6v' + 'rr4Vqpzz+Z' + _0x2d61ef(_0x353f4c._0x484ae3) + '6ONnTedUCK' + 'NmXfjY/pX7' + '/5E7HR7e/u' + 'lvP1yxft34' + 'Ohq/ru3KH8' + 'V2Q4NIZQV8' + 'DSD5Clo4qz' + 'ObiiJB7aLI' + 'IIsikSVFpI' + _0x2d61ef(0x5d5) + 'KVPJB+LEWW' + 'oLrfNRqpIi' + '8Hkqnai3aY' + _0x2d61ef(0xd09) + 'BkmS3TUASt' + _0x2d61ef(0x2e0) + '3ohGcRlAeR' + 'bwW4gD241Q' + _0x2d61ef(_0x353f4c._0x3e31fc) + _0x2d61ef(0x4fa) + _0x2d61ef(_0x353f4c._0x2c042e) + 'ac74O9kVjX' + '6Et5PzfjwQ' + 'VzY6zwHas/' + 'BID4+Hl3FI') + (_0x2d61ef(_0x353f4c._0x45ae48) + '1F+6piBT+5' + 'zIwwRKZPlq' + '+f77LTqakU' + 'RgkQ0CglSH' + 'Vr6rjpq1iX' + 'pYdkPYCjWl' + 'ENt9l23ciF' + _0x2d61ef(_0x353f4c._0x2fb45a) + _0x2d61ef(_0x353f4c._0x5c2b54) + '4OPP1hxJR0' + _0x2d61ef(_0x353f4c._0x18cc7d) + _0x2d61ef(0xa53) + 'LfzqL2yukt' + _0x2d61ef(0x66c) + _0x2d61ef(0x4e6) + 'VkEMZT+uRT' + 'XCutUwBLfi' + 'gAXcJUE2EV' + 'a8vdtSAJ+F' + '6BciDVy7Na' + _0x2d61ef(0x135) + 'a5SJU6LxWJ' + 'WIuh7YhHlj' + _0x2d61ef(0x95d) + 'zpU1WkEV+u' + 'ysgA2ea0uH' + _0x2d61ef(0xa08) + 'fg3DNBCmeC' + 'VT4MvnZT29' + 'z5c/c0Njen' + 'R54Kh38xfA' + _0x2d61ef(_0x353f4c._0x340bca) + 'l6HqEbFYDe' + 'gTr4TvarfG' + '/RwvjBdFIq' + 'ogenwuUXFh' + 'eanoXbLcJS' + 'qyWIRIPIo6' + 'sXDKW1oxUK' + 'ekVICPUBBE' + 'Ag5QBCC0BM' + 'AquWWIyFAK' + 'boiR4putM7' + 'hyI/+Kqzzr' + '1q0Lf9lcnV' + _0x2d61ef(_0x353f4c._0x37a2a9) + _0x2d61ef(0x76c) + 'zbMWsuDxAG' + 'eKo1GwD2ZF' + '25Y9dEw9KV' + 'nEqc7n7s0U' + 'Mjc86Nb/L+' + _0x2d61ef(0x337) + _0x2d61ef(0xc3a) + _0x2d61ef(0x6e5) + 'EIuIXlQOl4' + _0x2d61ef(_0x353f4c._0x4aec08) + _0x2d61ef(0x91a) + 'GXx1aA2HwW' + '0DdwRoqcz9' + 'ZMb7j74fqG' + 'JQmc++3kc5' + 'zWlsQCqYzx' + 'bWBUKmLzse' + 'yM7UWoSs8h' + 'kR+IUtnG2D' + 'Vlv2C+lbJz' + 'QwDlaKKOHm' + 'LTBZLnr+g9' + '89srzSFFHX' + 'tfzxvRjHj5' + 'eW1BCHrCyh' + '6J0LIkiuWp' + 'ESj1yhQWT1' + 'Ti8QcbmzUg' + 'CvCBVQp3ig' + 'YonXAVCILW' + _0x2d61ef(_0x353f4c._0x18efbd) + 'Oxo9f2lkzr' + '47B1qHy528' + 'TsbMqy4vb4' + _0x2d61ef(0xb80) + _0x2d61ef(_0x353f4c._0x14b4f3) + 'mtrQDZpKXl' + _0x2d61ef(0x915) + _0x2d61ef(0x6dc) + 'MUDhA1GJm2' + 'bNrH44K0Le' + 'Wzx++5ujTL' + 'smj1rPc7o3' + 'nwPT1TUNhD' + _0x2d61ef(_0x353f4c._0x5e5aa6) + 'yVcrAPhzJJ' + 'XKDuoEwaGi' + 'nyiqQi0Bnx' + _0x2d61ef(_0x353f4c._0x534bc0) + 'FGrcHile/N' + 'aYwzNIPktI' + 'YrQps+C3v5') + ('hy/9wyeDFn' + 'OJzh4r7+Lf' + _0x2d61ef(0x6f5) + 'CRCfDwC/CI' + '9rhfA427hV' + 'I50TvCD4FH' + 'ChuKVxfb/T' + _0x2d61ef(0xabc) + _0x2d61ef(0x4ce) + _0x2d61ef(0xc1b) + '7OW1dKcReD' + 'SmqY24uxZQ' + '2sP0LLfwmQ' + 'EqzNdKPHS2' + _0x2d61ef(_0x353f4c._0x452907) + 'NVSGGlLqAW' + 'uyFt3/3pe6' + 'FzBIUVZd1g' + 'grNyETt8Gt' + _0x2d61ef(_0x353f4c._0x49d514) + '2Tt2fljo2z' + 'AvFMbHx5dZ' + _0x2d61ef(0x1f5) + 'AWyZvSiGpc' + 'BMo4BLVgi3' + 'btP5jbx9WH' + 'fyoSZCV91d' + 'CuG9ERrvcJ' + '6X4TfT3MJd' + 'hXEgE+thQp' + _0x2d61ef(0x4bc) + _0x2d61ef(_0x353f4c._0xffc706) + 'HeAW+FrAog' + 'V9SaC2OatQ' + 'YLOiUZJHxU' + _0x2d61ef(_0x353f4c._0x3d971b) + 'QZKYBqKNu0' + '4fxPfoeaat' + 'mHacyzPxs8' + 'PHZlxfn7xv' + 'DAt2KQZ+Se' + 'H3SAbc9TNl' + 'gzdwEFV613' + _0x2d61ef(0xb64) + 'lVdfJLuS1f' + '2dNna9ptz1' + _0x2d61ef(_0x353f4c._0xc21c65) + _0x2d61ef(_0x353f4c._0x3a84b8) + _0x2d61ef(0xf0) + _0x2d61ef(0xc5e) + _0x2d61ef(0x88f) + 'HlB8zhLZWQ' + 'lOxaXUili6' + 'RsAqgbXG7Z' + 'EBCwXm/zNs' + 'N2VnQVV5GT' + 'p21eWOv8Xv' + 'nzt747rl2M' + 'J3lnj4nfVv' + 'fzHSnAmt2e' + '2t7TcfHvsk' + 'hPc8Hx61ef' + 'y8CY1UFh2e' + 'OsUlykAdUE' + _0x2d61ef(_0x353f4c._0x1a15ca) + 'vTmxZvLrP8' + 'wpnnbE3LRj' + '5WFXyYpZi6' + 'G2fPsj79zy' + '+seRdZvXbW' + 'zecHiKTmPg' + 'VIEsJ5gRqQ' + 'PB6QRS6wZQ' + 'eA2ou0a2ES' + _0x2d61ef(_0x353f4c._0x9f21fe) + '/oZ3qzZhPB' + 'GgsQrKqJfO' + '1JzgzMm1fs' + 'KfJayRyDx9' + 'H7dWyja1Ap' + '/pP3xu6pO2' + 'cWD716ybgM' + 'PKZwwQyeAE' + 'cCuVcB8MY2' + 'MlHFk5S8d8' + _0x2d61ef(0x350) + 'OMCxesgzvC' + 'ra8VPuMaOT' + _0x2d61ef(0xb82) + _0x2d61ef(_0x353f4c._0x3fd267) + 'R1Gi2h4CyV' + _0x2d61ef(_0x353f4c._0x1bb329) + 'hyopCITa7x' + 'SBD2yJhrKP' + 'UA0TKXhqsx' + _0x2d61ef(_0x353f4c._0x1c2191) + 'lmONLcxtUQ' + _0x2d61ef(0xc20) + 'po/h+6c+yP' + 'mzIyIbs9e0') + (_0x2d61ef(_0x353f4c._0x54b7db) + 'xjEXtF2slh' + _0x2d61ef(0x7af) + 'KngtGp27CF' + _0x2d61ef(0x665) + 'E8ug/sZ9gZ' + 'BtHGTf0fqL' + _0x2d61ef(_0x353f4c._0x75209f) + _0x2d61ef(_0x353f4c._0x21cfe5) + 'Q088uMlv4k' + 'TBW+OkNQ6M' + 'xoAqeSUwY0' + _0x2d61ef(0xafc) + 'qcZW43Z74s' + 'VvbbA0bWjr' + _0x2d61ef(0x8df) + _0x2d61ef(0x26f) + 'ln132UTgzr' + '2fdaWn9M7D' + 'OQqZ+7P/Pj' + 'byUUrZPKKV' + _0x2d61ef(_0x353f4c._0x2b9dbf) + 'LYt1Ba92TP' + 'j7BSFFdrth' + _0x2d61ef(_0x353f4c._0x4271c9) + '4V/8Dt3McO' + _0x2d61ef(_0x353f4c._0xa6d681) + _0x2d61ef(_0x353f4c._0x37ecd7) + 'mEuuoo+n8y' + 'qhpBBa/TlK' + _0x2d61ef(_0x353f4c._0x38a1b8) + _0x2d61ef(0xc61) + 'Ljh++fOGZj' + 'Hgqxi/ZmEf' + _0x2d61ef(0x2b8) + _0x2d61ef(0x5b6) + 'O96J15TqG5' + _0x2d61ef(_0x353f4c._0x47ebeb) + 'uqWss7dc/I' + 'SbMn1WL7hl' + _0x2d61ef(0xcc) + '5wSBRh5YUr' + '0UWvnM1uxW' + 'bgxGzLOBO7' + 'D7oZ+N2/P8' + '72zhXzwVtu' + '0Zt3Lq0aGB' + _0x2d61ef(_0x353f4c._0xe4897b) + 'gICqFoOFIC' + _0x2d61ef(0x728) + _0x2d61ef(0x139) + 'gVSWLPwzN5' + 'YvorlxgAPR' + 'eWPj4yL3Tv' + _0x2d61ef(0x10e) + 'zK5U+848/K' + _0x2d61ef(_0x353f4c._0x288a6f) + _0x2d61ef(0x569) + 'Ys3fipZ84l' + _0x2d61ef(0x3e4) + _0x2d61ef(_0x353f4c._0x1d8fae) + _0x2d61ef(_0x353f4c._0x223855) + '9mDLP3g47m' + 'R3Zrq7/Zcv' + _0x2d61ef(0x9a7) + '4exRFscXtD' + 'fW630nh9fi' + _0x2d61ef(0x64b) + 'ooOKHOSYm7' + 'Xtc8IKND7I' + 'Ea4sb96rZG' + _0x2d61ef(_0x353f4c._0x5ee831) + '98/vn3v1z1' + 'zNrG+wFiT3' + '0e6fIYOXX+' + 'm2LN+1k4dH' + 'so/LPevL5A' + '4q2z/TF+9/' + _0x2d61ef(_0x353f4c._0x92ad74) + 'vm1Plt+xsD' + 'D2PlUUkdZJ' + _0x2d61ef(0x997) + '2QKwQ9x2qb' + _0x2d61ef(0x11b) + 'T7OQDfHQKA' + '7Slb2GbbA6' + '22J3N2OODu' + 'A7PzflYcK6' + 'Hgg+Uolaiz' + _0x2d61ef(0xc73) + 'yPR2sjLKPt' + _0x2d61ef(0x1e6) + 'O+Hwjr3dU7' + 'l1qtmV9+/u' + _0x2d61ef(_0x353f4c._0x2637de) + 'TrNesOl/zg' + 'wsGcTDU47+' + '6lKA9FcBlr' + 'aDjb7/aqUN' + _0x2d61ef(_0x353f4c._0x423827)) + (_0x2d61ef(_0x353f4c._0x8664b0) + '0rX7HaBRUc' + 'UkI5r9rjqh' + 'z0NVgYq08e' + '/nN88Zg6zb' + _0x2d61ef(_0x353f4c._0x23d384) + _0x2d61ef(_0x353f4c._0x4c5e90) + '7Xn+jmzbOn' + '1q4/QteZ5H' + _0x2d61ef(0x844) + 'ICRFAB1YxX' + 'kh1mbeJ2d5' + 'htWCiNYICu' + _0x2d61ef(_0x353f4c._0x12202f) + 'Pdl7z38Dlm' + 'jY8Jb4J11a' + '8h/byHrM4W' + _0x2d61ef(0xa2f) + 'T/6N7HPn37' + 'rnuTsqa/An' + 'tc+QQoeToW' + _0x2d61ef(0x9c2) + 'FNAFbTqi8e' + 'Ix9lCQ7Ni3' + _0x2d61ef(_0x353f4c._0x20d853) + 'wCAGnFhQSQ' + 'TqhS/sBmGz' + _0x2d61ef(_0x353f4c._0x404398) + '2kZUThzbAn' + 'Owy/Q6iFjR' + _0x2d61ef(_0x353f4c._0x5ac39d) + 'u1nCB6RaIo' + _0x2d61ef(0x1f7) + 'uoXCCFDkYa' + _0x2d61ef(0x400) + _0x2d61ef(0x3d4) + _0x2d61ef(0x505) + 'xjzNfVoWn2' + 'yd2WIGqHmB' + _0x2d61ef(_0x353f4c._0x3a8fa0) + _0x2d61ef(_0x353f4c._0x1e719d) + 'UbFI/cOOzz' + 'ZGnmZdgntL' + _0x2d61ef(_0x353f4c._0x3020bf) + 'PiwMUFwJoQ' + _0x2d61ef(_0x353f4c._0x5d88ef) + 'RfYI350q7W' + 'lveljj/tMa' + _0x2d61ef(0x308) + 'XdGmH2B0fs' + '+ceRUX7Jur' + 'tx1qYQYmin' + _0x2d61ef(_0x353f4c._0x497d32) + 'hZTU4VNTYW' + 'xXaU1pDUg2' + _0x2d61ef(_0x353f4c._0x2df84e) + 'wVtyhyBSeP' + 'w8krmjkO72' + '39h7boQEk6' + _0x2d61ef(0xbf5) + _0x2d61ef(0x212) + '8rXXrbqxfR' + 'MBV44qliW9' + _0x2d61ef(0x384) + 'uyCOFR4iLX' + 'gUtm5WsIlA' + 'JDqbhqfRIo' + 'xLx605Af/W' + '1qfj9W1Lb7' + 'W/Xorr0/sP' + '2w58q3/7rn' + 'wuxXCj+9LY' + _0x2d61ef(0xfc) + 'jLxgGRvD7X' + _0x2d61ef(0xd3b) + _0x2d61ef(_0x353f4c._0x22b802) + _0x2d61ef(_0x353f4c._0x557c37) + 'KOLk8QvwZN' + 'UnL93dPncr' + 'u9jY7P37zx' + _0x2d61ef(_0x353f4c._0x38e863) + 'CjFz2pIagP' + '2RKy+NkuLP' + 'jeYy7P/ra9' + 'ZQML9hdB8p' + 'Lkycu+tiD2' + 'QLQ7PHtHJj' + '2tlfzm7Nhv' + '0bhdFN+21D' + 'zzkn1jIma8' + 'v85UMeJDp4' + _0x2d61ef(0xab7) + 'hwgPqcuGtN' + _0x2d61ef(_0x353f4c._0x43a6a9) + 'GwRlDDQvHT' + 'G0ZeURTDke' + 'GIFRAxkFUf' + _0x2d61ef(0x391) + 'h5OvfR14Al' + 'DGt01XOrKS') + ('LVj5fLaINP' + 'PgTQJUx15E' + 'SJgC2PGIdw' + 'e8TGbEOrsr' + 'IuBfuZFeRp' + _0x2d61ef(_0x353f4c._0x2cc0b6) + '0zHdsno/bz' + 'VeL0Vr7zy9' + 'lE3yBtg9mL' + _0x2d61ef(_0x353f4c._0x50ede9) + 'RckiqdLEqM' + 'xkRJnTVH3+' + _0x2d61ef(0xb8f) + _0x2d61ef(0x1b2) + _0x2d61ef(_0x353f4c._0x45839d) + _0x2d61ef(0xb74) + 'mncaEx88O/' + '+RouJog1zz' + _0x2d61ef(_0x353f4c._0x19a3c9) + 'pAm03HmH4O' + 'kKKbNsAtZ4' + _0x2d61ef(0x842) + _0x2d61ef(0x745) + _0x2d61ef(0x7bb) + 'dO36uRn38I' + '2UwYM/OJbd' + '6Nzk3gmNkK' + 'zS3SriPlCy' + 'iPMlh2sp3q' + 'pKLqrajDPy' + _0x2d61ef(_0x353f4c._0x15869d) + 'j2RDqGCNmE' + '0LR/5K3TdB' + '6xM/jJEBOH' + '75yqo7cJYd' + _0x2d61ef(0x10b) + 'znPP2PfwMs' + 'X8IRBDYIZu' + 'KxDhjbee7a' + _0x2d61ef(_0x353f4c._0x5cdec8) + 'NqNM5hi4pT' + 'kCswxi87mS' + '3VsPrTSLFy' + 'eLopuzW7XW' + 'M2hLF7cefy' + 'aws+FB4zT6' + 'oVZASCv4KN' + 'wgrBYelI2B' + 'JZzQPcowkm' + 'rgEo/vumJz' + 'jKM+ZNIME9' + _0x2d61ef(0xd17) + 'f6LjdWZJJP' + _0x2d61ef(_0x353f4c._0x26faa9) + 'ctAMthSVQk' + _0x2d61ef(0xb54) + 'aH4hNu0ko+' + _0x2d61ef(_0x353f4c._0x5d0b89) + 'igVkTKABQt' + 'R0nF9oMIRf' + 'WrP4040psW' + 'xDgdt6thMu' + _0x2d61ef(0x9db) + _0x2d61ef(_0x353f4c._0x124503) + _0x2d61ef(_0x353f4c._0x23cf1e) + 'mTT2SaDidt' + '0FbhqxQRhs' + _0x2d61ef(0x6e0) + 'N3T0AMyLvm' + _0x2d61ef(0xc64) + 'v+eXjO5r7I' + 'WoycjyU0cC' + 'qw7Pqi1heW' + 'GE+XLwEG90' + 'SDSofzD6Xv' + 'uGwORFtwx6' + 'LlICBGCYVS' + _0x2d61ef(_0x353f4c._0x3d6b4c) + _0x2d61ef(0x9cd) + 'WhzTAliHjs' + _0x2d61ef(0x557) + _0x2d61ef(0x743) + '1LljswrEQx' + 'c+VFAUUEVZ' + _0x2d61ef(_0x353f4c._0x59a4c5) + _0x2d61ef(_0x353f4c._0x222e60) + _0x2d61ef(0xcc3) + 'KWdaSYA6C3' + 'WkLf1b7YOD' + 'iiWuq284DV' + 'YTAFzw0XyG' + _0x2d61ef(0x3cc) + 'pZRh04nRvY' + 'wZz+GXX+4P' + '078lxe1C+J' + 'MpEGScGqEC' + 'coIsoVnwS+' + 'ilqvk2a7sg' + 'RIH5G/dV9+' + 'Vo5/zP7M9t') + ('z2KhDKMp9S' + _0x2d61ef(_0x353f4c._0x30d6ce) + 'D2CQohKiUs' + 'Z0mQsHUILl' + 'vBujZm7oPN' + 'AzCx/vdvUe' + _0x2d61ef(0xbc3) + 'bhtqGsOjIN' + 'HIOeBOP9yP' + _0x2d61ef(0xa9e) + 'RAuubtKX8/' + _0x2d61ef(_0x353f4c._0x3eaa62) + 'AC6zTn0peZ' + 'ZYeESOxPTD' + 'QpIipbEGUH' + _0x2d61ef(_0x353f4c._0x1bb8e5) + '7XCl2PrEnR' + _0x2d61ef(0xab4) + 'b6n9wKb/8t' + 'FxOmWLWFMU' + 'WUaAoQL25O' + _0x2d61ef(0xb1f) + 'XBUxqRES3Y' + 'PJItJt11UZ' + '8lS877zSYT' + 'vHq96fDiRU' + 'A0IO9+0lGE' + 'hlMfGz92Gm' + _0x2d61ef(0xcfe) + 'tg/mwFoOS5' + _0x2d61ef(_0x353f4c._0x14f8c4) + _0x2d61ef(_0x353f4c._0x2077cb) + 'ujhqzQ1Emx' + 'bJQwo9FVCU' + 'v0SgcSF0GY' + 'yN4D3KaI3j' + '0phXWORPUG' + 'gJl8Xt6EWi' + 'Zrmbsq4KwG' + '/I5WFxEjmO' + 'hpvEizkDCg' + _0x2d61ef(_0x353f4c._0x5ccbfc) + _0x2d61ef(_0x353f4c._0x3c45cb) + '9HD6jKlbpn' + _0x2d61ef(_0x353f4c._0x13004f) + '8t77UPbx4M' + _0x2d61ef(_0x353f4c._0x435708) + _0x2d61ef(0x585) + '/U4wDDEohi' + _0x2d61ef(0x8d0) + _0x2d61ef(_0x353f4c._0x5a649d) + 'qCkASImsgK' + 'tyCY4fYDqW' + _0x2d61ef(_0x353f4c._0x2ee382) + 'uxPf7FrxYn' + _0x2d61ef(_0x353f4c._0x183f03) + 'yTruHYAqmy' + 'otbnQKlkWB' + _0x2d61ef(0xc47) + 'tLG73B7kYF' + _0x2d61ef(_0x353f4c._0x64bca1) + 'wRxfvRVIXZ' + 'O5l9P3Pv5y' + 'V0zn9fcqU2' + '5IaFiDsKm3' + '//l0WCG2mC' + _0x2d61ef(0x8c) + 'LVEL968Hm5' + '61YvSbWYhU' + _0x2d61ef(_0x353f4c._0x1628b5) + 'AmKK46VlUo' + _0x2d61ef(_0x353f4c._0x89c700) + '8qvwnozI+d' + 'WQQmyQoKNA' + '8zn/EXFKQq' + 'yicv4gXwOv' + 'ddEbPUIFQ3' + _0x2d61ef(_0x353f4c._0x5c213a) + _0x2d61ef(_0x353f4c._0x576666) + _0x2d61ef(0x9ae) + 'xUmnn9vU+P' + _0x2d61ef(0xa2a) + _0x2d61ef(0x475) + _0x2d61ef(0x46f) + _0x2d61ef(0x5fd) + '8M5yHQqdxc' + _0x2d61ef(_0x353f4c._0x1a3867) + 'iuwSFBkEB2' + _0x2d61ef(0xa86) + 'SwAlohA3m8' + 'flzBFM8+bN' + 'E+bmlOhaDR' + 'UURVluzGhQ' + _0x2d61ef(_0x353f4c._0x122395) + 'VLmcsheJ1C' + 'viIQzBm5wx' + 'AGqYZIEgXQ' + 'mJW0Yu0792' + '5Oipu2U2tN' + _0x2d61ef(0x3e5)) + ('AXHFNCYC6d' + _0x2d61ef(0x8d1) + _0x2d61ef(0x8a8) + _0x2d61ef(_0x353f4c._0x450e3e) + 'jDuvIVWWLW' + 'RC0QB8b/ao' + _0x2d61ef(0xb02) + 'HoGsstEv8b' + _0x2d61ef(_0x353f4c._0xbcc674) + 'DdapSqJIHF' + 'QGKPW5XQ63' + _0x2d61ef(0x9fb) + 'cIxAWqE7Rx' + 'POY1bDbWGG' + '2TqA1qGI00' + _0x2d61ef(0x681) + 'wu7AYCMdNl' + 'sUac7JkO/m' + 'M7P2MPHnei' + 'x7FY/5RqW8' + 'lQGtx63BpE' + '4ejKvXRJPs' + '+m9yALsqI0' + _0x2d61ef(_0x353f4c._0x244e39) + _0x2d61ef(0x5d4) + 'IigUcDNTQg' + 'XJib+istFH' + 'XlGUJF+D5K' + 'kTPUscVESC' + 'SrUq1FKvQO' + 'PmXRCuKQ17' + 'sHLG7YEa1L' + 'RII0ra3ijU' + 'Xt9aPN4bJh' + 'hzU58v38VD' + '9PCG2cderp' + _0x2d61ef(_0x353f4c._0x46c7f7) + _0x2d61ef(0x8ef) + _0x2d61ef(0xc4c) + 'S+diq7qKIs' + 'bwWWW029F0' + 'VAUFhRMbZS' + 'QzpYQDqmrY' + 'rjYCF6hg2G' + 'QKFLsCyEsa' + 'imrQjsb3Cy' + _0x2d61ef(0x24d) + '8LgNScw+on' + 'piDOTxq7eY' + '5dfh+nEz7t' + 'R3uMEzMc5Z' + _0x2d61ef(_0x353f4c._0x22f8e6) + 'OvjktJxk6h' + _0x2d61ef(_0x353f4c._0x293f3a) + 'cEUp4EKoSH' + 'v5ej4xUIgP' + 'WzVPaBwgqU' + _0x2d61ef(0xa5e) + 'VZAVlmEQdM' + 't1EfVnphlE' + 'HG4jy3T5QI' + 'EYCUKEVQo9' + 'aAlyig1Mkl' + '2GVm0mIaeM' + 'DjAQ/Ik8Nu' + 'G8g2GS6JAZ' + _0x2d61ef(0x14d) + _0x2d61ef(_0x353f4c._0x55f134) + 'CFnbt3Ebgk' + 'PgIOdR6ffT' + 'U/7JpxGv/1' + 'SNqMay8/to' + 'PyZOvq8Po/' + 'mvGjE20p6M' + _0x2d61ef(_0x353f4c._0x20e6b) + '+BycrEwCx2' + 'cwB5zwSFHZ' + 'gZRMeIAEDU' + 'PjCcpwNREW' + 'jk0M2yhEAE' + '1hGaMS4Pa4' + 'QTW37Rq/cs' + 'Nti3SbLq/b' + _0x2d61ef(0x955) + _0x2d61ef(_0x353f4c._0x1ff497) + 'OOvHrAz+ZI' + '57wiraAL94' + '03L87hx4bD' + _0x2d61ef(_0x353f4c._0x18664b) + 'VJRAikxkgC' + 'WNCkFjyYe7' + 'VsQqZ3Arkk' + 'SdCvjUuLm5' + 'ZeO6dRtbmu' + _0x2d61ef(_0x353f4c._0x464409) + _0x2d61ef(0x35d) + 'yyVKLAEpk6' + 'fSpQhYLTCx' + _0x2d61ef(_0x353f4c._0x467ad6) + _0x2d61ef(0xa4e)) + (_0x2d61ef(_0x353f4c._0x15be05) + 'iOjbPY47YR' + _0x2d61ef(_0x353f4c._0x5cb224) + _0x2d61ef(0xc1a) + 'VrXXoausZ8' + 'M13wRh9hT6' + 'Vn33S8+Ftr' + 'EYs2obGEnp' + 'iXz2H1hhj7' + 'xy3KfHfUra' + '5dzc1frt0+' + 'N/PVu4afY5' + 'oDGtIaWBxC' + 'lLjlmCzAWC' + 'va+qLSWqAK' + _0x2d61ef(0x144) + _0x2d61ef(0x605) + '45N+t/Ed3o' + _0x2d61ef(_0x353f4c._0x421197) + _0x2d61ef(_0x353f4c._0x186202) + _0x2d61ef(_0x353f4c._0x3169aa) + 'TNIPnjyRsA' + _0x2d61ef(0x387) + _0x2d61ef(_0x353f4c._0x1f365d) + '59D9+1rUr9' + 'mNSJoBIVBA' + 'nL2QVHgYAg' + 'KkChqnFdgi' + 'ITgVga1j6/' + 'cXf+xZntdx' + _0x2d61ef(_0x353f4c._0x1d1aca) + 'gezgZKW4tQ' + '1OfOCV1Upw' + 'Cj4QC2Ssn4' + '45NZTwHkm2' + 'gdvNUINNlt' + 'xg47v+8wGp' + '97hLgZe5Nv' + _0x2d61ef(0xb95) + 'fdr+yKBhVA' + 'Ord/tJlKyB' + 'dZjl3IWZH/' + _0x2d61ef(0x6c0) + 'Jh4WhcOHp5' + 'RHBQAvFUR0' + _0x2d61ef(0xbb4) + 'mUZZeIAlVF' + '/91JZdf6xo' + 'a5jyy4//eT' + _0x2d61ef(_0x353f4c._0x38c5f0) + 'ferG5gXlqF' + 'rOKWpoKM5S' + _0x2d61ef(0x6d4) + 'rEQr5mW2U8' + 'HtKcUvLNJU' + 'avNI4Xhjap' + 'yXJA8j1RjN' + '7akBD0ilpt' + 'jH1pST1oXE' + 'NuWeiocjtj' + 'nypLXrFi5Y' + 'jvx7DAtf8G' + 'mCp68O/2L+' + _0x2d61ef(0x1aa) + 'qH5ZKMljvT' + _0x2d61ef(0x921) + _0x2d61ef(_0x353f4c._0x214d94) + _0x2d61ef(0xd34) + 'M27pzZMXcR' + 'hyYuxhuYp4' + 'vT5kQZo2tS' + 'JQYN91wStW' + 'I1kIRqldmb' + 'gOEma41kg+' + 'jqSxryGXRX' + _0x2d61ef(_0x353f4c._0x91d94b) + '6wqeGJo5mn' + 'OAep5ooTxJ' + 'OBNZw0ZyGs' + '2Tiy0Pbv6E' + _0x2d61ef(_0x353f4c._0x57f3f2) + _0x2d61ef(_0x353f4c._0x4e6b26) + 'ENTJj6KmpF' + 'VKxFHnRcjV' + 'mtshGnUE2c' + 'yixB967xO/' + _0x2d61ef(_0x353f4c._0x245148) + 'zmbOHNun6N' + 'nj7cE4lYAh' + 'WC02XtPYvS' + 'hFS6G0BlC7' + 'srLaGpDMH8' + _0x2d61ef(_0x353f4c._0x40ac98) + _0x2d61ef(0x4ee) + 'pLsov8fuWF' + '3iOnKPiZ/P' + 'nxWA0e/pVA' + '9AkLF3S/0X' + 'bxO9ETxDHa' + 'Ghe3fbRmbv') + ('mEWhlUkJez' + _0x2d61ef(_0x353f4c._0x7787bb) + _0x2d61ef(_0x353f4c._0x9159e) + '04iiqEJsvI' + 'sKXkH4XNmt' + 'x+7NW/THG7' + 'rbTC58t0y9' + _0x2d61ef(_0x353f4c._0xb6eb4e) + 'MeAsIr2kRt' + 'lw3AKks1VL' + 'KV1rilsARy' + _0x2d61ef(0xcff) + _0x2d61ef(_0x353f4c._0x14a28c) + 'u/vV83iPRK' + 'VSqxTfWWu7' + '/FRQIT/r+B' + _0x2d61ef(0x8e7) + _0x2d61ef(0x433) + 'suOqErImpZ' + '0utYcMkTtg' + 'm1AmYgjU4F' + 'F2JjCtXoqh' + 'KhMcfIfjhR' + _0x2d61ef(_0x353f4c._0x46431c) + _0x2d61ef(0x3e1) + 'n4dczCwujE' + 'RKqlfC7C1G' + _0x2d61ef(_0x353f4c._0x5ba9da) + _0x2d61ef(_0x353f4c._0x1b1b68) + '2k3os3vcur' + '6jtAZKayaH' + _0x2d61ef(_0x353f4c._0x3beab2) + 'Qr0OeWwk/8' + 'p6zjmrbv0L' + _0x2d61ef(_0x353f4c._0x576b05) + 'mBqiZTfOKD' + '/ku7h/u14A' + _0x2d61ef(0xc51) + 'W//eweG62l' + 'aPsY1e6uWs' + _0x2d61ef(0x442) + _0x2d61ef(_0x353f4c._0x1e6825) + _0x2d61ef(0xb00) + _0x2d61ef(_0x353f4c._0x2e5e7d) + 'Ppcu40OEg0' + 'SQIBW5kqBU' + '+FLDhUUXKo' + 'FKjAg4ZhFw' + 'BPqc3DYmog' + 'o/si20pBAr' + _0x2d61ef(_0x353f4c._0x9eac04) + 'ZvGpA4uBPK' + 'W2SKxu8yV/' + _0x2d61ef(0x1ac) + 'B9cf+ZBflE' + _0x2d61ef(_0x353f4c._0x5d1b69) + '5+nOP8JXh2' + _0x2d61ef(0xfd) + 'gjgVyQW8Cx' + _0x2d61ef(_0x353f4c._0x27142a) + 'NKCUUMG+2D' + 'lpPb40NJi9' + 'PXkGjQmuOu' + _0x2d61ef(_0x353f4c._0x2c69ba) + _0x2d61ef(_0x353f4c._0x4acf20) + 'giQ7wYvUdy' + '93uD1i0XJJ' + _0x2d61ef(0x421) + _0x2d61ef(0x875) + 'sUQzFkzUlN' + 'ag0Jr059kT' + _0x2d61ef(0x8b2) + _0x2d61ef(0x217) + 'wm6DYwibwB' + _0x2d61ef(_0x353f4c._0x207bf7) + '+q5m7+exyY' + _0x2d61ef(_0x353f4c._0x438068) + _0x2d61ef(0xc19) + 'T+QN6EWpQ5' + _0x2d61ef(0x3ae) + 'Da6ly1OMaU' + 'zYOUKtECNE' + 'ppXbIEuz/w' + 'HEmKjJ+Zm5' + 'O8M+f5BTGv' + 'xKrDKY4dUE' + 'GQr3lLUgVV' + 'UIvDhrHEBB' + _0x2d61ef(_0x353f4c._0x1e2a40) + 'Q5lro8jA4A' + 'Zd5biYDXMC' + 'vCI/HhyIl5' + '5sRQrbjgGb' + _0x2d61ef(_0x353f4c._0x11f646) + 'nuoK37vF+a' + 'bK7wRzPgo7' + 'bt15mmq3m5' + 'GANncQgkil' + _0x2d61ef(_0x353f4c._0x5054f3) + '+TCUCIBDTt') + (_0x2d61ef(0x834) + _0x2d61ef(0x490) + _0x2d61ef(_0x353f4c._0x94f6a7) + 'nWlS0TNSKc' + '4ANQY0S7Ls' + 'IJREWZifFU' + _0x2d61ef(_0x353f4c._0x26cd33) + _0x2d61ef(0x2a3) + 'Qv27CTwLKd' + '3RKzqWj7xa' + 'P6Y/5nsmM5' + '49scyDSm3j' + _0x2d61ef(_0x353f4c._0x58075d) + 'fa4f/iJUe3' + _0x2d61ef(0xab) + 'HBYTlRWfQG' + 'RFhf+ALEiK' + 'Q2HNsA5sOc' + 'JcP8iCLIPk' + _0x2d61ef(0x146) + _0x2d61ef(_0x353f4c._0x3b1965) + 'fB83/u/VOk' + 'zMi+kgYJzG' + 'kPOC06nI6h' + '7syjeTyRRs' + 'YaRqKQYldD' + _0x2d61ef(_0x353f4c._0x326092) + '1lIKUBNxS9' + _0x2d61ef(_0x353f4c._0x2a46a3) + _0x2d61ef(0x564) + _0x2d61ef(_0x353f4c._0x1c0e98) + '0EFZA3TN81' + _0x2d61ef(_0x353f4c._0x3b5f1e) + 'mDbfNpeFA5' + _0x2d61ef(0xbb0) + 'cLW+YZ6YpX' + 'I3sJyk8UM2' + 'f5blPUSFlH' + 'pEFlRiT8yR' + 'B0detVdbVF' + 'xnihMLe78s' + _0x2d61ef(_0x353f4c._0x5d5763) + _0x2d61ef(0x1fa) + _0x2d61ef(_0x353f4c._0x460d9b) + '0nvjB1vAlV' + _0x2d61ef(_0x353f4c._0x39748f) + _0x2d61ef(_0x353f4c._0x12272d) + _0x2d61ef(0x876) + 'oQgyLsVesn' + 'bF+uOTZ0Jm' + _0x2d61ef(_0x353f4c._0x273543) + _0x2d61ef(0x49a) + 'jEep7NZZWX' + 'rOifrotFPo' + _0x2d61ef(_0x353f4c._0x1ee539) + 'EvrpoJYY4X' + 'qWGPA68FiC' + '6i3KbwVSne' + _0x2d61ef(0x7eb) + 'ZTgxRowmCI' + 'hq6c7C2C62' + 'KQ0WBkme3C' + 'MDTLJc+Usp' + _0x2d61ef(_0x353f4c._0x4782bf) + _0x2d61ef(0x318) + _0x2d61ef(_0x353f4c._0xac9346) + 'jjnfQTwNYv' + 'HMzEfZHuxU' + 'c4gpkfB1yh' + 'SEAtH0w+WJ' + 'W1L14zsdGH' + _0x2d61ef(0x59d) + 'Z2AOD0ZJCL' + _0x2d61ef(0xa91) + _0x2d61ef(_0x353f4c._0x146b17) + _0x2d61ef(0xc89) + 'fWHFl4cMLe' + 'n8R5II2iCh' + 'guF0VwCIKs' + _0x2d61ef(0x32f) + 'DbwhGkZak7' + 'LEkAmixJQH' + 'uPULBa3QAW' + _0x2d61ef(_0x353f4c._0x458aa6) + '0hagEpzJno' + '469anerXlU' + 'ibi8fMGKR2' + _0x2d61ef(_0x353f4c._0x312171) + 'BPg+zTQAxL' + 'F1gIDyJ4Cn' + 'DseSUA66Nr' + 'FH2igtqFIn' + 's6GsQKVPbY' + 'NdmICtYBWA' + 'esgE+RqAPH' + 'Yjh0+nFvav' + 'aYWsduSVWo' + 'pHpZyN8Yqy' + _0x2d61ef(0xca4) + _0x2d61ef(_0x353f4c._0x260ee2)) + (_0x2d61ef(_0x353f4c._0x4353d1) + _0x2d61ef(0x552) + _0x2d61ef(0x7a1) + 'tvOv+5P+Z7' + 'cYt+gN4vW2' + 'i8tajo2pnX' + 'QVsPzzcVj3' + 'dHV8hWOUUD' + 'Iia6vbYDZB' + 'QxB/iHDZyO' + '8C/KEPYykC' + '9kYaThyLrR' + 'UIGF9Bo4r6' + 'jAGtoCh15l' + '1VviNTHGYq' + _0x2d61ef(0x6df) + _0x2d61ef(0x58f) + 'OkiJLItOke' + 'PB5qkBuTSC' + _0x2d61ef(0x26a) + _0x2d61ef(_0x353f4c._0x481e18) + '642aRPiFrv' + '3PdvXfPZS2' + 'Fx19xTvXaB' + '78GsK+m3US' + 'rFCa6luHnZ' + '+4FBD0nCFP' + 'xcYj1MbEbG' + 'gRcFopgLjE' + _0x2d61ef(0xaf7) + 'JKZHRflksu' + 'kF2OWhFZG1' + 'tbyfptvXfP' + _0x2d61ef(0x302) + _0x2d61ef(_0x353f4c._0x186176) + 'SASjpwpohR' + _0x2d61ef(_0x353f4c._0x4f68bf) + _0x2d61ef(0x142) + 'TL+c2f5Iph' + 'Wzz/45EL7u' + _0x2d61ef(_0x353f4c._0x3802f4) + 'lH30pmTrXD' + _0x2d61ef(0x20d) + 'wMT9WJu7Oq' + _0x2d61ef(_0x353f4c._0x4f3796) + _0x2d61ef(_0x353f4c._0x219dbf) + 'MTN/EmHCMM' + 'Ddi0kZiibP' + 'Qp+zA+rFaA' + 'A4PkMmHCS5' + 'FFUV/9Kcy2' + 'mOrYQF4ZKn' + 'yKKKF6rqAU' + 'GhxeggkEWE' + _0x2d61ef(0x796) + 'QsMjlcqeUg' + 'ncbgniDZcX' + _0x2d61ef(_0x353f4c._0xeac9f5) + _0x2d61ef(_0x353f4c._0x1eb9b8) + _0x2d61ef(_0x353f4c._0x160293) + 'rVB2fUzxD7' + _0x2d61ef(_0x353f4c._0x1d8cbd) + 'tSt/sxEtao' + 'KI2Niol6gQ' + 'COHHMQHCCM' + _0x2d61ef(0x95e) + 'W/ihh5woVd' + 'N0Bl5g6IuJ' + _0x2d61ef(_0x353f4c._0x312b06) + _0x2d61ef(_0x353f4c._0x5a1115) + 'aJXFkhqlgA' + '7611iSCTJV' + '4BZBl0AcYR' + 'LYyxCJxEYq' + _0x2d61ef(0xb83) + _0x2d61ef(_0x353f4c._0x52fb7a) + _0x2d61ef(_0x353f4c._0x3e9610) + 'C2Fn/ufk+k' + _0x2d61ef(0x95f) + _0x2d61ef(_0x353f4c._0x10913f) + 'EeblvYtc2n' + _0x2d61ef(_0x353f4c._0x5adbb3) + '3gSN8tW9lk' + 'ZOy9R0blWa' + 'if9b4iaSWg' + 'ktEGi/cACV' + _0x2d61ef(0x20e) + 'DcSsV28Lpv' + '+kzCWILtHl' + 'Ez0OqRa8OC' + 'NFEmWVOGkN' + 'SjKnVAlaNG' + 'o1HHSwsdgD' + '8+c9FvETbf' + 'SiH8dvutUB' + 'kvoM6o761v' + _0x2d61ef(0x108) + 'Df51Rq1WZr' + _0x2d61ef(0xbb7) + 'P/e01CXaz6') + ('G2YMKXB+ME' + 'ByHgOGgj2J' + 'UQoQSnKSuy' + _0x2d61ef(0x638) + 'oieRXVgVX7' + _0x2d61ef(_0x353f4c._0x493d67) + _0x2d61ef(0xbe4) + 'ioNw4KBDZk' + '6C4vUKUOJQ' + 'ZZGqkgrjMC' + _0x2d61ef(0xc0e) + _0x2d61ef(_0x353f4c._0x182cdd) + '5nK3pgaeT7' + '+etwRKkGmf' + _0x2d61ef(_0x353f4c._0x21e2be) + _0x2d61ef(_0x353f4c._0x25c5ff) + 's7ESsP8Eb4' + 'yvWjOI5trU' + 'YQTAtGBmC8' + 'hBRUFNEQLU' + 'hWCYcs4SaV' + _0x2d61ef(0x5c7) + 'DIiuQVwYmR' + 'M0y/EQtZ4z' + 'mS5MuLAZUl' + 'rwKyT6Qyal' + 'Q2T1t0OHDa' + _0x2d61ef(_0x353f4c._0x5d0529) + 'H4ED1WqcYG' + 'kRrs6JDBRt' + 'rBtayLH/dL' + 'K3/Nqo5PMS' + 'nKt34w/d4F' + _0x2d61ef(0x922) + '2zP816ZYCJ' + 'B5VFHM7+OT' + _0x2d61ef(0x395) + 'OaWX7fbtkB' + 'WsDWC0ZnFd' + 'tBPwVikgof' + '3Q2KA4QZRk' + _0x2d61ef(0x534) + 'qsgsxxEPkk' + 'mF9EYgJOd1' + 'kCiFGUJCoK' + _0x2d61ef(_0x353f4c._0x22b646) + 'QXKneDzMby' + _0x2d61ef(_0x353f4c._0x538d96) + _0x2d61ef(0x8dc) + '3avEC5+b/F' + _0x2d61ef(0x11a) + 'jVx0x4SG2P' + _0x2d61ef(_0x353f4c._0x1cba3f) + 'V1wDTDy4BG' + 'Tc8oIjn6xu' + 'GQ+NqGeoK2' + '/uR9wSnA6N' + 'w15Y1NDwXi' + 'UcoSyCIItS' + _0x2d61ef(_0x353f4c._0xe3e27a) + 'P5pMEhSl5V' + _0x2d61ef(0x2cd) + '3QQZFkUBpE' + 'GSdTSApO7B' + _0x2d61ef(_0x353f4c._0x142d82) + 'sGC44GJtl+' + _0x2d61ef(_0x353f4c._0x3482d1) + 'Aw8jR8NeXn' + _0x2d61ef(0x35c) + 'TFfy+6VxIO' + 'g8NYMNkuKX' + 'pV90RjwMZt' + '+Mk2F1BXoi' + 'HR7fu6Ax23' + 'cXnXdONaod' + 'Fn9wGnX9Cr' + 'M2xAKkrSzL' + 'CEUEWUVHHd' + 'sHGf0t+uo/' + 'rObKbyjUcc' + 'ALGtCyg5Js' + '7H7FmKoiir' + _0x2d61ef(0x7e8) + _0x2d61ef(_0x353f4c._0x582797) + _0x2d61ef(0x8cd) + 'fQLuqcO6Y+' + 'vOOMwG7cah' + _0x2d61ef(0xa99) + '4pEt0JN7Hx' + 'G1+/3ug9Di' + _0x2d61ef(_0x353f4c._0x57e9a7) + _0x2d61ef(_0x353f4c._0x14cbf4) + 'lPJLlFgONo' + 'AEMnABW+Jc' + 'YoNRmHBio4' + 'q4oVZAFVZO' + 'R8FMdEMzdF' + 'PF/ZLlgwMS' + 'oITIpXqDik' + _0x2d61ef(_0x353f4c._0x4cd297)) + ('LOQ6pzqnKF' + 'QmQBLo1sd9' + 'skpCWAXOqR' + 'JKhxIzfvpc' + 'J4HqxSuMYN' + _0x2d61ef(_0x353f4c._0x4417c5) + 'g6G7ZH3DLA' + _0x2d61ef(_0x353f4c._0x12a66d) + '4xdgYKfyxd' + 'h/8FzK25qV' + '9s2/suxvAB' + '6L/nXSY3Gr' + 'yLmBQZG2UA' + 'JEP+AvYuo2' + _0x2d61ef(_0x353f4c._0x4bd98b) + 'D6J09frHjt' + 'x6/SJa6wUQ' + 'VVEG2Ys15F' + '5QvCiBqaJ4' + 'ZdXrLZFkAk' + '4tn1XCYRAc' + 'FY3RauWxSU' + 'X0sfhEEuuJ' + 'MAXEb072/H' + 'nduvob39iA' + '1mQpwMx266' + 'wzwwp/6Zuw' + 'NQjroxNjYG' + '7OSG3/1L/L' + 'ojY2AnHy/8' + 'bDYZBbHYmC' + 'pt04K0CWCD' + 'SCa7evAgcH' + 'OryK5PMKIn' + 'iBjNVbmz9p' + _0x2d61ef(0x5b4) + _0x2d61ef(0xff) + _0x2d61ef(_0x353f4c._0x3181cf) + 'AJSE5Bkipl' + 'xYscrIXdgL' + 'MkkKoGEwN4' + 'LPzLvHq7yY' + _0x2d61ef(0x4f8) + 'ESmbT12dzf' + 'fEsIlF5qWq' + 'RJPI1y7zxK' + 'xj/Vck8dgG' + 'NLti2f7wqA' + 'c7ciZqsoZT' + _0x2d61ef(0xaef) + 'uDPFNWoGYw' + 'NMHKQlYCz3' + 'PN3u1Hkhwz' + 'HBNqAWNrxL' + _0x2d61ef(0x254) + 't0KtDxw+Jz' + 'Z9YmF5HTWP' + _0x2d61ef(_0x353f4c._0x15915f) + 'Uz4OaVTE9v' + _0x2d61ef(_0x353f4c._0x35ba5b) + 'rJotP3X69/' + 'glx5zVu6Zt' + 'suyTBJ+/u/' + _0x2d61ef(0xa6a) + '12nEBqHMaC' + 'X37NDvyNQU' + '7a53BZdjav' + '7xX90Vm89n' + 'G8IFOIExKH' + 'Fs0IASYKhh' + 'N+OhUxiKSa' + 'dPA3/+BKfV' + 'RxGZ1YaVQs' + _0x2d61ef(_0x353f4c._0x288cd8) + 'rXMfMuYaDJ' + '6ZWKljvAjG' + 'FhCWPClGD8' + _0x2d61ef(_0x353f4c._0x14f9b7) + 'l34NrbTTUS' + 'Dl7g49Fn/p' + _0x2d61ef(_0x353f4c._0x425a82) + '4WtalgnEA6' + _0x2d61ef(_0x353f4c._0x199dce) + 'O916eLPRvz' + 'OAdcaTLJ6K' + 'MmnqRxbbBZ' + 'T8WLkSn6rp' + _0x2d61ef(0x2d2) + 'JWGT5QjMhq' + _0x2d61ef(_0x353f4c._0x3e7586) + 'r4zsNQ+YJ+' + _0x2d61ef(_0x353f4c._0x12281b) + _0x2d61ef(_0x353f4c._0x75e098) + 'XC1GLhR3g1' + 'whK+bCmIV4' + 'JBt4SgkDys' + 'IvEpj5P9x9' + _0x2d61ef(_0x353f4c._0xb9d5cd) + _0x2d61ef(_0x353f4c._0x2190db) + '8VrFzN/X8r') + (_0x2d61ef(_0x353f4c._0x193d45) + '/u3r9/RXmJ' + '5+1TB2GYz1' + 'haX9nkMs++' + 'onQU0/nLk4' + 'qy2rrarngA' + 'DWN169YFNB' + 'LqVkYv3EGo' + 'z2E6oQb0Wt' + 'G3SyA0zeUf' + '9++Mpo5vi8' + _0x2d61ef(0xcd8) + 'SYXvFVAIuj' + 'QgueVoflxr' + 'LTiyVr1IzF' + 'EdhyBLKbYk' + 'QUg+AstGT+' + '3uEL3ecPY3' + 'msSfG1f5+Z' + 'o7e2jasdn0' + 'FqdqTdO16X' + 'JW7v44f7yq' + _0x2d61ef(0xa12) + _0x2d61ef(0x59b) + _0x2d61ef(_0x353f4c._0x26d866) + 'ECNcI3Hs+0' + _0x2d61ef(0x66a) + 'LG8+BcIXof' + '9X3KBR2N/s' + 'aMlc1aVaZ6' + 'nlJjK+jhUo' + 'Yn0xRqAYi1' + 'OCRcIqeMHh' + 'A6eAkWFKGF' + _0x2d61ef(_0x353f4c._0x236f3a) + 'rATHvag3/P' + _0x2d61ef(_0x353f4c._0x97310b) + 'jg5zz27Ink' + 'kJJfPX64TC' + '4U1JL3ExWy' + 'x+46GTVQ+c' + 'dJ2/nWE19W' + '/X+QMjgXHX' + _0x2d61ef(_0x353f4c._0x553e9d) + 'PQgNOyYX8B' + 'x31xKLx7t/' + 'WW19pauPiP' + '10ZNTWMbvd' + 'AaJbNbKo+q' + '1tRlm7SF+k' + _0x2d61ef(0xcba) + 'IFiuJztwND' + '6a0T5JYhkB' + 'DNmoZN84Ay' + _0x2d61ef(_0x353f4c._0x47f0fd) + 'jIct+tPbX4' + 'ef1w3/UsIo' + 'LPf0O5mz9A' + 'UA69YSAotX' + 'Dp+8bc0C8L' + _0x2d61ef(_0x353f4c._0x30a72d) + 'fNCa7z/Eal' + 'RpAuvwsceU' + _0x2d61ef(0xbaa) + 'm84sP5WioV' + '4lCd59WFmn' + 'BUxR1M3W0w' + '5ZOvyLPXRQ' + 'R1iP2Wj3Id' + 'dFKtwEqoE3' + 'WnmJqkPiwV' + _0x2d61ef(0x826) + 'pQYIEJxmIO' + '0iiwNLIaiN' + 'kdFuNPb395' + '8fX+6C+boD' + _0x2d61ef(_0x353f4c._0x395201) + 'tOC+qGXWfF' + 'Z7Ry+94VXO' + _0x2d61ef(0xc13) + 'kyHAMrNpsx' + _0x2d61ef(_0x353f4c._0x2b3f34) + '/dt17u2r2u' + _0x2d61ef(0xc36) + _0x2d61ef(0x2a1) + _0x2d61ef(0x64c) + _0x2d61ef(0x94) + 'vrs9DEPG/2' + 'rO1PnCvHyT' + '+d9UESkGAX' + '0qZn7URglE' + _0x2d61ef(0xbbb) + _0x2d61ef(_0x353f4c._0x4c5aa3) + '9PoaJU2QMV' + _0x2d61ef(_0x353f4c._0x5a4cc4) + 'hsMShM3Rhu' + _0x2d61ef(_0x353f4c._0x20d573) + 'ud1ElsxPj0' + '3PJT/uCnet' + _0x2d61ef(0x7d4)) + (_0x2d61ef(0x7ac) + 'wpmtKuNbP1' + _0x2d61ef(_0x353f4c._0x4587db) + '9o6csCBqDf' + _0x2d61ef(_0x353f4c._0x4caa63) + 'sD9s4fxRAa' + 'ZvnLOFg+wm' + 'aQxMqiHUV4' + _0x2d61ef(0xc4a) + _0x2d61ef(0x2e8) + 'xJtZjvqagD' + _0x2d61ef(0xa72) + 'LZJfXp1DBg' + '6QDmlyXOsu' + 'qtVy95Y108' + 'fmdqNQphbu' + '/9c0dbKjkA' + 'PfUJRlh4KG' + 'fC4zuYcJp7' + _0x2d61ef(0xc02) + _0x2d61ef(_0x353f4c._0x5bd139) + 'zuiyLfQ5dV' + _0x2d61ef(0x83d) + 'lwwOrbghG+' + _0x2d61ef(0x22a) + 'bKL8bzwISU' + 'aT0VXpbEAP' + 'QHGxwlp07A' + 'UJfQNJrqij' + 'PnDUOanPMV' + 'bTLZiaAtnt' + 'DltlkDBIEZ' + 'kcj/915VUH' + _0x2d61ef(_0x353f4c._0x2ea807) + '6QIrYYhTtX' + '9dGPcfF8W/' + _0x2d61ef(0x8f0) + 'VYMPFD/dMp' + '/PvvXx8HDT' + 'CbcoMB9W+/' + 'QJjUQuwDmN' + _0x2d61ef(_0x353f4c._0x3c1244) + 'VromaTrutm' + 's6411fBQq+' + 'CeRuGL2Suk' + 'FHHjQE9Q5A' + 'ocBio7vIoC' + _0x2d61ef(_0x353f4c._0x429af4) + 'kX52m7PBiQ' + 'lcPYpI2Jc1' + 'LqlmRFe9qT' + '2zljsqbA+j' + _0x2d61ef(_0x353f4c._0x43e18d) + 'FdjF6aDDLD' + _0x2d61ef(0x5ca) + '+QVw/Rm6Oj' + 'FTP1Zk4ebs' + _0x2d61ef(0x964) + _0x2d61ef(_0x353f4c._0x172cfa) + 'JAeIkiADVU' + 'SvKnkFAV1a' + 'PA+JnVWGbI' + 'vFEERwLBeF' + '5YSdV+aQQW' + 'wEJ5uciJL5' + 'PKrBxQU67H' + 'KXerDhU5YM' + 'xxw8xMMV7X' + 'rh7ZcPP2gi' + 'ClhG27/0gB' + _0x2d61ef(_0x353f4c._0x4f950a) + 'fyUHXMX8dY' + 'DjLcaxuoVS' + 'Kb7kRuFMN2' + 'w2fuH76Jp6' + 'j3FU/eDVvg' + 'rCBPsDRUmU' + 'RYX1g0gS1o' + 'hL3kqHhMPM' + _0x2d61ef(0xb34) + 'y9SBAUUmHE' + 'kYuAEtmlFJ' + 'pdqqKoohuI' + 'tgO0Aj28yw' + _0x2d61ef(0x140) + 'uiUPSIXRIv' + 'rQ49ut5c6W' + 'jAwAaVFcRt' + '/OA/w5FoB1' + 'c/525aVz1g' + _0x2d61ef(0x5b8) + 'ECtwvBo9w+' + 'lj9ww/hof/' + 'epLY8j9nHn' + _0x2d61ef(_0x353f4c._0x2dc9d4) + 'gujDuhBVFb' + _0x2d61ef(_0x353f4c._0x4727b7) + 'oOQKCkqlE2' + _0x2d61ef(0x83b) + '0a3WENHrqD') + ('Nr2ruUiFTZ' + '6aJa4cSx4V' + '0YBHazkhfw' + 'uEtrwuCeyI' + 'm71t7w8MGD' + '98+chKc8Q8' + 'OuMRj+9wAI' + 'X3T7Adatm5' + 'NgYKjfI4Yz' + 'OOIByzib/y' + 'dn6MP+9dBg' + 'rBe9cTKR1l' + 'Ta8clqIhBn' + 'EY4bkBopzk' + 'RgnncDjqoR' + 'RCfzN2ux78' + _0x2d61ef(_0x353f4c._0x2aed08) + 'Q0CNl1LVaT' + _0x2d61ef(_0x353f4c._0x26a14d) + 'M2j/Ge+MIV' + _0x2d61ef(_0x353f4c._0xbf0b65) + _0x2d61ef(_0x353f4c._0x4f2cda) + '/m+cfL2y+5' + _0x2d61ef(_0x353f4c._0x1f9dbe) + _0x2d61ef(_0x353f4c._0x533843) + 'uKPx0dG5yL' + 'oJpPCTTOiM' + '7ed5d0ThLp' + _0x2d61ef(0x847) + '6hP75HDqSd' + _0x2d61ef(_0x353f4c._0x2ecb4f) + 'ud8SREmqFb' + 'ONHCIKIEVU' + _0x2d61ef(0x71b) + 'gqGu2SoogV' + 'tT6WdnS4a0' + 'yErOtYYlXi' + _0x2d61ef(0x35f) + _0x2d61ef(0xc06) + 'IOkcxPa2ft' + 'by6jvwYEFW' + 'NEPDGg1YmL' + _0x2d61ef(0xce) + 'x/D/dq1LSO' + 'B1MP/IsGG/' + '5c6JR3GejK' + _0x2d61ef(0x609) + _0x2d61ef(_0x353f4c._0x152969) + 'BG+99bep2j' + 'eDl6YhIOTk' + _0x2d61ef(_0x353f4c._0x5d6cc1) + _0x2d61ef(0x209) + '5aRSxazgp5' + _0x2d61ef(_0x353f4c._0x40c469) + 'O1IlIzOYJJ' + 'A9auwBaaUb' + _0x2d61ef(_0x353f4c._0x3b84a0) + '0ApjhzvCJo' + 'o0tURh/Np/' + 'vsPqpFG/7n' + '6cf21Vn/k6' + 'P7/3wJys1z' + _0x2d61ef(0x9fd) + _0x2d61ef(0x7dd) + 'JHA3Q9xVyY' + _0x2d61ef(0x4bd) + 'FVkoCRMBGz' + '6SJOHMMaYZ' + '8DKuq8EpvE' + 'W1KL1Xq1GP' + '9vcLhqiaiT' + 'DzZtSl9J4n' + 'wMmxNkN7jD' + 'pRRrW2ombx' + 'c1DfR4I62u' + 'hQjMc40rCj' + _0x2d61ef(0xbc2) + '+jZUrujx1J' + 'RCyayNc8f+' + 'wbian8Qhrf' + _0x2d61ef(_0x353f4c._0x1f25a5) + 'nhaPOElF7c' + 'mW6Y2sfrpK' + 'qacyQWI3vh' + _0x2d61ef(_0x353f4c._0x355de2) + 'XjnWyezCup' + _0x2d61ef(0x4b2) + _0x2d61ef(0xae6) + 'sQ1ZIG8sFX' + 'u2HuD0HXWB' + 'IIvTbsK7Jq' + _0x2d61ef(_0x353f4c._0x345fb5) + '7pDTcfBpJx' + _0x2d61ef(0x417) + 'BfHL/7/oO4' + 'L6yAwSaOzj' + '63cgxPn/wp' + 'dCY1cuP++k' + _0x2d61ef(0x280) + 'pqe3ds/65O') + (_0x2d61ef(_0x353f4c._0x5f1bfc) + 'H4INtAAzZr' + _0x2d61ef(0xc0d) + 'v33x4llYCV' + 'OErIy13Kxh' + 'E4xKYVG+xo' + _0x2d61ef(0x28e) + 'gQgxsnHM3+' + 'GDOOFwY+F7' + 'C0UOongaoM' + _0x2d61ef(0x529) + _0x2d61ef(0xa35) + _0x2d61ef(_0x353f4c._0x167646) + 'DZAbiHbclj' + 'wsjPYm3qEw' + 'cBPGm946Vw' + 'AKOt8w5tZm' + _0x2d61ef(_0x353f4c._0x599c51) + 'zr0kLvmZye' + _0x2d61ef(_0x353f4c._0x560258) + _0x2d61ef(_0x353f4c._0x1d2611) + 'fHn3lkySbx' + _0x2d61ef(0x942) + 'BSz/8Erg+B' + 'wk2aGIiiTV' + _0x2d61ef(0x925) + _0x2d61ef(0x750) + 'PFHDA7h5nl' + 'N1md80q3iN' + _0x2d61ef(_0x353f4c._0x5ac09f) + 'Xs+1eVciMt' + _0x2d61ef(_0x353f4c._0x15bfdb) + _0x2d61ef(_0x353f4c._0x2ebda4) + 'uDGuyAq65M' + 'JdU7ddOXTZ' + 'na0Aw72mfd' + 'Z/EDQ40Sna' + '6aLTDw5OJp' + '9ymb8fHKAr' + 'TNt06k0eyx' + '72ceaeGxbp' + 'WNvNDvFVsL' + '4Ue6YENnap' + 'rxAG+7AtdM' + _0x2d61ef(0xb2e) + 'MY1y/Khfzg' + _0x2d61ef(_0x353f4c._0xefbaba) + '9b6xHa7rsF' + 'ES7vjZuHd/' + _0x2d61ef(0x726) + 'AuEhT3Kv4P' + _0x2d61ef(_0x353f4c._0x17d163) + _0x2d61ef(0x35b) + 'cbvOK/Nrw0' + 'eHvBWnWIhs' + _0x2d61ef(_0x353f4c._0x1df9c1) + 'aeCdjp2Mye' + 'wDp8TV+w6a' + _0x2d61ef(0x608) + '1J6nT9KxAt' + '4lYy8kq9tC' + '0czYlNUEaz' + 'pspAd9punh' + '/Pue+ASyaO' + _0x2d61ef(0xc4b) + 'mKcZGet6Y3' + '5nupLJ7Yes' + '/VlxyA3gQa' + 'gDHIy7de0r' + 'X9KavsCiIb' + 'K5+PM/vrsn' + 'ar0oVy+GmF' + 'HmhYp94shF' + 'Ty/IPX09F1' + 'uxevcgun7/' + 'DTjdii19Cd' + 'K1C/JywYxS' + _0x2d61ef(_0x353f4c._0x2e1ab3) + 'FCSqjPCd6r' + _0x2d61ef(_0x353f4c._0x594062) + _0x2d61ef(0x189) + 'kTIXJUzmy8' + _0x2d61ef(0xa6b) + 'Twuxcw/kxA' + _0x2d61ef(_0x353f4c._0x58abc6) + 'N5m4KHuU+3' + _0x2d61ef(_0x353f4c._0x405e0d) + 'up3pa6PLm0' + '2XsMSemiVx' + 'nBbnrKzKgJ' + _0x2d61ef(0x409) + 'bDvdKS7/pn' + '8OxvrK6RVV' + 'bFR6fXjUa3' + _0x2d61ef(_0x353f4c._0x587c98) + 'c4hYNZYIRT' + 'u5OKwVSHsb' + 'vDp3w12wZS' + 'YU7i207f8Q' + _0x2d61ef(_0x353f4c._0x124261)) + ('Bl7kkGyFO5' + 'ODCYuHL9lg' + 'w/HoGKL5ja' + 'Miz8PrC6pg' + _0x2d61ef(0xa74) + 'GF2xMckjWa' + 'mm8SRqvIK1' + _0x2d61ef(0x5f4) + 'rp82eQsLtu' + 'MNbwseVsJ2' + 'IdeiT76ie7' + 'MuGazI7mcs' + 'omxLHFwmuE' + '+Bu5L/Yfil' + _0x2d61ef(0xa7a) + _0x2d61ef(0x9d1) + '1ZOuHGGCza' + 'v3L3xwdx7g' + 'EngX0OUJrH' + 'fk9oouaYFO' + 'N3sQLxvgpF' + 'xsvGtDmMj7' + 'OpE6U1k7R7' + 'wgHHKargB6' + '/0wbLJ1p/N' + 'OtWKgXl6bA' + 'ukx1/7n3PM' + 'aoGe44UKqB' + _0x2d61ef(0x753) + _0x2d61ef(_0x353f4c._0x14c7a9) + '13rGyUAuey' + _0x2d61ef(0x880) + 'WJlcBlPDbY' + '16LHIXe/lt' + _0x2d61ef(_0x353f4c._0xf2e77a) + '7h7RoZbUCV' + 'q8CAfpJYaH' + 'GMIIx+Akil' + 'ETfQMgcfIT' + 'h88gnBiL2w' + _0x2d61ef(_0x353f4c._0x458cb7) + '/Guk/TCkw8' + _0x2d61ef(0xcad) + 'NU/f3G6NbL' + 'h41foFT2hj' + '2kiOUUR/8t' + 'WnRQECGfvH' + '4BnjJt2Mww' + _0x2d61ef(_0x353f4c._0x5bf937) + _0x2d61ef(_0x353f4c._0x2b0cae) + 'rO5hpodcBy' + 'UxJm/QDMqs' + _0x2d61ef(_0x353f4c._0x11d09b) + '9vXx/6TwN8' + 'cKkJl96KLX' + _0x2d61ef(_0x353f4c._0x13df9d) + _0x2d61ef(0x571) + 'NspZ88jcO7' + _0x2d61ef(_0x353f4c._0x386421) + _0x2d61ef(_0x353f4c._0x322cb8) + 'xzi5Oyluk4' + '5Fh3f68V+3' + '1xWAqY+PwY' + 'CB6juUHGBn' + _0x2d61ef(_0x353f4c._0x3db054) + 'YxdERIaJ3I' + '2H2Wb8mkW+' + 'DVaImYcl5c' + _0x2d61ef(_0x353f4c._0x4713b2) + '+JnyLSbT3I' + '0tvYdSJm56' + '/+3aguMxJm' + _0x2d61ef(0xb7f) + _0x2d61ef(_0x353f4c._0x14919e) + 'f3xC2+ggq9' + 'iU2FAYq6W9' + _0x2d61ef(0x987) + _0x2d61ef(0x19a) + 'rBl7EfgNv7' + '+Mtn4gCQb4' + _0x2d61ef(_0x353f4c._0xcffdd5) + '4YfzockMMP' + _0x2d61ef(_0x353f4c._0x236726) + _0x2d61ef(_0x353f4c._0x403bf5) + '1aZifgt1y/' + 'RUdBZWqf2Q' + '4a4LgNY2V/' + _0x2d61ef(0x713) + 'Ep1AdQADj+' + 'EnephN0rSF' + _0x2d61ef(0x730) + '7YFCWPfBlw' + 'OjQ07Lw1zf' + 'k2+ENWwGMN' + _0x2d61ef(_0x353f4c._0x2cc2d7) + _0x2d61ef(0x5f3) + 'N/tDk3F/ck' + _0x2d61ef(0xb4b) + 'hE4M+Nxv2W' + 'A8TiwNZs6D') + ('vzMQ6fuIZu' + 'UAkFZx12GR' + 'Knc0ljbGVT' + 'chRsmGvHSg' + 'qokcHt9pRi' + '54MkRaQwSH' + 'st94e7rv7a' + '0onD+KXv6s' + '4sgn6aZZsG' + _0x2d61ef(0x3d3) + '8iTj9avLkJ' + '0vrBdICQy6' + _0x2d61ef(_0x353f4c._0x2598f2) + '5Rwsndrq9A' + 'IWuwpOxmce' + 'IA5+j5lXQb' + 'axUjs3uGUP' + _0x2d61ef(_0x353f4c._0x66be59) + _0x2d61ef(_0x353f4c._0x11d6ee) + _0x2d61ef(_0x353f4c._0x18d346) + _0x2d61ef(0x5f7) + 'k82Q5RpmPJ' + 'IRQ6/4JYqc' + 'HGWvWA5YLQ' + _0x2d61ef(0xaa4) + 'gWXjv9Hb06' + _0x2d61ef(_0x353f4c._0x1ecb44) + _0x2d61ef(0x2da) + _0x2d61ef(0xba7) + _0x2d61ef(_0x353f4c._0x32f488) + _0x2d61ef(0x1a6) + 'FK7I0mWMFj' + _0x2d61ef(0xca9) + '/BoA60cJX8' + 'VYBhkTKsiP' + _0x2d61ef(_0x353f4c._0x545a58) + '76Vxy04g+z' + 'WwFa42vSvy' + _0x2d61ef(_0x353f4c._0x59cc11) + _0x2d61ef(_0x353f4c._0x318688) + 'RInN/DaRMm' + '44EOxtRakC' + _0x2d61ef(_0x353f4c._0xc57f97) + 'bLk7Oc2Tcf' + _0x2d61ef(_0x353f4c._0x3fabe0) + _0x2d61ef(_0x353f4c._0x1b8e31) + 'zLs3NsKCUS' + 'krW/Mc/YrX' + _0x2d61ef(_0x353f4c._0x49881c) + 'Dl2DfzYbd6' + _0x2d61ef(_0x353f4c._0x297b42) + _0x2d61ef(_0x353f4c._0x2abeb3) + _0x2d61ef(0x986) + 'r9cbj1tbuO' + '0TopihxNpi' + 'G3a0yZJblm' + _0x2d61ef(_0x353f4c._0x274bc9) + _0x2d61ef(0x547) + _0x2d61ef(0x6ab) + '+KhZ17KtB/' + 'rM3Qyw9Msn' + _0x2d61ef(_0x353f4c._0xdaf8a9) + 'QGGJjQAXBQ' + 'dd/aO+Uadb' + 'WH0jpnnQPn' + 'EoCPIokpBn' + _0x2d61ef(_0x353f4c._0x3f1157) + 'ZJnAy9iSJY' + _0x2d61ef(0x685) + _0x2d61ef(_0x353f4c._0x3114f8) + '8Syh+0zD8e' + 'jDXru9J1lt' + 'XW2WYCk074' + 'jgMmJpAgyp' + _0x2d61ef(0xaf2) + 'ZeuQibO0ss' + 'ckMg5MXuDK' + _0x2d61ef(_0x353f4c._0x59a03c) + _0x2d61ef(0x1c4) + 'K0AghDpxrI' + 'hDzmkU+T1N' + _0x2d61ef(0x493) + 'uSGwuhcGyh' + _0x2d61ef(0x9c9) + '9fnZg1fACr' + '5PyOdI35I5' + 'DuQ4LlgEYs' + 'B6yk4wAuq5' + 'VcsoxYdU3j' + 'shlz6330HH' + 'PA+Ntc5vb8' + 'a9WvFK+TAn' + 'VSUB1Oh1ei' + 'ddgC7AOcJO' + 'RzgqTGeX7v' + _0x2d61ef(0x57b) + 'b3+TYY37L8' + '4Ktndtx72q' + 'tzYjAcD0bH' + 'w3W/G1IACA') + ('HNZlIUsh05' + 'Goyx0ry8bJ' + 'JHCKxdnaOx' + 'AZgMWyLwx0' + _0x2d61ef(_0x353f4c._0x58ccf4) + '34OOXnCCyy' + _0x2d61ef(0xbfa) + 'XgGrFTGEUI' + 'GVfoI8gRf2' + '1TfxE1Ssar' + _0x2d61ef(_0x353f4c._0x1c51bf) + 'mJ6p/fePTl' + 'c7TRJ/07g9' + 'a78rD1+0YZ' + 'WDYWUqBFq1' + 'HE0z5Wiahj' + 'IIRVFi7mJi' + _0x2d61ef(0xa6c) + _0x2d61ef(0xaa8) + 'ygrV6xXBQe' + _0x2d61ef(_0x353f4c._0x3c0da3) + 'ywn1ViJwpU' + _0x2d61ef(_0x353f4c._0x416e13) + 'WSWAGkmeNM' + _0x2d61ef(_0x353f4c._0x48ab42) + 'VSyzjjzNxZ' + 'nWtp1BLPxM' + 'V/qzXOevz2' + _0x2d61ef(_0x353f4c._0x4a6b6b) + _0x2d61ef(_0x353f4c._0xab91e) + _0x2d61ef(0x52f) + _0x2d61ef(_0x353f4c._0x4ff2bb) + 'opv8PrxxZY' + _0x2d61ef(_0x353f4c._0x11d378) + _0x2d61ef(0x982) + 'FGeMUFed1y' + 'loTcJoDsan' + 'pesp3ZC67f' + 'z2Ds0CfAR4' + 'uvv3FS+fqp' + 'sbAGLTMRbe' + 'Fx8uP9MisF' + 'N82OxquP/j' + 'McawPDb/kc' + '2ARLDM4MXn' + 'qHdMxwwI48' + 'LNpVPs1jXZ' + _0x2d61ef(_0x353f4c._0x40cd0c) + _0x2d61ef(_0x353f4c._0x39ce5f) + _0x2d61ef(_0x353f4c._0x4766a3) + 'ezeSWtNTte' + _0x2d61ef(_0x353f4c._0x9e653e) + _0x2d61ef(0x595) + '6egA2mTcns' + 'cOXrjr1Jd3' + '358H0XX+2u' + _0x2d61ef(0x16e) + 'WQxMP9jBD9' + 'i3Pjufi5qA' + '0xe+ZzqYvl' + 'TdAFjuBJQN' + 'DESKEurDhi' + _0x2d61ef(_0x353f4c._0x53d4ec) + 'cc3Z2rh0mg' + '3BbjwMpSue' + 'x5EYdKcQAT' + 'rsn/I7Juq3' + 'jN90zNCqY9' + 'eCdYOwgt2Y' + _0x2d61ef(0x9dd) + 'qDnuvEubSD' + 'ayIHvJhBK3' + 'FDMq1bXFOF' + _0x2d61ef(_0x353f4c._0x2a408a) + _0x2d61ef(_0x353f4c._0x111021) + '2QArCsTanB' + 'eR0vUcxIkM' + 'bg8CL4alCI' + 'XOYd0pnaNg' + 's+u1Ymn8q6' + 'cOKaYHj7ER' + '+5J+325lXA' + 'CvZ2aYWtFG' + 'GBC2TATFs9' + 'kz4yV8zCVo' + 'v33ftXcIqy' + _0x2d61ef(_0x353f4c._0x49a777) + '0gdQwYaplO' + 'AQAy/Fw3ZE' + 'my9Sft4iVz' + _0x2d61ef(0x9ea) + 'E0gN22Rrp3' + 'lYZ0rnMEWZ' + 'ZbuFa5izzJ' + _0x2d61ef(0x5b3) + '0XV4+RkWvJ' + _0x2d61ef(0x6fa) + _0x2d61ef(0x451) + 'NI28/amavJ' + 'vFnqBixmY6') + ('yLg8IZ5+Ki' + _0x2d61ef(0x643) + 'uNLVLPzYGW' + 'QPGRONJTg0' + _0x2d61ef(0xd0c) + '5zDoHEZo56' + _0x2d61ef(0x156) + 'eXJ3Lbb0TX' + _0x2d61ef(_0x353f4c._0x481f31) + 'onRi3SuZ/m' + 'DjSw2o2Thk' + _0x2d61ef(0x6cf) + '8HB9sn/mQK' + 'bEBwDijxCg' + _0x2d61ef(_0x353f4c._0x244306) + 'MPlXq2odFT' + 'lt3k9Lp6a0' + _0x2d61ef(_0x353f4c._0x4d931d) + 'oAECpSp5co' + _0x2d61ef(_0x353f4c._0x4e1f90) + 'iHNs107+2x' + 'vpt1/GJ/dq' + _0x2d61ef(0xbfb) + 'dvKV4V31Wn' + _0x2d61ef(_0x353f4c._0x384792) + _0x2d61ef(0x3ac) + _0x2d61ef(_0x353f4c._0x1635a6) + 'rkDfHA193K' + 'psi7KZ8IIv' + 'L2diIDu4Jw' + _0x2d61ef(_0x353f4c._0x1a211d) + 'zcp2LN6VtD' + 'TcsuavIM0U' + 'HEr0iYVbTh' + '6hiE3Hbtr+' + _0x2d61ef(0x6ae) + 'YaKvwbTMZd' + '7RsSfuxb2K' + 'bNBoTKCdvz' + _0x2d61ef(0x34e) + _0x2d61ef(0x393) + 'QvRWeLFRFM' + 'cumwONCybn' + 'mKi/OwOKAe' + _0x2d61ef(0x7d6) + _0x2d61ef(_0x353f4c._0x2e70f1) + 'ToHNYZGzYs' + _0x2d61ef(0x152) + '3XNSe9PrPR' + '+N+H9dDHZ1' + 'grdLI1ap2/' + 'a7FjDBtx3z' + _0x2d61ef(_0x353f4c._0x54d2ca) + 'ZGYFe9FTza' + '4H1/fsratV' + 'ZF+vAF4UQ4' + 'iPlyU2lVfy' + 'em2B+L3XT0' + 'o60mInYGfI' + _0x2d61ef(0x4be) + 'LFWRDg7RDg' + 'm7SvTMPQAO' + 'xMSyMAI25K' + _0x2d61ef(0x1cd) + 'XOppwOyOFL' + 'zrRW6MQVy7' + 'c5yv5+LjMf' + 'DFPJ4GA925' + 'jDCwknD23/' + 'zL2fzCua2v' + _0x2d61ef(_0x353f4c._0x205a44) + _0x2d61ef(_0x353f4c._0x33aa18) + '6n4sXBR0AK' + 'lAuvN6X4u8' + _0x2d61ef(_0x353f4c._0x3f981f) + 'TK5kBCGrLa' + 'hBhqYGRrdl' + '9ASRs0N4ah' + 't+OXzLKQhb' + _0x2d61ef(_0x353f4c._0x37b236) + 'e+LRNn/knK' + '/fczYwZtVk' + '5PWE79hiJ+' + 'iZviQnvaxU' + 'OF1bhRmQBG' + 'Lk4MHcZfpw' + 'Togbycoh77' + 'F2HSty/ZMn' + 'YoYRuXPebb' + 'MgC4XIvSmU' + 'YB8Auh3OT9' + _0x2d61ef(_0x353f4c._0x73fcf9) + 'Z1Rle8O8O/' + 'vYLNuiR32o' + '/PNUx+JGEr' + 'c8UTI6X7qN' + 'yKgYq9O1w3' + 'D93Q6sSzPp' + 'muqcCHAEKd' + 'SqkXBAIBW/') + (_0x2d61ef(_0x353f4c._0x5625c0) + _0x2d61ef(0x441) + _0x2d61ef(_0x353f4c._0x57d806) + _0x2d61ef(0x97b) + 'VzWIigCdEJ' + _0x2d61ef(_0x353f4c._0x5f1116) + 'mKsXWHjqsL' + 'z2r+lnTN6P' + 'r7TQvbmao5' + 'XgJnw/6oqc' + _0x2d61ef(0x6ce) + 'ZfWrOCfFQR' + 'JV4hjlJ14J' + 'DX8vr4/NHz' + _0x2d61ef(0xa1b) + _0x2d61ef(0x632) + 'RIRIPkHgCa' + 'MIVyLR3DgI' + _0x2d61ef(0x3ea) + 'n1534tiUWB' + '56Odqg2Fpb' + 'IvH2jdc57V' + 'dM3HKujvfL' + _0x2d61ef(0x147) + _0x2d61ef(_0x353f4c._0x3c1dab) + _0x2d61ef(_0x353f4c._0x313531) + _0x2d61ef(_0x353f4c._0x4c33f4) + _0x2d61ef(_0x353f4c._0x47b54e) + 'unTU461GJi' + 'tAR7RsAEwV' + 'nGE7aCAD0a' + 'gMAH+AP1lE' + 'Uov0KShtKQ' + 'ZiREYy/zcP' + 'cJF1ifOFB1' + 'UBzxg28H9f' + _0x2d61ef(_0x353f4c._0xfb772a) + _0x2d61ef(_0x353f4c._0xbdc2dd) + 'tsfgwpNZRe' + 'O7SlVXVU1D' + _0x2d61ef(_0x353f4c._0xd874ba) + _0x2d61ef(_0x353f4c._0x28269a) + '7BtElJ+7p7' + 'IA5tdtAgaM' + 'rSAJpBo7jJ' + 'DIcNNS8fjM' + '/SMjLyaQaA' + '3q2kdUJaKA' + '2Qj0NQ2Lrq' + 'JyfUsn0wYz' + 'BW5mYt/1aW' + 'U+ZLYsU4NY' + _0x2d61ef(_0x353f4c._0xdbb249) + '+T3bUKlx3M' + 'A6l32w+IdT' + 'IJ3IQCqJFy' + _0x2d61ef(0x40a) + 'ffF6AXy1Cy' + _0x2d61ef(_0x353f4c._0x5aa48d) + 'YByDFkeI9g' + 'CY8gACeNQ8' + 'LjoEgDQDH9' + 'hM7DxAEiek' + _0x2d61ef(_0x353f4c._0x58337a) + _0x2d61ef(_0x353f4c._0x2bd0df) + 'f4ls7lZ/Lx' + 'IyyYy2Myqf' + 'OX6VVtseeO' + 'XCXLZLj7WW' + 'Bp7F95Kyqd' + 'CBcTL0VEsq' + '2ZEF2LaCjQ' + 'EqWJsvUcPT' + 'W9sz+iUvK+' + 'vEHVpfENEC' + _0x2d61ef(0x17e) + 'JhhzMaUAmn' + _0x2d61ef(_0x353f4c._0x10d32f) + 'CkUZNO9Vf/' + 'fOD4Vpa+7T' + 'qIhz/67Zmd' + _0x2d61ef(0xc6b) + 'tmh+nYXWqE' + _0x2d61ef(0xba9) + 'beObW1Axxe' + 'ICVeArUS60' + _0x2d61ef(0xbe2) + 'kXlJroyPaY' + 'YdoKtPBfJ2' + _0x2d61ef(0x99) + 'NANYDUcUE+' + 'GQBVKs3SAs' + _0x2d61ef(_0x353f4c._0xa0a2df) + 'pSETh7huzy' + 'FYApHjzNNY' + '33Yd3E8HU8' + '+0B2Rgjfa9' + _0x2d61ef(_0x353f4c._0x382ffa) + '9jCMuhIQWQ' + 'uYYRFecq4w') + (_0x2d61ef(0xa94) + _0x2d61ef(_0x353f4c._0x2ba1af) + 'zLXFMUvCjG' + '+iwPwwhGQi' + 'dHtAAjamL1' + 'uTrse67pUF' + _0x2d61ef(_0x353f4c._0x49490a) + 'zDGX3f2EMd' + '7qxMlGCboi' + 'S8w4eaL4dC' + _0x2d61ef(0xcd1) + _0x2d61ef(0xc26) + _0x2d61ef(_0x353f4c._0x16ac80) + 'eOfU1s1qnU' + _0x2d61ef(0x93d) + _0x2d61ef(0x2e6) + 'TnzZgKH3fz' + _0x2d61ef(_0x353f4c._0x13f3ec) + 'IEeDyI1biq' + '+oA90MMsJv' + _0x2d61ef(0x24c) + _0x2d61ef(_0x353f4c._0x4d0f9e) + '5AWieQENGi' + _0x2d61ef(_0x353f4c._0x1f0130) + 'eclL75N4Pk' + '8N7aMzr1eN' + 'CyXQ2jcrpn' + '02zDGORQsz' + 'Abou9js+N7' + 'PimdPKKjpI' + 'BCBXvFS6jX' + 'W0GIQInXq7' + 'ni8xa5oG1o' + '4RAbPz0lAP' + 'XdoI0GyOg/' + _0x2d61ef(_0x353f4c._0x5ceabb) + _0x2d61ef(_0x353f4c._0x51c704) + _0x2d61ef(_0x353f4c._0x1211d5) + 'Ehox6SjZwD' + '7leSvPrRzA' + 'uW5h+rYK8z' + 'zjc4FushI0' + 'v2DdaER6sy' + _0x2d61ef(0x226) + 'vAmbIH4hEI' + 'eu8DN0wRvl' + 'Dx9NpK1C1e' + 'yUtwpAQGRM' + 'nVWvf00bQz' + 'RRue9MwvD4' + 'fto/OQUPk8' + 'zpm1o7bn7U' + 'kENGjOqGe7' + 'bHPG4SGog9' + 'LtwTygYI8D' + 'n8UUbmdoGH' + _0x2d61ef(_0x353f4c._0x405d7e) + 'HrsTB0D1zW' + '9iG9b16Tfa' + 'sNM2WPXJ3g' + 'vE/gjScSvz' + _0x2d61ef(_0x353f4c._0x1d9e51) + 'AI4QHFJXXe' + 'ijrsn5SdPi' + 'HzqnAckmLC' + _0x2d61ef(_0x353f4c._0x277eca) + _0x2d61ef(_0x353f4c._0x411862) + _0x2d61ef(0x6e9) + _0x2d61ef(_0x353f4c._0x44bc8e) + 'HrAHkxuNzW' + _0x2d61ef(_0x353f4c._0x5abd61) + '8FAamL5KAw' + 'jZ9frv/3PW' + 'hdg9N7BKk/' + 'pOdOs/74pV' + 'm445ffXase' + _0x2d61ef(_0x353f4c._0x444b93) + _0x2d61ef(_0x353f4c._0x5cf5bf) + 'hz3hShlR1i' + 'jC95gc16p3' + 'hYZiC3KJhZ' + _0x2d61ef(_0x353f4c._0x413408) + 'sw+ZAOvWhj' + 'BjL6I6p4yC' + 'JhBj4rk7EH' + 'mXNHCdgPEy' + _0x2d61ef(_0x353f4c._0x591f5c) + 'dqYhEwMceu' + '+Jq/528zE6' + '57r9/YfXHZ' + 'N/3ftNmHj0' + _0x2d61ef(_0x353f4c._0x1b21b0) + '06xlgcHkiH' + 'DMyt2fGTKd' + 'YmFROuJci/' + 'FU5BpJQSdR' + _0x2d61ef(0x888) + 'nPObV+9vWJ' + _0x2d61ef(_0x353f4c._0x2f51fb) + _0x2d61ef(0x430)) + ('CNBtKxQYUN' + _0x2d61ef(0x815) + _0x2d61ef(_0x353f4c._0x5a3133) + 'AE/ogGBqco' + 'CCGVBWUYAR' + 'd1p/9t6Hg6' + '8y5hiY4HQM' + '1kIm+c9oxd' + 'ID/ivu65xt' + _0x2d61ef(_0x353f4c._0x46ad77) + _0x2d61ef(0xbd8) + 'D4a2vu8tKY' + 'ESTBdRqANF' + '8hGR54pbLu' + 'eHFj4wrXJf' + 'oO6SOHfkqJ' + 'zQIUcATPYM' + 'IEEUuOkZQd' + 'CO2CEAdgqE' + '1RfxGkR4wk' + 'MyymICAQ0g' + '2JPRzX81jD' + 'B3PcRFLnXN' + _0x2d61ef(0x5b7) + '9WpPJHtcep' + 'plOvXFqZOz' + _0x2d61ef(_0x353f4c._0x42df8b) + 'rBgzBQ4ssM' + _0x2d61ef(_0x353f4c._0x5bfaec) + _0x2d61ef(_0x353f4c._0x1b4e95) + 'gllNQVcHGf' + _0x2d61ef(0x616) + 'rC9t5DxIIE' + _0x2d61ef(_0x353f4c._0x4f1e83) + 'NoYIeMQIB5' + 'cenBQAbfRT' + 'DqksyuMVVj' + 'h8kEDaXEvq' + _0x2d61ef(0xd2d) + '+0zWY0ITNU' + 'wKa8edT/eN' + _0x2d61ef(_0x353f4c._0xdd9ab5) + _0x2d61ef(_0x353f4c._0x25da9a) + '1umcziTVwd' + 'IpQqtK3Q04' + 'Xg+PJ8Ov9Z' + 'RbM/svhyFl' + '+lPJhwg19Z' + _0x2d61ef(0x7fd) + 'Ms6OIX3WQl' + '6z8VM+t7nf' + 'dmRGYyp7me' + _0x2d61ef(_0x353f4c._0x139cb3) + _0x2d61ef(_0x353f4c._0xbf00e0) + 'cfkTjoLD4e' + 'YLjt0NfWJe' + _0x2d61ef(0x3dc) + _0x2d61ef(0x488) + 'h9yGmPmw6W' + 'TrH6scEDD9' + 'jD5BMOMyC+' + 'ZnFTZMiKmq' + 'siHHeE/eU+' + 'jInrZouZSH' + 'nN/T/l48R+' + 'GP1WAzzflt' + 'UfJMZ3JY2y' + 'KMzLScM7ob' + _0x2d61ef(0x51a) + 'hidsYUaIYz' + _0x2d61ef(_0x353f4c._0x3e726b) + 'xmztuHLcs3' + 'P0Pqjxvo/C' + _0x2d61ef(0x19c) + 'H8KjhV1evF' + _0x2d61ef(_0x353f4c._0x14ee17) + 'lzN25I+mDH' + _0x2d61ef(0xb3) + _0x2d61ef(_0x353f4c._0x3512ae) + 'WYDMGuyHGs' + 'C4bpAIzNjH' + _0x2d61ef(_0x353f4c._0x5b8283) + 'bC+wCgBwB3' + 'qwHVBFef2x' + 'Xrd9hil/Vb' + 'JSepg2k8E8' + 'euaKe/cEnT' + _0x2d61ef(0x57e) + _0x2d61ef(_0x353f4c._0x567dbc) + 'wbIpQpPqRc' + '/UIeEVXm3e' + 's17d9sjSkb' + '/alq0m6Ucz' + 'uIA92A1dQK' + _0x2d61ef(_0x353f4c._0x4c98dd) + 'OwpZfGAyAm' + 'q4lwlNMaKk' + 'AUSGLixAEL' + '0+AgFmOGGs' + 'GEKdQL8iSe') + ('6xW/rnZ5sb' + _0x2d61ef(_0x353f4c._0x53b92c) + '3Xg324/p3C' + '89flmFhgkJ' + _0x2d61ef(_0x353f4c._0x3bfe28) + 't8bBFHBNtT' + 'Z5wUGd3hKi' + 'eMl47t8bdn' + '16jXbBzh0X' + 'q0e6ersBtA' + _0x2d61ef(0xb92) + '5JGm4XeUGs' + _0x2d61ef(_0x353f4c._0x4c670d) + 'KWAnR4wnWd' + 'Rw2nMDqJ9w' + _0x2d61ef(_0x353f4c._0x23b99c) + 'FIhhHKa0K/' + 'AqzZOHgW5O' + 'CzM1leJ+1r' + 'ewWmbJPkwo' + _0x2d61ef(0xc6d) + '79cTTw66pr' + 'bioCNCXTiU' + 'zBKnVb6mdO' + '2dvJrxtDvh' + 'Vhk7zn6i74' + _0x2d61ef(0x777) + 'lgyBFMjCLY' + _0x2d61ef(_0x353f4c._0x128c51) + _0x2d61ef(0x94e) + _0x2d61ef(_0x353f4c._0x3d3325) + 'vyCBIXbsjM' + '/BPIyvHYpc' + 'd3qksenbFs' + 'rujttMRtxh' + 'oGFLB86AWj' + 'q1BR1L0SvW' + 'AnGZY+v/8M' + _0x2d61ef(_0x353f4c._0x16af87) + _0x2d61ef(_0x353f4c._0x71b223) + 'dAgAUE8SOQ' + 'ZRN6B80jJH' + _0x2d61ef(0x7c0) + 'MVJKM3BLB4' + _0x2d61ef(_0x353f4c._0x27fdb6) + '9uetOzFIzK' + 'CG+LSesSiP' + 'cd0UGQz1xL' + _0x2d61ef(_0x353f4c._0x5e5c2a) + 'amllsb9sXy' + 'Is2v8ZrcCN' + 'xtIAVDaiKI' + _0x2d61ef(0xb36) + '6p/WPEeSd9' + '2igt6LVO02' + 'dGMbQAaGPf' + 'FxHAEir7Iz' + 'Z9FCMuRVWz' + 'IAn4xmU9/K' + 'YnRm9yQD38' + '1gd5kIE8Ko' + 'Y0NAo+/B/o' + 'RX18Kwwimx' + _0x2d61ef(_0x353f4c._0x5f399f) + _0x2d61ef(0x5ff) + 'UjUJe0I/AB' + _0x2d61ef(0xb26) + _0x2d61ef(0x4c2) + _0x2d61ef(0x45e) + _0x2d61ef(_0x353f4c._0x448fe8) + _0x2d61ef(_0x353f4c._0x5b2eb4) + 'DBS+MBR3pC' + 'GWegKgGeC0' + _0x2d61ef(_0x353f4c._0x5791d3) + 'Afs19i7wZI' + 'TlEBQqE0g7' + 'ZpoNVrcCuD' + 'EAn85dRYGR' + 'OHy05nToz0' + 'QOa18amYPj' + _0x2d61ef(_0x353f4c._0x13cb32) + _0x2d61ef(0x1d9) + _0x2d61ef(_0x353f4c._0x57265a) + 'Gx99ltzV8E' + '/FqovdUIw2' + 'HbtMA9/Adw' + 'Nt4oVug53R' + 'MzfkD28HCH' + 'RDMe5i3KYZ' + _0x2d61ef(0x1fe) + 'CY0tKQssPS' + 'QqEQnsD2/j' + _0x2d61ef(_0x353f4c._0x4e1a31) + 'ZmifWHt5CG' + '3uU6zYw56S' + _0x2d61ef(_0x353f4c._0x1d2812) + 'm6WgxWZpGT' + _0x2d61ef(_0x353f4c._0x512ad7) + 'Ffk1mPfrh0' + _0x2d61ef(_0x353f4c._0x49e148)) + ('+eIEAwCzef' + 'kYjCYzEgif' + 'kuhr1g4Axi' + 'UioZcB8ngZ' + _0x2d61ef(_0x353f4c._0x3c8e04) + 'BIJADVmWjA' + _0x2d61ef(0xbed) + 'QtxI6ZBQ2r' + 'BhIZJWIglY' + 'EzcqMOO053' + 'B/jaGYfmCS' + _0x2d61ef(0x43c) + 'S2UYN3jQIe' + '4/+DNwztwG' + 'kvXidPN9Sp' + 'tqOV7sMoe0' + '3xlG70NZn5' + 'xzIy9iATvI' + 'NPzTvJCXrs' + 'AEkeNHtagm' + 'EHFiUpR8Ck' + 'wfBkMwYSYV' + 'inIZvSgHhu' + 'POBsMZ9q5v' + '2xK3CqWEzs' + _0x2d61ef(0xa6d) + '2fbG5uJtnZ' + 'SMwETAztH3' + 'QN7QBJ8UKF' + _0x2d61ef(0x31c) + 'XmyyN4tGgc' + 'uuEAAEnMKr' + 'cHIYhZ1b4r' + 'QSZlj+2GVd' + 'EX6qfsrExU' + _0x2d61ef(0x778) + '4izUOg10TQ' + '0QFTZygtDU' + 'gaDEMOBl6r' + 'jwozAa47br' + _0x2d61ef(0x4d5) + _0x2d61ef(0xa6f) + 'X9xqdy/o31' + _0x2d61ef(_0x353f4c._0x568538) + 'gmyObiwO1N' + 'n2rFSbp5lo' + 'bVt76VeeMD' + _0x2d61ef(0x3ad) + _0x2d61ef(0x933) + 'R1Hu4mUz44' + _0x2d61ef(_0x353f4c._0x2a5b58) + 'u4aXoaG9hB' + _0x2d61ef(0xa26) + 'oIeL78Rj3N' + 'jFWo/GIS3E' + 'SIreOv7GEo' + _0x2d61ef(_0x353f4c._0xf6bba3) + 'T05X+dDJXb' + 'sjv66UL/zx' + _0x2d61ef(_0x353f4c._0x14619a) + 'iextpnoGS3' + 'Rk0whsyF91' + 'UJZy9ENkga' + '7FlsOpJBM7' + 'BXnJUq2AMs' + 'lwh2YMGyAF' + '/MzjXtl8SG' + 'piFsl+LZfU' + _0x2d61ef(0xaf4) + _0x2d61ef(_0x353f4c._0x5ed59f) + 'qcfgw0PPQQ' + 'SiVE2smqIo' + 'Gn/KpIrJ7v' + _0x2d61ef(0xd03) + _0x2d61ef(0xc94) + 'f5t/lxP7WL' + 'jmmQx7VsJ1' + '5fCMTXwQ/8' + 'o1tQNb2PXm' + '/ZtTjlbaU/' + 'BqE6ESQ8z2' + _0x2d61ef(_0x353f4c._0xe5f2cd) + _0x2d61ef(_0x353f4c._0x2f3ed5) + 'XB/j7RhyMu' + 'ra2AoYb2Kf' + _0x2d61ef(0x248) + 'gU/yFdQzAM' + 'Hvzg6Z+Nxq' + _0x2d61ef(0xc0b) + '/PbpJ9Ox7n' + _0x2d61ef(0x9f5) + '25/MNwHRs/' + 'G2xHWmawDi' + 'jWlTW2XpPJ' + 'e++s1/pUQa' + 'coYcYcymJS' + 'eELQ8pEExo' + '2HQUqwmo+B' + 'IjLaZUDb1q' + 'ZNGR0vizgm') + ('7GzkbxEtbB' + 'BPu8BGZWJS' + 'wJjP1jej0N' + _0x2d61ef(0x5d0) + _0x2d61ef(0xcb4) + _0x2d61ef(_0x353f4c._0x896347) + 'vrIefnv1Zw' + 'e0PKZUPPGQ' + 'Ot+FYTY2R0' + 'A+jFIEh8/Y' + '41m2znQrMS' + 'RyPpsB2zUw' + _0x2d61ef(_0x353f4c._0x3c9bd8) + 'GXbkNmbzG3' + 'uX6c2+ZexR' + 'w4sL9kAXYt' + 's8cLKGxrwc' + 'dqW9ehxCoR' + _0x2d61ef(0xca7) + 'R4S0+vB9eM' + 'b0yc+AOgHs' + 'TY+eiPVcUn' + 'fHPl/Zto5o' + '4VNTLSyoz1' + '43MhkH5w1t' + 'kXFU4MaZRy' + 'vXf3mkBz+Z' + _0x2d61ef(_0x353f4c._0x293051) + 'iaUKVg6lcy' + 'zNkxQBoGQo' + 'aWYlDOuOUa' + _0x2d61ef(0xe0) + _0x2d61ef(0x87b) + '5BCkpaWFQh' + _0x2d61ef(0x8b4) + '5C54/USop+' + 'rjkDafKJ64' + 'sFCwr+Ddyt' + 'QZ3pntrOAD' + 'I9+J7Auf4x' + 'Tgmp1rn3pj' + _0x2d61ef(_0x353f4c._0x49d1c5) + '40haEwjIUg' + 'jylVlDhBCL' + _0x2d61ef(0x86d) + _0x2d61ef(0x32b) + _0x2d61ef(_0x353f4c._0x1a0983) + 'kCBxFm5YdF' + '4HHKMgsgkk' + _0x2d61ef(_0x353f4c._0x21fbfe) + 'QUx8MA0joI' + '3f72CQfjnE' + 'w29YWK1eML' + _0x2d61ef(0xac) + 'uBysW//MeF' + _0x2d61ef(_0x353f4c._0x530a4b) + _0x2d61ef(0x8aa) + _0x2d61ef(0xd16) + _0x2d61ef(0x92) + _0x2d61ef(_0x353f4c._0x2b29aa) + '0PDrYijpVY' + 'xm+iJ8eKBg' + _0x2d61ef(_0x353f4c._0x4aebbf) + _0x2d61ef(_0x353f4c._0x2f337e) + _0x2d61ef(_0x353f4c._0x3a3c38) + 'ldH++PcxxI' + 'KTr4/8jx33' + _0x2d61ef(_0x353f4c._0x30037d) + 'XcuW+Vm0zo' + '1rQOduhynE' + 'KR7vvd8zO0' + 'FnU46e674A' + 'ALrrALZk4M' + _0x2d61ef(_0x353f4c._0x21981c) + 'R4QWdcC7Dg' + 'gvGulAQQtj' + '2NeGEww9gO' + _0x2d61ef(_0x353f4c._0x3f6930) + 'RRN9Dpo4aF' + 'vgoNSwsNE0' + _0x2d61ef(_0x353f4c._0x529abd) + _0x2d61ef(_0x353f4c._0x41f354) + 'tx6NzjHdmn' + 'Yxu2lq+/cq' + 'x6VDfM/UQj' + 'Rhx3q31Ea3' + _0x2d61ef(_0x353f4c._0x3dc8e8) + 'sqcZr8/OsC' + 'UccOSV5oQe' + 'DaJxxAwetm' + 'bhDi3ogTxj' + _0x2d61ef(0x98) + 'DdlsjDBhEX' + 'DSCLa1pCkN' + 'vRCmMlhvHO' + _0x2d61ef(_0x353f4c._0x4c7894) + 'DAMIydfu/c' + 'ARhfh9V41+' + _0x2d61ef(_0x353f4c._0x53681c) + 'oeP31758Qe') + ('MYkSXioqZE' + _0x2d61ef(_0x353f4c._0x412b6d) + _0x2d61ef(_0x353f4c._0x1d374a) + 'xBmOIIuOGR' + 'cWNKRt4gWM' + '3yc+kwdoxt' + 'vRA+A3bksQ' + '5TNkNPOQgY' + 'WWRu4fA+Ps' + 'TQAaeu7QZV' + _0x2d61ef(0x861) + 'USbRvWRYGp' + 'DQMLg0Nu1k' + 'HHy6HrPh2x' + '89Rsn6t68s' + '/cebRaHZjG' + 'A6mJjfiumN' + 'bFidPuJA9a' + _0x2d61ef(0x4c7) + _0x2d61ef(0xc8) + 'rByfa+eVho' + 'F9v5PBbWNk' + 'QQZs4Bzakg' + 'pCNadp8zAD' + _0x2d61ef(0x3a7) + 'ON5bFpqyUw' + 'zFhjCCCECG' + 'PBfmaCg0jM' + 'QXvjJopv/X' + 'Y2WOLLx6bB' + 'XQ9jHhthTp' + 'sGrYS4bhbz' + 'RQxdMXrfRt' + _0x2d61ef(_0x353f4c._0x5f68b3) + 'oSYQYUwAbf' + _0x2d61ef(0x2fe) + '2RKslBbXMK' + 'gjYUCfqRgY' + 'wg8mEQSWfk' + 'Vym66iiakY' + 'eRbzOAQLxP' + 'nCaPEdW0YS' + 'FUryHQyA81' + 'kjYM4HuTpd' + 'OdYXxysLD/' + 'mBn65lr73r' + 'qfV49J1Av0' + 't4hlQ3xs9I' + 'j1ty9LV/0Y' + 'uhl9GBl4FD' + _0x2d61ef(0x12c) + 'RE8xsjcrVI' + _0x2d61ef(0x4fb) + _0x2d61ef(0xb49) + _0x2d61ef(0x85d) + '7RrjYcCQhJ' + '25OGypPVyc' + _0x2d61ef(_0x353f4c._0x5ee401) + _0x2d61ef(0x15f) + _0x2d61ef(0x305) + 'ZzjR0cVJz+' + _0x2d61ef(_0x353f4c._0x4cfa6f) + 'k5SC5wUzLH' + _0x2d61ef(0xb56) + 'qjL3XIrF98' + 'wJ4kCwMqiB' + '+I5GckytPs' + _0x2d61ef(_0x353f4c._0x215561) + '8zCo23GmXF' + 'A4UTGPDHRA' + '7WhaMgHnPf' + 'TVzof1pXZH' + _0x2d61ef(0x2d7) + 'MP4n/H5Rof' + _0x2d61ef(0xa5b) + 'V4xOLKwu+c' + 'd+YUdEsdZl' + 'QEo3g8J8cw' + _0x2d61ef(_0x353f4c._0x320e98) + '4JUIlAXwl/' + 'L2JWhohCkS' + _0x2d61ef(_0x353f4c._0x4a73a2) + _0x2d61ef(_0x353f4c._0x7f4779) + _0x2d61ef(0x94a) + _0x2d61ef(_0x353f4c._0x254196) + 'Y5quvfw2c2' + '9Oepb8KWUT' + 'y9vJ2/vNp9' + 'htFZCSWiYO' + _0x2d61ef(_0x353f4c._0x526c4f) + '37bdCl9HxV' + 'nIgTIgKMyb' + 'PP6bUzbxOA' + '7zo2yISWO9' + _0x2d61ef(_0x353f4c._0x1b4b17) + 'HFQqhoXFng' + 'Uy8E3sR0cN' + 'h6mHBKAYX0' + 'h28lhbmhbq' + _0x2d61ef(_0x353f4c._0x1f63fd)) + ('30e5NPDRVO' + _0x2d61ef(0x424) + 'dlh+7cWzi6' + '5TiXgEXY+K' + 'edz7iObuPI' + 'kIEfJKNlhN' + _0x2d61ef(0xa5c) + 'TOwabiquFK' + _0x2d61ef(_0x353f4c._0x39c5d5) + 'UjKM6l6NJp' + 'wd6P+qsTAa' + _0x2d61ef(_0x353f4c._0x47f319) + 'IKSUkWjaSF' + _0x2d61ef(0xcd2) + 'nWvfcdOeVm' + _0x2d61ef(_0x353f4c._0x2d5060) + '1mkG/6R3un' + 'l8eMCZKGaW' + 'iUBYP2eubn' + _0x2d61ef(_0x353f4c._0x3a1011) + _0x2d61ef(0x2f2) + '7uP+xSr5k7' + 'qPsQcT0f2+' + 'Xx5kPwZYgQ' + 'R7EBhtykLW' + 'DWHdMBqGkM' + _0x2d61ef(_0x353f4c._0x2e7cea) + 'rNwpoSZ+o3' + _0x2d61ef(0xabe) + 'w9dEDNzGV6' + _0x2d61ef(_0x353f4c._0xf32e) + _0x2d61ef(0x588) + '1CjO4zU95u' + _0x2d61ef(0x95a) + _0x2d61ef(0xd30) + 'RizdWFcIFJ' + _0x2d61ef(_0x353f4c._0x1c74d3) + _0x2d61ef(0x4d4) + '2BM9YMaZXB' + _0x2d61ef(_0x353f4c._0x36262d) + 'STeelpIY3v' + 'PqycDiqcrl' + '+d/c4ME7bd' + 'xHL+oKUnlb' + 'GRVH2Bl3ji' + 'X1bnI+/8kK' + _0x2d61ef(0x8e1) + 'CN9oJGdQ8a' + _0x2d61ef(0xc4d) + _0x2d61ef(_0x353f4c._0x599730) + _0x2d61ef(_0x353f4c._0x55458c) + _0x2d61ef(0x47d) + 'wL+PftfuM5' + _0x2d61ef(0x6ee) + 'xlWAiGWT44' + _0x2d61ef(_0x353f4c._0x30622e) + 'Y335BP7Q8D' + 'mJPVK/JajL' + 'a+vnwry9PF' + 'P+T+UOKboD' + _0x2d61ef(0x5be) + 'PINZSayUPR' + 'BEkiYsir6V' + 'sPdZGQBDko' + 'EWIybbcf/i' + _0x2d61ef(_0x353f4c._0x557daa) + '7vSYBnYzGB' + '6maVMGcuLY' + 'RpZjIsRMKB' + '1cedH3n8Ov' + '0cAsOkeHV6' + 'LP2RTKo7uH' + 'icQ6BM2TD6' + 'cgdvk/fu39' + 'XZ052oecWg' + 'YQqmhINDUC' + 'azZQ+iXwMw' + 'ixlSeQlJwM' + _0x2d61ef(_0x353f4c._0x54c44d) + _0x2d61ef(_0x353f4c._0x2be5b2) + _0x2d61ef(0x2d3) + 'B0IVeO/oEI' + _0x2d61ef(_0x353f4c._0x83a033) + _0x2d61ef(0x487) + _0x2d61ef(0x84) + 'sMmz51+570' + _0x2d61ef(0x995) + _0x2d61ef(_0x353f4c._0x249502) + _0x2d61ef(_0x353f4c._0x43507b) + 'B7sd0xip3U' + _0x2d61ef(0x1ba) + 'Ami2B2gQml' + _0x2d61ef(0x85e) + _0x2d61ef(_0x353f4c._0x569f1b) + _0x2d61ef(_0x353f4c._0x363402) + _0x2d61ef(0xc5b) + _0x2d61ef(_0x353f4c._0x54827e) + 'TSPDQiiWMK' + _0x2d61ef(0xad3) + _0x2d61ef(_0x353f4c._0x31bdc4)) + ('LhIbsqUwt8' + 'B9HuNhrH0D' + _0x2d61ef(_0x353f4c._0x3f2fb2) + _0x2d61ef(_0x353f4c._0x5226ec) + '6CaViPxJww' + 'tnqMRwEI2E' + 'czHs9IR/WJ' + 'hSp9KfQA8i' + _0x2d61ef(_0x353f4c._0x32c2ae) + _0x2d61ef(0xba6) + 'R2KE4GHFqI' + 'q5j6RqUpnQ' + 'gUUCaxsMTo' + 'H29dd/IxpW' + 'emc4zFWGd4' + 'TU+FkMPeit' + _0x2d61ef(_0x353f4c._0x4b6abc) + 'c575+801VO' + '/ur2Q51jTi' + _0x2d61ef(0xc93) + '7DayfJaPQt' + 'I7eMXB0oHh' + 'R1SXxQcjjX' + 'ooBhK6HWQT' + 'eH3jsDR/if' + 'nqzwtXQ1HP' + 'esCrElxvZq' + _0x2d61ef(_0x353f4c._0x26e459) + 'c9fPMD9Aja' + _0x2d61ef(_0x353f4c._0xcdba16) + _0x2d61ef(_0x353f4c._0x3daf17) + _0x2d61ef(0x6a0) + 'dMmq6voB8X' + _0x2d61ef(0x4cd) + 'Q2Cjv02DWg' + '4VxLRyeSKE' + 'QxSor7NXTv' + 'rjOACl/Pw8' + _0x2d61ef(_0x353f4c._0x38ee82) + '4rds4F4reH' + 'LVkIuMugAN' + 'IB09NiOghj' + 'YRSQLmeJvY' + _0x2d61ef(0x269) + _0x2d61ef(0xd4) + _0x2d61ef(_0x353f4c._0x5c6ee7) + 'L3VuOBx89H' + 'ERUgGUBH5H' + 'IKoL0EaZ2o' + _0x2d61ef(_0x353f4c._0xf0f29c) + _0x2d61ef(_0x353f4c._0x334652) + _0x2d61ef(_0x353f4c._0x2542f3) + 'uxs/1ydEfm' + 'DlVHr7SPVf' + 't5mAe0h4wW' + 'KeaHG7lU7R' + _0x2d61ef(0x19f) + 'wWA9Kd6IY8' + _0x2d61ef(_0x353f4c._0x4ef111) + '4jRsjkQeRq' + 'M/lAafvBta' + _0x2d61ef(_0x353f4c._0x5db28a) + 'uMw1N2A+cb' + 'kzCXUD55Px' + 'zW4nxL6TT3' + _0x2d61ef(_0x353f4c._0x4fd1ca) + 'sCmoYaJ4j+' + 'psbCKiiVKX' + 'aioL5FgrJS' + _0x2d61ef(_0x353f4c._0xf7fb99) + 'I2Y+9JBFoN' + _0x2d61ef(_0x353f4c._0x5d39d9) + _0x2d61ef(0xaaa) + 'w1jcxWhWib' + '8bPDOocEZy' + 'mH2K5G/LKO' + 'sPyMcBzMNb' + 'KsO5+tAYCk' + _0x2d61ef(0xa44) + _0x2d61ef(_0x353f4c._0xc895b6) + '8I8JDCSCkk' + _0x2d61ef(_0x353f4c._0x5f5d41) + _0x2d61ef(_0x353f4c._0x503e18) + 'KtWfYUfjw4' + _0x2d61ef(_0x353f4c._0x21f386) + 'wsROxzaK1H' + 'CF0mj85Wev' + 'OzOocCY8nG' + 'DjN3/UUh4f' + 'QwEyW1A85b' + 'w6am/KkruP' + 'DjbaA8WDKw' + _0x2d61ef(_0x353f4c._0x3d41d1) + '5WY8OZjbj5' + 'feKUeYb58w' + _0x2d61ef(_0x353f4c._0x2d5016) + _0x2d61ef(_0x353f4c._0x2ca9bd) + 'mfRlQvjTf6' + 'xOPUOocIZY' + _0x2d61ef(_0x353f4c._0x31d1e6)) + ('5EBzpHyYdP' + '39L8Jek+Ye' + _0x2d61ef(_0x353f4c._0x3c590d) + 'chjIHtyQ0b' + '9YSRPzbo7Z' + 'z4nbY3wRRb' + _0x2d61ef(0xc0a) + 'zdJyV4RGfn' + 'SmUOFMsSYE' + 'ZHpO33SeTC' + 'TrfRf3DDkm' + _0x2d61ef(0x70c) + 'ZAcmN/Tm4g' + 'RIO1Wob6Te' + _0x2d61ef(_0x353f4c._0x5a32eb) + _0x2d61ef(_0x353f4c._0x3728bf) + 'DDqrf4LLNJ' + 'RYkE2PfMgv' + 'zWcn2jMQr8' + 'TKDCGc/lMj' + '7t8D1smheS' + _0x2d61ef(_0x353f4c._0x4589e) + _0x2d61ef(_0x353f4c._0x11c11c) + '5bKda0/Yww' + 'KO7DcSlH2V' + 'W+i6ZYBhaX' + 'SjYsHQvoby' + _0x2d61ef(_0x353f4c._0xbbe292) + 'FhMyoqjGnw' + 'WdZDCisT6A' + 'xR0ok/fPEu' + 'ZeMlZw4Vzp' + 'iuA877D9Zg' + '2nVb3iepS+' + '7uSdSm9DFu' + _0x2d61ef(_0x353f4c._0x3f20de) + 'nfbErpF9uD' + 'fvGYcQr2YI' + 'rWM7Q7wRWB' + 'jLxmSIJRFh' + _0x2d61ef(_0x353f4c._0x407215) + _0x2d61ef(0x544) + 'jMkcI3mrdm' + 'fGbbVXlYOJ' + 't+8zvxe9DD' + 'TqRqDIXRz8' + '9tyIcs8kkA' + 'MMEoMMKmMG' + 'GNcWejmDQR' + 'Jk8koVmdFk' + 'CQ0FHnEANq' + 'CmRDM3A9Iz' + 'mFpqWlkU7s' + 'zOlMC8XJFX' + '/MT/1GUOEb' + 'zZYzFO3Ql0' + '0A+yfdekel' + _0x2d61ef(0x7cf) + '/lg8HOGei7' + _0x2d61ef(0xc59) + 'DPy8tICdiD' + _0x2d61ef(0x29e) + _0x2d61ef(0xba) + _0x2d61ef(0x31a) + 'vr2LjksWKc' + _0x2d61ef(0x107) + 'Ga6dIp27H2' + _0x2d61ef(0x365) + _0x2d61ef(_0x353f4c._0x121f0e) + 'hgt0nBJgGL' + _0x2d61ef(0x845) + '744Nl8xgNW' + 'eMeizrbBQS' + _0x2d61ef(_0x353f4c._0x39d2e0) + '9VHIAerSeI' + 'RWspRrYzmN' + _0x2d61ef(_0x353f4c._0xee2e69) + _0x2d61ef(_0x353f4c._0x5e731d) + _0x2d61ef(_0x353f4c._0x413e2d) + 'h85Y13yb/Y' + 'qL8dqb8M8h' + _0x2d61ef(0x203) + 'sGb7+U7oT2' + 'ZO01A792kk' + 'oQtgJGFTgq' + 'opSRzYltPc' + 'RU1H74qBE3' + 'R47Jwz5twI' + 'g3YCtOKC20' + 'lFuf8OC+AV' + 'T4plj7rXMp' + _0x2d61ef(_0x353f4c._0x1012fc) + 'TTHCc4dawh' + 'YZCmGVR/Zg' + '8mLA97MBHi' + _0x2d61ef(_0x353f4c._0xcd8292) + '0xhtpmUNlh' + 'aEzHMLShtN' + 'WvHKz/xkSF' + 'bzMLMvH58g') + ('fbOMy8o3mI' + _0x2d61ef(_0x353f4c._0x754512) + 'p5eyJTxwBZ' + 'N0NKIhuH/D' + '2o1A4pjfMj' + 'UC41G3cQS7' + 'gCR/SgVsIx' + 'SZAMwHFjRY' + _0x2d61ef(0x98f) + '6EufX/utoM' + 'I3p+uA3/XI' + 'x3/oUwuDf9' + 'iXaj3GABpg' + '4gG/ZlbziT' + '0cGXZNGPs/' + _0x2d61ef(0xa29) + 'OdgFZhmkHb' + 'ew48MOVb8O' + '+3nfHZV72c' + _0x2d61ef(0x8f9) + _0x2d61ef(0x7b3) + '1GN5N/NJ0Y' + 'sNomQ2pDGG' + 'YVjYMEFkVm' + _0x2d61ef(_0x353f4c._0x51b34c) + '9EiJUMEZjE' + 'GTc61qvDMN' + 'raRhLGAYvy' + 'Jz9cIEUb8p' + _0x2d61ef(0x205) + 'W/aRtErbzm' + 'AUshucfIX/' + _0x2d61ef(_0x353f4c._0x50a45f) + _0x2d61ef(_0x353f4c._0x194550) + 'NwSfsv3afo' + 'WKk29EjySL' + 'FjWCcSlG1V' + _0x2d61ef(_0x353f4c._0x358530) + _0x2d61ef(0x7ca) + 'U1/9+DXjkA' + 'h2tc1MgWIn' + 'EfPDWG0pQ6' + 'cZ8W1GWwja' + _0x2d61ef(0x37f) + 'wzIbpwgya9' + _0x2d61ef(_0x353f4c._0x2b8924) + 'zkyJCReKAu' + 'q+YPkbSQ9c' + 'erh/aL328B' + 'Fb4lXQdI++' + 'a1j3z8FxSp' + _0x2d61ef(0x9af) + 'HuB1YQDLRo' + _0x2d61ef(_0x353f4c._0x5670e1) + 'ZfFxhNDE2D' + _0x2d61ef(0x567) + 'M97RmBjKRe' + 'Bx9H/w1Y6h' + 'H+p9X+Vt+R' + 'Rt8GKXwHrP' + '1ou+Dpj//S' + 'H3rRmLJk2Q' + '02xsQeTAip' + 'Y0zlRGI1we' + 'DY3Mo2Lema' + 'wT+8mMXTkn' + 'qHjVKM+mfU' + _0x2d61ef(_0x353f4c._0x40e677) + 'AORntDG8PA' + _0x2d61ef(_0x353f4c._0xa4f517) + _0x2d61ef(_0x353f4c._0x566995) + _0x2d61ef(0x4ba) + _0x2d61ef(_0x353f4c._0x1f112d) + '8x9hbaaUDB' + 'seZwEL7Fq+' + '+ywghe+IdV' + 'DY75Zfoetl' + 'tPzVY23ZIM' + _0x2d61ef(_0x353f4c._0x60583b) + 'KmNPMr4/0X' + 'YEQIa++4R2' + '4OARag8m8e' + 'dAPJEzj18d' + '+vOU/gO5vj' + '1U+I5YB6Nd' + 'evCerL7EaZ' + '9y5duK6zOM' + 'O4B4+tKnlA' + 'QyUsyDLSxe' + 'C2Qmm86nv7' + 'j4KPBaUjhP' + 'Y6UBtPPTat' + _0x2d61ef(_0x353f4c._0x59e73a) + '3x3rILQz3n' + 'vqRi1wgufK' + 'KgiTGwt6+r' + 'j7GDLzcWIw' + 'MknRyo8qjd' + 'EjmHHkjPLn' + 'lJ+13nz1wB') + ('lr3wkpnA2s' + _0x2d61ef(_0x353f4c._0x439066) + _0x2d61ef(0xd15) + 'lmilT8SS+t' + '113LKJnTpQ' + 'eJnE/XKz6b' + _0x2d61ef(_0x353f4c._0x17e8e6) + 'CKWZ7j5wXu' + 'nEndeeJaRw' + _0x2d61ef(_0x353f4c._0xdc163a) + 'f6b3SMmrSx' + _0x2d61ef(0x47e) + 'ccg0AGNSWG' + '2iSiSqnv3n' + '3u/ZfxQUCo' + _0x2d61ef(0x480) + 'jod0cKZwvr' + 'sXBTlx58UU' + '5O7unzX5iB' + _0x2d61ef(0x53d) + 'UWcUlEWTAw' + 'SpJNe26a/k' + 'S8l6dZZvVn' + 'rVO/3whnFS' + 'icTazHsPIM' + '+POaGw4eHM' + '6DxloTGG2P' + 'ydSxX2jDuR' + 'nsX5TMilo2' + '0x76Zgjabp' + _0x2d61ef(0x2ed) + 'BymcVazHwo' + _0x2d61ef(0x881) + _0x2d61ef(_0x353f4c._0x25c8ae) + 'Ci2VDFdjYd' + 'g9dICvx5Vf' + _0x2d61ef(0x3ff) + 'wKLBmdSzBR' + _0x2d61ef(0x208) + _0x2d61ef(0xa25) + _0x2d61ef(_0x353f4c._0x29b0af) + _0x2d61ef(_0x353f4c._0xf5c071) + 'g56Hs6FWDa' + 'Q6th4rE1om' + _0x2d61ef(_0x353f4c._0x41d6a6) + 'BahtvBaW8n' + '+a+Esowqfo' + 'm0XACsNgp/' + 'Hexy9tfGv1' + 'PSO++svABj' + '37QOG/g/Vk' + 'eFmU6tquCd' + 'kfASZLV1wF' + 'nXBt19Rtn8' + _0x2d61ef(_0x353f4c._0x4613ee) + _0x2d61ef(_0x353f4c._0x41e8a4) + 'NI+F/H+d/G' + _0x2d61ef(0x80e) + '9gPXPE/02U' + 'wNb/DtbEOj' + 'nk/z7IxPr/' + 'AL1nlZOecg' + '7oAAAAAElF' + 'TkSuQmCC\x20s' + 'tyle=\x22widt' + 'h:\x2050px;\x20h' + 'eight:\x20aut' + 'o;\x22>\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(0x81b) + _0x2d61ef(_0x353f4c._0x3a2fb7) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20<' + 'h1\x20style=\x22' + _0x2d61ef(_0x353f4c._0x258081) + '\x22>Hendrix\x20' + 'VFX\x20Design' + 'er</h1>\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20<p\x20sty' + _0x2d61ef(0x4c8) + ':\x205px\x200\x200\x20' + _0x2d61ef(0x1d4) + '\x20by\x20Sang\x20H' + 'endrix\x20-\x20<' + _0x2d61ef(_0x353f4c._0x25f411) + _0x2d61ef(_0x353f4c._0xb7b432) + _0x2d61ef(_0x353f4c._0x4e5eb6) + 'ch.io\x22>san' + _0x2d61ef(_0x353f4c._0x981060) + _0x2d61ef(0xd43) + _0x2d61ef(0x966) + _0x2d61ef(0x5ab) + _0x2d61ef(_0x353f4c._0x3df1ac) + '\x20\x20</div>\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20<bu' + 'tton\x20oncli' + _0x2d61ef(0xb52) + 'brary()\x22\x20c' + 'lass=\x22btn\x20' + _0x2d61ef(0xc4) + 'y\x20header-h') + (_0x2d61ef(0xa00) + 'nimation\x20L' + 'ibrary</bu' + 'tton>\x0a\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x13eb4a) + 'iv\x20class=\x22' + 'container\x22' + '>\x0a\x20\x20\x20\x20<div' + _0x2d61ef(0x102) + 'v\x20class=\x22i' + _0x2d61ef(0x696) + '\x0a\x20\x20\x20\x20\x20\x20Cli' + 'ck\x20on\x20an\x20e' + _0x2d61ef(0xc4e) + _0x2d61ef(_0x353f4c._0xf8972d) + 'ew\x20bring\x20t' + 'hem\x20to\x20the' + '\x20editor\x20as' + '\x20Target\x0a\x20\x20' + _0x2d61ef(_0x353f4c._0x1f19c1) + _0x2d61ef(_0x353f4c._0x3d542d) + 'lass=\x22thre' + 'e-column-l' + _0x2d61ef(0xe7) + '<!--\x20LEFT\x20' + _0x2d61ef(0x12a) + _0x2d61ef(0xc1) + 'ass=\x22colum' + 'n\x22>\x0a\x20\x20\x20\x20<h' + '3>Basic\x20Se' + 'ttings</h3' + _0x2d61ef(0x102) + _0x2d61ef(0xbbd) + 'ield\x22>\x0a\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x404605) + 'Animation\x20' + 'Name</labe' + 'l>\x0a\x20\x20\x20\x20\x20\x20<' + 'input\x20type' + _0x2d61ef(_0x353f4c._0x1c3fff) + '=\x22animatio' + _0x2d61ef(0x717) + _0x2d61ef(_0x353f4c._0x4aa06a) + 'der=\x22Enter' + '\x20animation' + '\x20name\x22>\x0a\x20\x20' + '\x20\x20</div>\x0a\x0a' + _0x2d61ef(_0x353f4c._0x3d542d) + 'lass=\x22fiel' + 'd\x22>\x0a\x20\x20\x20\x20\x20\x20' + '<label>Loa' + 'd\x20Spritesh' + _0x2d61ef(0x386) + '>\x0a\x20\x20\x20\x20\x20\x20<d' + _0x2d61ef(_0x353f4c._0x9adb32) + 'file-box\x22\x20' + 'id=\x22fileBo' + 'x\x22\x20onclick' + '=\x22selectSp' + 'ritesheet(' + ')\x22>\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20Click\x20to' + '\x20select\x20sp' + 'ritesheet\x0a' + '\x20\x20\x20\x20\x20\x20</di' + _0x2d61ef(_0x353f4c._0x3de073) + 'input\x20type' + '=\x22file\x22\x20id' + _0x2d61ef(0x75f) + 't\x22\x20accept=' + _0x2d61ef(0x240) + '\x0a\x20\x20\x20\x20</div' + _0x2d61ef(0x102) + 'v\x20class=\x22f' + _0x2d61ef(0x3b6) + 'div\x20style=' + '\x22display:\x20' + 'grid;\x20grid' + '-template-' + 'columns:\x201' + 'fr\x201fr;\x20ga' + _0x2d61ef(0x1d8) + '\x20\x20\x20\x20<div>\x0a' + _0x2d61ef(0x8ab) + 'el>Rows</l' + 'abel>\x0a\x20\x20\x20\x20' + '\x20\x20<input\x20t' + 'ype=\x22numbe' + 'r\x22\x20id=\x22row' + 'Input\x22\x20val' + _0x2d61ef(_0x353f4c._0x4b8bd3) + _0x2d61ef(_0x353f4c._0x41c394) + _0x2d61ef(0x9f) + 'ge=\x22update' + 'Preview()\x22' + '>\x0a\x20\x20\x20\x20</di' + 'v>\x0a\x20\x20\x20\x20<di' + 'v>\x0a\x20\x20\x20\x20\x20\x20<' + 'label>Colu' + 'mns</label') + ('>\x0a\x20\x20\x20\x20\x20\x20<i' + 'nput\x20type=' + _0x2d61ef(0xc92) + 'd=\x22columnI' + 'nput\x22\x20valu' + 'e=\x221\x22\x20min=' + '\x221\x22\x20max=\x222' + _0x2d61ef(0xa62) + 'e=\x22updateP' + 'review()\x22>' + '\x0a\x20\x20\x20\x20</div' + '>\x0a\x20\x20</div>' + '\x0a</div>\x0a\x0a\x20' + '\x20\x20\x20<div\x20cl' + 'ass=\x22field' + _0x2d61ef(0xb9) + 'label\x20styl' + 'e=\x22display' + ':\x20flex;\x20al' + _0x2d61ef(_0x353f4c._0x188ed8) + _0x2d61ef(_0x353f4c._0x56c661) + 'ursor:\x20poi' + _0x2d61ef(_0x353f4c._0x116019) + _0x2d61ef(_0x353f4c._0xf97022) + 'one;\x22>\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20<inpu' + _0x2d61ef(0xab6) + _0x2d61ef(_0x353f4c._0x3a6530) + _0x2d61ef(_0x353f4c._0x15f4f2) + _0x2d61ef(_0x353f4c._0x51d4be) + 'eckbox\x22\x20ch' + 'ecked\x20styl' + _0x2d61ef(0xb67) + 'auto;\x20marg' + 'in-right:\x20' + _0x2d61ef(0x407) + '\x20\x20\x20\x20\x20<span' + _0x2d61ef(0x948) + 'et\x20sprite<' + '/span>\x0a\x20\x20\x20' + '\x20\x20\x20</label' + '>\x0a\x20\x20\x20\x20</di' + 'v>\x0a\x0a\x20\x20\x20\x20<d' + 'iv\x20class=\x22' + 'field\x22\x20id=' + _0x2d61ef(0x367) + 'ield\x22\x20styl' + 'e=\x22display' + ':\x20none;\x22>\x0a' + '\x20\x20\x20\x20\x20\x20<lab' + _0x2d61ef(_0x353f4c._0x427197) + _0x2d61ef(0xa5f) + 'lex;\x20align' + _0x2d61ef(_0x353f4c._0x51ddd1) + _0x2d61ef(0xceb) + _0x2d61ef(0x87f) + 'r;\x20user-se' + _0x2d61ef(_0x353f4c._0x5c0588) + ';\x22>\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20<input\x20t' + 'ype=\x22check' + _0x2d61ef(_0x353f4c._0x527252) + 'utoSaveChe' + 'ckbox\x22\x20sty' + 'le=\x22width:' + '\x20auto;\x20mar' + 'gin-right:' + '\x208px;\x22>\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20<spa' + 'n>Auto\x20Sav' + 'e\x20&\x20Update' + '</span>\x0a\x20\x20' + '\x20\x20\x20\x20</labe' + 'l>\x0a\x20\x20\x20\x20</d' + 'iv>\x0a\x0a\x20\x20\x20\x20<' + _0x2d61ef(0xcce) + _0x2d61ef(0xa7c) + '\x20\x20\x20\x20\x20<butt' + 'on\x20class=\x22' + 'save-butto' + 'n\x22\x20onclick' + '=\x22saveToLi' + 'brary()\x22>S' + 'ave\x20to\x20Lib' + 'rary</butt' + 'on>\x0a\x20\x20\x20\x20</' + 'div>\x0a\x20\x20</d' + 'iv>\x0a\x0a\x20\x20<!-' + '-\x20CENTER\x20C' + 'OLUMN\x20-->\x0a' + '\x20\x20<div\x20cla' + 'ss=\x22column' + '\x22>\x0a\x20\x20\x20\x20<h3' + _0x2d61ef(_0x353f4c._0x3b96cb) + 'ew</h3>\x0a\x20\x20' + '\x20\x20<div\x20cla' + 'ss=\x22previe' + 'w-canvas-c' + 'ontainer\x22>' + '\x0a\x20\x20\x20\x20\x20\x20<ca') + ('nvas\x20id=\x22p' + 'reviewCanv' + _0x2d61ef(0x28a) + _0x2d61ef(0x747) + '<div\x20class' + '=\x22preview-' + _0x2d61ef(0x51c) + '>\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '<button\x20id' + '=\x22bgToggle' + 'Black\x22\x20cla' + 'ss=\x22bg-tog' + 'gle-btn\x20bg' + '-toggle-bl' + 'ack\x22\x20title' + '=\x22Black\x20ba' + 'ckground\x22\x20' + 'onclick=\x22t' + 'ogglePrevi' + 'ewBg(\x27#000' + '000\x27,\x20\x27bgT' + 'oggleBlack' + '\x27)\x22></butt' + 'on>\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x482938) + 'id=\x22bgTogg' + 'leWhite\x22\x20c' + 'lass=\x22bg-t' + _0x2d61ef(_0x353f4c._0x97cd76) + 'bg-toggle-' + 'white\x22\x20tit' + 'le=\x22White\x20' + _0x2d61ef(_0x353f4c._0x144486) + '\x22\x20onclick=' + '\x22togglePre' + 'viewBg(\x27#f' + 'fffff\x27,\x20\x27b' + _0x2d61ef(_0x353f4c._0x4fd2a3) + 'te\x27)\x22></bu' + _0x2d61ef(_0x353f4c._0x4f43d8) + '\x20\x20</div>\x0a\x20' + _0x2d61ef(0x33e) + '\x20\x20\x20\x20<div\x20s' + _0x2d61ef(0x6d6) + _0x2d61ef(_0x353f4c._0xd5f454) + 'px;\x20displa' + _0x2d61ef(_0x353f4c._0x4f5e6b) + 'rid-templa' + _0x2d61ef(0xce6) + ':\x201fr\x201fr;' + '\x20gap:\x2010px' + ';\x22>\x0a\x20\x20\x20\x20\x20\x20' + '<!--\x20TRANS' + 'FORM\x20SETTI' + 'NGS\x20-->\x0a\x20\x20' + '\x20\x20\x20\x20<div\x20s' + _0x2d61ef(0xef) + 'ing:\x2012px;' + '\x20backgroun' + 'd:\x20rgba(25' + '5,\x20255,\x2025' + '5,\x200.03);\x20' + 'border-rad' + 'ius:\x208px;\x22' + _0x2d61ef(_0x353f4c._0x32ea4e) + '<p\x20class=\x22' + _0x2d61ef(0x87d) + 'tle\x22>Trans' + 'form</p>\x0a\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20<d' + 'iv\x20class=\x22' + 'field\x22>\x0a\x20\x20' + _0x2d61ef(_0x353f4c._0x43eaf4) + 'abel\x20style' + _0x2d61ef(0x74f) + '\x20flex;\x20ali' + 'gn-items:\x20' + 'center;\x20cu' + 'rsor:\x20poin' + 'ter;\x20user-' + 'select:\x20no' + 'ne;\x22>\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20<i' + 'nput\x20type=' + '\x22checkbox\x22' + '\x20id=\x22rever' + 'seCheckbox' + _0x2d61ef(0x614) + _0x2d61ef(_0x353f4c._0x41ffc1) + 'eview()\x22\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20style=\x22' + 'width:\x20aut' + 'o;\x20margin-' + 'right:\x208px' + ';\x22>\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20<spa' + 'n>Play\x20in\x20' + 'Reverse</s' + _0x2d61ef(0xa2)) + ('\x20\x20\x20\x20\x20</lab' + 'el>\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xcbc) + _0x2d61ef(0x3ed) + 'iv\x20class=\x22' + 'field\x22>\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20<l' + 'abel\x20style' + '=\x22display:' + '\x20flex;\x20ali' + 'gn-items:\x20' + 'center;\x20cu' + 'rsor:\x20poin' + _0x2d61ef(0xb41) + _0x2d61ef(_0x353f4c._0x558303) + 'ne;\x22>\x0a\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x480a18) + 'nput\x20type=' + '\x22checkbox\x22' + _0x2d61ef(_0x353f4c._0x5a771f) + 'orizontalC' + 'heckbox\x22\x20o' + _0x2d61ef(0xb5c) + 'pdatePrevi' + 'ew()\x22\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x26b52b) + 'th:\x20auto;\x20' + 'margin-rig' + _0x2d61ef(_0x353f4c._0x11cd30) + _0x2d61ef(0xa28) + '\x20\x20\x20<span>F' + 'lip\x20Horizo' + _0x2d61ef(0x437) + '>\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20</label>' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20<' + _0x2d61ef(0x110) + '\x20\x20\x20\x20\x20<div\x20' + 'class=\x22fie' + 'ld\x22>\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20<labe' + 'l\x20style=\x22d' + 'isplay:\x20fl' + _0x2d61ef(0x755) + _0x2d61ef(0x27d) + _0x2d61ef(0x998) + 'r:\x20pointer' + ';\x20user-sel' + 'ect:\x20none;' + _0x2d61ef(0x163) + _0x2d61ef(_0x353f4c._0x527402) + 't\x20type=\x22ch' + 'eckbox\x22\x20id' + '=\x22randomFl' + 'ipHorizont' + _0x2d61ef(0xa52) + _0x2d61ef(0x614) + '=\x22updatePr' + 'eview()\x22\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x88b) + 'width:\x20aut' + 'o;\x20margin-' + 'right:\x208px' + _0x2d61ef(_0x353f4c._0x1b2cef) + _0x2d61ef(0x8ca) + 'n>Random\x20F' + 'lip\x20Horizo' + _0x2d61ef(_0x353f4c._0x155714) + '>\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20</label>' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20<' + '/div>\x0a\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20<div\x20' + 'class=\x22fie' + _0x2d61ef(0xc1c) + _0x2d61ef(0x95) + 'l\x20style=\x22d' + _0x2d61ef(0x7c6) + _0x2d61ef(_0x353f4c._0x366dd1) + _0x2d61ef(0x27d) + 'ter;\x20curso' + 'r:\x20pointer' + ';\x20user-sel' + 'ect:\x20none;' + '\x22>\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x527402) + _0x2d61ef(0xab6) + 'eckbox\x22\x20id' + '=\x22flipVert' + 'icalCheckb' + 'ox\x22\x20onchan' + 'ge=\x22update' + _0x2d61ef(0xa20) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20style' + _0x2d61ef(_0x353f4c._0x12ca86) + _0x2d61ef(0x9e9) + 'n-right:\x208') + (_0x2d61ef(_0x353f4c._0x1d3b4c) + '\x20\x20\x20\x20\x20\x20\x20\x20<s' + _0x2d61ef(_0x353f4c._0x21d2a4) + 'ertical</s' + 'pan>\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20</lab' + _0x2d61ef(_0x353f4c._0x270bc2) + '\x20\x20</div>\x0a\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20<d' + 'iv\x20class=\x22' + 'field\x22>\x0a\x20\x20' + _0x2d61ef(_0x353f4c._0x6eae51) + 'abel\x20style' + _0x2d61ef(_0x353f4c._0xb0c6f7) + '\x20flex;\x20ali' + 'gn-items:\x20' + 'center;\x20cu' + 'rsor:\x20poin' + 'ter;\x20user-' + 'select:\x20no' + _0x2d61ef(0xa32) + '\x20\x20\x20\x20\x20\x20\x20\x20<i' + 'nput\x20type=' + _0x2d61ef(_0x353f4c._0x42981d) + '\x20id=\x22rando' + 'mFlipVerti' + 'calCheckbo' + 'x\x22\x20onchang' + 'e=\x22updateP' + 'review()\x22\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1082f7) + '\x22width:\x20au' + _0x2d61ef(0xc5d) + '-right:\x208p' + 'x;\x22>\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3ff0b3) + 'an>Random\x20' + _0x2d61ef(0x794) + 'cal</span>' + _0x2d61ef(0xa28) + _0x2d61ef(0x9f7) + '\x20\x20\x20\x20\x20\x20\x20\x20</' + 'div>\x0a\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20<div\x20c' + 'lass=\x22fiel' + _0x2d61ef(0x69e) + 'el\x20style=\x22' + 'display:\x20f' + 'lex;\x20justi' + 'fy-content' + ':\x20space-be' + 'tween;\x20ali' + 'gn-items:\x20' + 'center;\x22>\x0a' + '\x20\x20\x20\x20<span>' + _0x2d61ef(0x6f7) + '<span\x20id=\x22' + 'rotationDi' + _0x2d61ef(_0x353f4c._0x39ce22) + 'le=\x22color:' + _0x2d61ef(_0x353f4c._0x505ce6) + '>0°</span>' + '</span>\x0a\x20\x20' + _0x2d61ef(_0x353f4c._0x1ec077) + _0x2d61ef(0x619) + 'lay:\x20flex;' + '\x20align-ite' + 'ms:\x20center' + ';\x20cursor:\x20' + 'pointer;\x20u' + _0x2d61ef(0x72d) + _0x2d61ef(0x829) + 'rgin:\x200;\x20f' + _0x2d61ef(0x20a) + ':\x20normal;\x20' + _0x2d61ef(0xb3a) + _0x2d61ef(0xc25) + _0x2d61ef(_0x353f4c._0x527402) + 't\x20type=\x22ch' + 'eckbox\x22\x20id' + '=\x22randomRo' + 'tationChec' + _0x2d61ef(_0x353f4c._0x485f4a) + 'ange=\x22upda' + _0x2d61ef(0xa46) + ')\x22\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20style=\x22wi' + 'dth:\x20auto;' + '\x20margin-ri' + _0x2d61ef(_0x353f4c._0x1384e0) + _0x2d61ef(0x1bd) + 'pan>Random' + 'ize</span>' + '\x0a\x20\x20\x20\x20</lab' + 'el>\x0a\x20\x20</la' + _0x2d61ef(_0x353f4c._0x369012) + _0x2d61ef(_0x353f4c._0x584952) + _0x2d61ef(0x971) + '\x22rotationI') + ('nput\x22\x20valu' + 'e=\x220\x22\x20min=' + _0x2d61ef(0x262) + '60\x22\x0a\x20\x20\x20\x20on' + 'input=\x22upd' + 'ateRotatio' + 'nDisplay()' + _0x2d61ef(_0x353f4c._0x116acb) + 'eview()\x22>\x0a' + _0x2d61ef(0x2d4) + '\x20\x20\x20</div>\x0a' + _0x2d61ef(_0x353f4c._0x1e8b13) + _0x2d61ef(_0x353f4c._0x106037) + 'N\x20SETTINGS' + '\x20-->\x0a\x20\x20\x20\x20\x20' + '\x20<div\x20styl' + 'e=\x22padding' + ':\x2012px;\x20ba' + _0x2d61ef(_0x353f4c._0x193910) + _0x2d61ef(_0x353f4c._0x466825) + '255,\x20255,\x20' + _0x2d61ef(0x434) + 'der-radius' + ':\x208px;\x22>\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20<p\x20' + _0x2d61ef(0x82a) + 'tion-title' + '\x22>Animatio' + _0x2d61ef(0xca3) + '</p>\x0a\x0a\x20\x20\x20\x20' + _0x2d61ef(0xb16) + _0x2d61ef(_0x353f4c._0xfebf12) + 'd\x22>\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20<label' + '>Opening\x20A' + _0x2d61ef(_0x353f4c._0x304fa3) + _0x2d61ef(_0x353f4c._0x4ff05e) + '\x20\x20\x20\x20\x20\x20\x20<se' + 'lect\x20id=\x22o' + _0x2d61ef(_0x353f4c._0x29f3f2) + 'ationInput' + '\x22\x20onchange' + _0x2d61ef(0x127) + _0x2d61ef(0x961) + _0x2d61ef(0xacf) + '\x20\x20<option\x20' + 'value=\x22non' + _0x2d61ef(_0x353f4c._0x38cc9f) + _0x2d61ef(_0x353f4c._0x1b801a) + 'tion>\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20<o' + 'ption\x20valu' + 'e=\x22fadeIn\x22' + '>Fade\x20In</' + 'option>\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '<option\x20va' + _0x2d61ef(_0x353f4c._0x535a58) + _0x2d61ef(_0x353f4c._0x100f37) + 'In</option' + _0x2d61ef(_0x353f4c._0x31fea0) + '\x20\x20\x20\x20<optio' + _0x2d61ef(_0x353f4c._0x146286) + 'caleInWidt' + 'h\x22>Scale\x20I' + 'n\x20-\x20Width\x20' + _0x2d61ef(_0x353f4c._0x40a21f) + 'on>\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20<opt' + 'ion\x20value=' + '\x22scaleInHe' + 'ight\x22>Scal' + 'e\x20In\x20-\x20Hei' + 'ght\x20Only</' + 'option>\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20</' + 'select>\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20</di' + _0x2d61ef(0x6c4) + '\x20\x20<div\x20cla' + 'ss=\x22field\x22' + '>\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20<label>E' + _0x2d61ef(0x541) + 'ation</lab' + _0x2d61ef(_0x353f4c._0x270bc2) + _0x2d61ef(0x3a8) + _0x2d61ef(_0x353f4c._0x333a80) + 'ngAnimatio' + 'nInput\x22\x20on' + 'change=\x22up' + 'datePrevie' + 'w()\x22>\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20<o' + 'ption\x20valu' + _0x2d61ef(0x531) + _0x2d61ef(0x83e) + 'ne</option' + _0x2d61ef(_0x353f4c._0xe1b200) + _0x2d61ef(0x61e)) + ('n\x20value=\x22f' + 'adeOut\x22>Fa' + 'de\x20Out</op' + 'tion>\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20<o' + 'ption\x20valu' + 'e=\x22scaleOu' + 't\x22>Scale\x20O' + _0x2d61ef(0x14f) + '>\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x2f84d3) + _0x2d61ef(_0x353f4c._0x5e76f9) + '</div>\x0a\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20<div' + '\x20class=\x22fi' + 'eld\x22>\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20<lab' + 'el>Animati' + 'on\x20Duratio' + _0x2d61ef(_0x353f4c._0x491b7f) + '</label>\x0a\x20' + _0x2d61ef(0x8fc) + 'input\x20type' + '=\x22number\x22\x20' + 'id=\x22animat' + 'ionDuratio' + 'nInput\x22\x20va' + _0x2d61ef(0x9ed) + 'in=\x221\x22\x20max' + '=\x22300\x22\x20onc' + 'hange=\x22upd' + 'atePreview' + _0x2d61ef(0xaf0) + _0x2d61ef(0xa39) + 'style=\x22fon' + _0x2d61ef(_0x353f4c._0x6bf16c) + _0x2d61ef(_0x353f4c._0x3253e7) + _0x2d61ef(0x575) + _0x2d61ef(_0x353f4c._0x45e7e9) + 'px;\x22>60\x20fr' + 'ames\x20≈\x201\x20s' + 'econd</div' + '>\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '</div>\x0a\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x23711b) + '\x20\x20\x20\x20</div>' + '\x0a\x20\x20</div>\x0a' + '\x0a\x20\x20<!--\x20RI' + _0x2d61ef(_0x353f4c._0x15fbaa) + _0x2d61ef(0x7ab) + 'v\x20class=\x22c' + 'olumn\x22>\x0a\x20\x20' + _0x2d61ef(0x4ec) + 'al\x20Setting' + 's</h3>\x0a\x0a\x20\x20' + _0x2d61ef(0xb30) + 'ss=\x22field\x22' + '>\x0a\x20\x20\x20\x20\x20\x20<l' + _0x2d61ef(_0x353f4c._0x1075a2) + _0x2d61ef(_0x353f4c._0x381ed9) + '\x20(FPS)</la' + _0x2d61ef(_0x353f4c._0x24a524) + '\x20<input\x20ty' + _0x2d61ef(_0x353f4c._0x57c6f1) + _0x2d61ef(0x862) + 'nput\x22\x20valu' + 'e=\x2260\x22\x20min' + _0x2d61ef(_0x353f4c._0x2290c6) + _0x2d61ef(0x92c) + 'ge=\x22update' + 'Preview()\x22' + '>\x0a\x20\x20\x20\x20</di' + 'v>\x0a\x0a\x20\x20\x20\x20<d' + _0x2d61ef(0x86c) + 'field\x22>\x0a\x20\x20' + '<div\x20style' + '=\x22display:' + '\x20grid;\x20gri' + 'd-template' + _0x2d61ef(0xb55) + _0x2d61ef(_0x353f4c._0x2836c7) + 'ap:\x208px;\x22>' + '\x0a\x20\x20\x20\x20<div>' + _0x2d61ef(_0x353f4c._0x1742a6) + _0x2d61ef(0x16f) + '(%)</label' + _0x2d61ef(_0x353f4c._0x26c594) + 'nput\x20type=' + '\x22number\x22\x20i' + 'd=\x22scaleIn' + 'put\x22\x20value' + '=\x22100\x22\x20min' + '=\x2210\x22\x20max=' + _0x2d61ef(_0x353f4c._0x16c40b) + _0x2d61ef(_0x353f4c._0x5fd5f3) + 'tePreview(' + _0x2d61ef(_0x353f4c._0x137db5) + _0x2d61ef(0xb22) + 'div>\x0a\x20\x20\x20\x20\x20' + '\x20<label>Op') + ('acity\x20(0-2' + _0x2d61ef(0x3c2) + '>\x0a\x20\x20\x20\x20\x20\x20<i' + _0x2d61ef(0x14b) + '\x22number\x22\x20i' + _0x2d61ef(_0x353f4c._0x293373) + _0x2d61ef(_0x353f4c._0x125b03) + _0x2d61ef(0xc04) + 'in=\x220\x22\x20max' + '=\x22255\x22\x20onc' + _0x2d61ef(_0x353f4c._0x16d284) + 'atePreview' + '()\x22>\x0a\x20\x20\x20\x20<' + '/div>\x0a\x20\x20</' + 'div>\x0a</div' + '>\x0a\x0a\x20\x20\x20\x20<di' + _0x2d61ef(0xbbd) + _0x2d61ef(_0x353f4c._0x1079df) + _0x2d61ef(_0x353f4c._0x404605) + _0x2d61ef(0x959) + '\x20id=\x22hueDi' + 'splay\x22\x20sty' + 'le=\x22color:' + '\x20#FFD700;\x22' + '>0°</span>' + '</label>\x0a\x20' + '\x20\x20\x20\x20\x20<inpu' + _0x2d61ef(0xb09) + 'nge\x22\x20id=\x22h' + 'ueInput\x22\x20v' + 'alue=\x220\x22\x20m' + 'in=\x22-180\x22\x20' + 'max=\x22180\x22\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20on' + 'input=\x22upd' + 'ateHueDisp' + 'lay();\x20upd' + _0x2d61ef(_0x353f4c._0x465c21) + '()\x22>\x0a\x20\x20\x20\x20<' + '/div>\x0a\x0a\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x15c6cd) + 's=\x22field\x22>' + '\x0a\x20\x20\x20\x20\x20\x20<la' + 'bel>Blend\x20' + 'Mode</labe' + _0x2d61ef(0xb19) + 'select\x20id=' + '\x22blendMode' + _0x2d61ef(0x42d) + 'hange=\x22upd' + 'atePreview' + _0x2d61ef(0xaf0) + '\x20\x20\x20<option' + '\x20value=\x22No' + 'rmal\x22\x20sele' + 'cted>Norma' + 'l</option>' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20<' + _0x2d61ef(0x4e9) + 'ue=\x22Screen' + '\x22>Screen</' + 'option>\x0a\x20\x20' + _0x2d61ef(_0x353f4c._0x246ebf) + 'ion\x20value=' + '\x22Add\x22>Add<' + '/option>\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20<op' + _0x2d61ef(0xcac) + _0x2d61ef(0xa56) + '\x22>Multiply' + '</option>\x0a' + '\x20\x20\x20\x20\x20\x20</se' + 'lect>\x0a\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1a8dd2) + '\x20\x20<div\x20cla' + 'ss=\x22field\x22' + '>\x0a\x20\x20\x20\x20\x20\x20<l' + _0x2d61ef(_0x353f4c._0x216c74) + _0x2d61ef(_0x353f4c._0x34796d) + '\x0a\x20\x20\x20\x20\x20\x20<se' + 'lect\x20id=\x22z' + 'IndexInput' + '\x22\x20onchange' + _0x2d61ef(0x127) + 'eview()\x22>\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20<o' + 'ption\x20valu' + 'e=\x22auto\x22\x20s' + 'elected>Au' + 'to</option' + _0x2d61ef(_0x353f4c._0xe1b200) + '<option\x20va' + 'lue=\x221\x22>1\x20' + _0x2d61ef(0x398) + 'ground</op' + _0x2d61ef(0x466) + '\x20\x20\x20\x20<optio' + _0x2d61ef(_0x353f4c._0x45e4e3) + _0x2d61ef(_0x353f4c._0x8a4638) + 'ground</op') + ('tion>\x0a\x20\x20\x20\x20' + _0x2d61ef(0x61e) + 'n\x20value=\x223' + _0x2d61ef(_0x353f4c._0xad54ce) + _0x2d61ef(_0x353f4c._0x441472) + 'option>\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20<opt' + _0x2d61ef(0x56c) + '\x224\x22>4\x20-\x20Be' + _0x2d61ef(0x2bb) + 'ters</opti' + 'on>\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20<option\x20' + _0x2d61ef(_0x353f4c._0x509753) + '5\x20-\x20Same\x20a' + 's\x20Characte' + 'rs</option' + _0x2d61ef(_0x353f4c._0x1944ea) + '<option\x20va' + 'lue=\x226\x22>6\x20' + _0x2d61ef(0x368) + 'aracters</' + 'option>\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20<opt' + _0x2d61ef(_0x353f4c._0xc83d37) + '\x227\x22>7\x20-\x20Ab' + _0x2d61ef(0x930) + 'hing</opti' + 'on>\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20<option\x20' + 'value=\x228\x22>' + _0x2d61ef(_0x353f4c._0x38e889) + _0x2d61ef(_0x353f4c._0x582f4b) + _0x2d61ef(0x73c) + '/select>\x0a\x20' + '\x20\x20\x20</div>\x0a' + '\x0a\x20\x20\x20\x20<div\x20' + 'class=\x22fie' + 'ld\x22>\x0a\x20<div' + '\x20class=\x22fi' + _0x2d61ef(_0x353f4c._0x37fb90) + 'iv\x20style=\x22' + _0x2d61ef(0x24a) + 'rid;\x20grid-' + _0x2d61ef(_0x353f4c._0x42d449) + 'olumns:\x201f' + 'r\x201fr;\x20gap' + _0x2d61ef(_0x353f4c._0x4e1a24) + '\x20\x20\x20<div>\x0a\x20' + '\x20\x20\x20\x20\x20<labe' + 'l>Offset\x20X' + '</label>\x0a\x20' + _0x2d61ef(0x2a6) + 't\x20type=\x22nu' + 'mber\x22\x20id=\x22' + 'offsetXInp' + 'ut\x22\x20value=' + '\x220\x22\x20min=\x22-' + '999\x22\x20max=\x22' + '999\x22\x20oncha' + _0x2d61ef(_0x353f4c._0x5b72ae) + 'ePreview()' + '\x22>\x0a\x20\x20\x20\x20</d' + 'iv>\x0a\x20\x20\x20\x20<d' + 'iv>\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x420) + 'set\x20Y</lab' + _0x2d61ef(0x125) + '<input\x20typ' + 'e=\x22number\x22' + '\x20id=\x22offse' + _0x2d61ef(_0x353f4c._0x67168d) + _0x2d61ef(_0x353f4c._0x5052f8) + 'in=\x22-999\x22\x20' + _0x2d61ef(_0x353f4c._0x1cc04e) + 'onchange=\x22' + 'updatePrev' + 'iew()\x22>\x0a\x20\x20' + '\x20\x20</div>\x0a\x20' + '\x20</div>\x0a</' + 'div>\x0a\x0a\x20\x20\x20\x20' + _0x2d61ef(0x740) + _0x2d61ef(_0x353f4c._0x4b6800) + '-->\x0a\x20\x20\x20\x20<d' + 'iv\x20style=\x22' + 'margin-top' + ':\x2015px;\x20pa' + 'dding:\x2012p' + 'x;\x20backgro' + _0x2d61ef(_0x353f4c._0x2eebde) + '255,\x20255,\x20' + '255,\x200.03)' + _0x2d61ef(0xb8) + 'adius:\x208px' + ';\x22>\x0a\x20\x20\x20\x20\x20\x20' + '<p\x20class=\x22' + _0x2d61ef(0x87d) + 'tle\x22>Bloom' + _0x2d61ef(_0x353f4c._0x4e2a9a) + '/p>\x0a\x0a\x20\x20\x20\x20\x20') + ('\x20<div\x20clas' + 's=\x22field\x22>' + _0x2d61ef(_0x353f4c._0x465b20) + _0x2d61ef(0x836) + 'e=\x22display' + _0x2d61ef(_0x353f4c._0x457d48) + _0x2d61ef(_0x353f4c._0x281227) + _0x2d61ef(0x9c4) + 'ursor:\x20poi' + 'nter;\x20user' + _0x2d61ef(0x1da) + _0x2d61ef(0x299) + '\x20\x20\x20\x20\x20\x20\x20<in' + 'put\x20type=\x22' + 'checkbox\x22\x20' + _0x2d61ef(0x492) + 'heckbox\x22\x20o' + 'nchange=\x22u' + 'pdatePrevi' + 'ew()\x22\x0a\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3c8dff) + 'yle=\x22width' + ':\x20auto;\x20ma' + 'rgin-right' + ':\x208px;\x22>\x0a\x20' + _0x2d61ef(0x8fc) + _0x2d61ef(_0x353f4c._0x475ae2) + 'e\x20Bloom\x20Ef' + _0x2d61ef(_0x353f4c._0x2d01ef) + '>\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '</label>\x0a\x20' + '\x20\x20\x20\x20\x20</div' + '>\x0a\x0a\x20\x20\x20\x20\x20\x20<' + 'div\x20class=' + '\x22field\x22>\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20<la' + _0x2d61ef(_0x353f4c._0x2aad02) + _0x2d61ef(0xb11) + 'el>\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20<input\x20t' + 'ype=\x22numbe' + 'r\x22\x20id=\x22blu' + 'rAmountInp' + 'ut\x22\x20value=' + '\x2215\x22\x20min=\x22' + '1\x22\x20max=\x2250' + '\x22\x20onchange' + '=\x22updatePr' + 'eview()\x22>\x0a' + '\x20\x20\x20\x20\x20\x20</di' + 'v>\x0a\x0a\x20\x20\x20\x20\x20\x20' + '<div\x20class' + _0x2d61ef(_0x353f4c._0x16699e) + '\x20\x20\x20\x20\x20\x20\x20\x20<l' + _0x2d61ef(_0x353f4c._0x3f7b2a) + _0x2d61ef(_0x353f4c._0x3584be) + _0x2d61ef(_0x353f4c._0x587393) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20<' + 'input\x20type' + '=\x22number\x22\x20' + _0x2d61ef(0x5c3) + 'ityInput\x22\x20' + 'value=\x22255' + _0x2d61ef(_0x353f4c._0x4b26f4) + _0x2d61ef(0x7f3) + _0x2d61ef(_0x353f4c._0x4dca68) + _0x2d61ef(0x7b2) + _0x2d61ef(0x467) + '\x20\x20\x20\x20</div>' + '\x0a\x0a\x20\x20\x20\x20\x20\x20<d' + 'iv\x20class=\x22' + _0x2d61ef(_0x353f4c._0x34363f) + '\x20\x20\x20\x20\x20\x20<lab' + 'el>Tint\x20Co' + 'lor</label' + '>\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '<input\x20typ' + 'e=\x22color\x22\x20' + 'id=\x22tintCo' + 'lorInput\x22\x20' + 'value=\x22#FF' + 'FFFF\x22\x20onch' + _0x2d61ef(_0x353f4c._0x288931) + 'tePreview(' + ')\x22\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20style=\x22' + 'height:\x2040' + _0x2d61ef(0x104) + _0x2d61ef(0x150) + '\x22>\x0a\x20\x20\x20\x20\x20\x20<' + '/div>\x0a\x20\x20\x20\x20' + '</div>\x0a\x20\x20<' + _0x2d61ef(0x172) + 'v>\x0a\x0a\x20\x20<div' + '\x20id=\x22libra' + 'ryModal\x22\x20c' + 'lass=\x22libr' + _0x2d61ef(_0x353f4c._0x32c756) + _0x2d61ef(_0x353f4c._0x2979b6) + '\x20class=\x22li') + ('brary-cont' + 'ent\x22>\x0a\x20\x20\x20\x20' + '\x20\x20<div\x20cla' + 'ss=\x22librar' + _0x2d61ef(_0x353f4c._0x2fac13) + _0x2d61ef(0x6be) + _0x2d61ef(_0x353f4c._0x4f6a2b) + 'on\x20Library' + '</h2>\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20<div\x20s' + _0x2d61ef(0x619) + _0x2d61ef(_0x353f4c._0x3e6f17) + '\x20gap:\x2010px' + ';\x22>\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20<butto' + _0x2d61ef(_0x353f4c._0x5d925d) + 'emove-spri' + _0x2d61ef(_0x353f4c._0x53bf08) + '\x22\x20onclick=' + '\x22removeAll' + _0x2d61ef(_0x353f4c._0x47873b) + 'tes()\x22>\x0a\x20\x20' + _0x2d61ef(0xacf) + 'Remove\x20All' + '\x20Target\x20Sp' + 'rites\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20<d' + _0x2d61ef(_0x353f4c._0x407dc0) + _0x2d61ef(_0x353f4c._0x3713f0) + '\x2010px;\x20fon' + 't-weight:\x20' + _0x2d61ef(0xbcc) + 'rgin-top:\x20' + '2px;\x22>Help' + _0x2d61ef(0xc5) + 'imation\x20se' + 'ttings\x20fil' + 'e\x20size\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20<' + _0x2d61ef(0x5bd) + '\x20\x20\x20\x20\x20\x20</bu' + 'tton>\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20<but' + 'ton\x20class=' + _0x2d61ef(0x4ef) + _0x2d61ef(0xc37) + 'ick=\x22close' + 'Library()\x22' + _0x2d61ef(0x65b) + _0x2d61ef(0x2d5) + '\x20\x20\x20\x20\x20\x20</di' + 'v>\x0a\x20\x20\x20\x20\x20\x20<' + _0x2d61ef(_0x353f4c._0x47775c) + '\x20\x20<div\x20id=' + '\x22libraryGr' + 'id\x22\x20class=' + '\x22library-g' + 'rid\x22>\x0a\x20\x20\x20\x20' + _0x2d61ef(0x6f0) + _0x2d61ef(0x33e) + _0x2d61ef(0x6f0) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1f9ca9) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20let\x20' + 'previewCan' + 'vas\x20=\x20null' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20le' + _0x2d61ef(_0x353f4c._0x312096) + 'tx\x20=\x20null;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20let' + '\x20currentSp' + 'ritesheet\x20' + '=\x20null;\x0a\x20\x20' + _0x2d61ef(_0x353f4c._0x18ce84) + _0x2d61ef(0x494) + _0x2d61ef(_0x353f4c._0xd54d) + _0x2d61ef(_0x353f4c._0x80e16c) + _0x2d61ef(_0x353f4c._0x4ffb0c) + _0x2d61ef(_0x353f4c._0x4818ac) + 'stFrameTim' + _0x2d61ef(0x21e) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20let\x20isA' + 'nimating\x20=' + '\x20false;\x0a\x20\x20' + _0x2d61ef(_0x353f4c._0x5ddfcf) + '\x20\x20\x20\x20let\x20ch' + 'aracterSpr' + 'ite\x20=\x20null' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20le' + _0x2d61ef(0xbf) + 'rSpriteWid' + _0x2d61ef(0x3d6) + _0x2d61ef(_0x353f4c._0x5f609a) + _0x2d61ef(_0x353f4c._0x25da08) + _0x2d61ef(0xdc)) + ('iteHeight\x20' + _0x2d61ef(0xcdb) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20let\x20chara' + _0x2d61ef(0xd06) + _0x2d61ef(0xcbe) + '=\x200;\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x14fc9d) + _0x2d61ef(0x5eb) + _0x2d61ef(0xd06) + _0x2d61ef(0x7dc) + '\x20=\x200;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20let\x20char' + 'acterSprit' + 'eTileWidth' + '\x20=\x2048;\x0a\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20let\x20cha' + 'racterSpri' + 'teTileHeig' + _0x2d61ef(_0x353f4c._0x8be99) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20let\x20i' + 'sDraggingA' + 'nimation\x20=' + '\x20false;\x0a\x20\x20' + _0x2d61ef(_0x353f4c._0x4200c7) + '\x20\x20\x20\x20let\x20dr' + 'agStartX\x20=' + '\x200;\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + 'let\x20dragSt' + 'artY\x20=\x200;\x0a' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20let\x20' + 'dragOffset' + 'X\x20=\x200;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20let\x20dra' + _0x2d61ef(0x56d) + '\x200;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'let\x20curren' + 'tRandomFli' + _0x2d61ef(0x5e6) + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20le' + _0x2d61ef(0xa33) + _0x2d61ef(_0x353f4c._0x5f4b47) + 'ion\x20=\x200;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20let\x20r' + _0x2d61ef(_0x353f4c._0x22356a) + 'eCounter\x20=' + '\x200;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'let\x20openin' + 'gAnimation' + _0x2d61ef(_0x353f4c._0x57d5b5) + '\x200;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x42f2ae) + 'AnimationP' + _0x2d61ef(0x62c) + '0;\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xa07) + 'et\x20isPlayi' + _0x2d61ef(_0x353f4c._0x343952) + 'nim\x20=\x20fals' + 'e;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20l' + 'et\x20isPlayi' + 'ngEndingAn' + _0x2d61ef(0x200) + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20le' + _0x2d61ef(_0x353f4c._0x5c8712) + _0x2d61ef(_0x353f4c._0x31487d) + '\x20=\x200;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20let\x20auto' + 'SaveTimeou' + _0x2d61ef(0xee) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x1b9) + _0x2d61ef(0xbb6) + _0x2d61ef(0xae) + _0x2d61ef(_0x353f4c._0x5ad9db) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20funct' + 'ion\x20toggle' + 'PreviewBg(' + 'color,\x20btn' + 'Id)\x20{\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x8d2) + _0x2d61ef(_0x353f4c._0x2f0c2a) + 'cument.get' + 'ElementByI') + ('d(btnId);\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'const\x20isAc' + 'tive\x20=\x20btn' + '.classList' + '.contains(' + '\x27active\x27);' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x5d88fa) + 'querySelec' + 'torAll(\x27.b' + 'g-toggle-b' + 'tn\x27).forEa' + 'ch((b)\x20=>\x20' + 'b.classLis' + 't.remove(\x27' + 'active\x27));' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20if\x20(isAct' + 'ive)\x20{\x0a\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1e587d) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3aaaa7) + _0x2d61ef(0x8a6) + '111111\x27;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20}' + '\x20else\x20{\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20previewB' + 'gColor\x20=\x20c' + 'olor;\x0a\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'btn.classL' + 'ist.add(\x27a' + 'ctive\x27);\x0a\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20}' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0x27f) + _0x2d61ef(_0x353f4c._0x5aecf5) + 'tElement.s' + 'tyle.backg' + 'round\x20=\x20pr' + _0x2d61ef(_0x353f4c._0x28ffe4) + _0x2d61ef(_0x353f4c._0x2869ab) + _0x2d61ef(0xacf) + '}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x54d) + 'unction\x20up' + 'dateRotati' + _0x2d61ef(0x7bf) + _0x2d61ef(0x903) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20const\x20' + _0x2d61ef(0x38c) + 'lue\x20=\x20docu' + 'ment.getEl' + _0x2d61ef(0xbff) + '\x27rotationI' + 'nput\x27)?.va' + _0x2d61ef(0x7b6) + _0x2d61ef(_0x353f4c._0x1e587d) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'const\x20rota' + _0x2d61ef(_0x353f4c._0x486ec0) + _0x2d61ef(0x382) + _0x2d61ef(0x916) + 'entById(\x27r' + 'otationDis' + 'play\x27);\x0a\x20\x20' + _0x2d61ef(_0x353f4c._0x14fc9d) + '\x20\x20\x20\x20\x20\x20\x20\x20if' + '\x20(rotation' + 'Display)\x20{' + _0x2d61ef(0xa28) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x27ba17) + 'ionDisplay' + _0x2d61ef(0xa70) + _0x2d61ef(_0x353f4c._0x438f53) + 'ionValue\x20+' + _0x2d61ef(_0x353f4c._0x5d441b) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20}\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x1fc) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20functio' + 'n\x20updateRa' + _0x2d61ef(0x887) + _0x2d61ef(0x934) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x24318b)) + ('mUpdateCou' + 'nter++;\x0a\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20if' + '\x20(randomUp' + 'dateCounte' + 'r\x20>=\x2010)\x20{' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20rando' + 'mUpdateCou' + 'nter\x20=\x200;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + 'onst\x20rando' + _0x2d61ef(0x540) + _0x2d61ef(_0x353f4c._0x41ede1) + 'cument.get' + 'ElementByI' + _0x2d61ef(0x77d) + 'lipHorizon' + 'talCheckbo' + 'x\x27)?.check' + 'ed\x20||\x20fals' + 'e;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20con' + _0x2d61ef(0x183) + 'lipVertica' + 'l\x20=\x20docume' + 'nt.getElem' + _0x2d61ef(_0x353f4c._0x3e8ae8) + _0x2d61ef(_0x353f4c._0x3d6bd0) + 'erticalChe' + 'ckbox\x27)?.c' + _0x2d61ef(_0x353f4c._0x2705de) + _0x2d61ef(_0x353f4c._0x441f04) + _0x2d61ef(_0x353f4c._0x4ffb0c) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x4f4ced) + 'domRotatio' + 'n\x20=\x20docume' + _0x2d61ef(0x916) + 'entById(\x27r' + 'andomRotat' + _0x2d61ef(_0x353f4c._0xbed679) + 'x\x27)?.check' + 'ed\x20||\x20fals' + 'e;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20if\x20(rand' + 'omFlipHori' + _0x2d61ef(_0x353f4c._0x378fef) + _0x2d61ef(_0x353f4c._0x101f09) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x1d6) + 'rrentRando' + 'mFlipX\x20=\x20M' + 'ath.random' + '()\x20<\x200.5;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x5ddfcf) + '\x20\x20\x20\x20}\x20else' + '\x20{\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x1c8) + 'ndomFlipX\x20' + '=\x20false;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20}\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xab9) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xa7f) + _0x2d61ef(0x924) + 'rtical)\x20{\x0a' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20cu' + 'rrentRando' + 'mFlipY\x20=\x20M' + 'ath.random' + _0x2d61ef(0x5cf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20}\x20else' + '\x20{\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20currentRa' + 'ndomFlipY\x20') + ('=\x20false;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20}\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20if\x20(ra' + 'ndomRotati' + 'on)\x20{\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20curren' + _0x2d61ef(0x626) + 'ation\x20=\x20Ma' + 'th.random(' + ')\x20*\x20360;\x0a\x20' + _0x2d61ef(_0x353f4c._0x5ddfcf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xa5) + '{\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'currentRan' + 'domRotatio' + 'n\x20=\x200;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20}\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x496) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + 'window.onl' + _0x2d61ef(_0x353f4c._0x44964e) + 'tion()\x20{\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20p' + _0x2d61ef(_0x353f4c._0x428637) + 'as\x20=\x20docum' + 'ent.getEle' + 'mentById(\x27' + 'previewCan' + 'vas\x27);\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20pre' + 'viewCtx\x20=\x20' + 'previewCan' + 'vas.getCon' + 'text(\x272d\x27)' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20previewC' + _0x2d61ef(_0x353f4c._0x47ab3b) + 'oothingEna' + 'bled\x20=\x20fal' + 'se;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20const' + '\x20container' + '\x20=\x20preview' + _0x2d61ef(0x250) + 'entElement' + _0x2d61ef(_0x353f4c._0x102f49) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20const\x20co' + 'ntainerWid' + 'th\x20=\x20conta' + 'iner.clien' + _0x2d61ef(_0x353f4c._0x149817) + '0;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20const\x20c' + _0x2d61ef(_0x353f4c._0x15fa5b) + _0x2d61ef(0x53e) + _0x2d61ef(0x266) + 'entHeight\x20' + '-\x2040;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x7f) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x5ef6a8) + 'viewCanvas' + _0x2d61ef(0x214) + 'ath.min(co' + 'ntainerWid' + 'th,\x20400);\x0a' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'previewCan' + 'vas.height' + _0x2d61ef(0xe3) + 'n(containe' + 'rHeight,\x203' + _0x2d61ef(_0x353f4c._0x4b1356) + _0x2d61ef(0xacf)) + (_0x2d61ef(_0x353f4c._0x39b2af) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20prev' + 'iewCanvas.' + 'addEventLi' + _0x2d61ef(0x33c) + 'usedown\x27,\x20' + 'onCanvasMo' + _0x2d61ef(0x7a2) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x5f609a) + _0x2d61ef(_0x353f4c._0x1a670b) + _0x2d61ef(_0x353f4c._0xe2cdcd) + 'ntListener' + '(\x27mousemov' + 'e\x27,\x20onCanv' + 'asMouseMov' + 'e);\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3a7413) + '\x20\x20\x20\x20previe' + _0x2d61ef(_0x353f4c._0x3129d6) + 'dEventList' + _0x2d61ef(0xc49) + 'eup\x27,\x20onCa' + 'nvasMouseU' + 'p);\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x30679b) + '\x20\x20\x20\x20previe' + 'wCanvas.ad' + 'dEventList' + 'ener(\x27mous' + 'eleave\x27,\x20o' + 'nCanvasMou' + 'seUp);\x0a\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xb2a) + _0x2d61ef(0xc46) + 'meInput\x20=\x20' + 'document.g' + _0x2d61ef(_0x353f4c._0x4d5122) + _0x2d61ef(0x3c8) + _0x2d61ef(0x723) + 'put\x27);\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20if\x20' + '(animNameI' + 'nput)\x20{\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20animName' + 'Input.addE' + 'ventListen' + 'er(\x27input\x27' + ',\x20updateAu' + 'toSaveVisi' + 'bility);\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20}' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20};\x0a' + _0x2d61ef(0xa28) + '\x20\x20\x20\x20\x20\x20\x20fun' + 'ction\x20onCa' + _0x2d61ef(0x8ff) + _0x2d61ef(0xb04) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20i' + 'f\x20(!curren' + 'tSpriteshe' + 'et)\x20return' + _0x2d61ef(_0x353f4c._0x102f49) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20const\x20r' + _0x2d61ef(0x5ba) + 'iewCanvas.' + 'getBoundin' + 'gClientRec' + _0x2d61ef(_0x353f4c._0x35c8d3) + _0x2d61ef(_0x353f4c._0x1e587d) + '\x20\x20\x20\x20\x20dragS' + _0x2d61ef(_0x353f4c._0x7600d4) + 'clientX\x20-\x20' + 'rect.left;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20dragStart' + 'Y\x20=\x20e.clie' + 'ntY\x20-\x20rect' + '.top;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x2deade) + 'aggingAnim' + 'ation\x20=\x20tr' + 'ue;\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x744)) + ('\x20offsetXIn' + 'put\x20=\x20docu' + 'ment.getEl' + _0x2d61ef(0xbff) + '\x27offsetXIn' + 'put\x27);\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x6ca) + 'st\x20offsetY' + 'Input\x20=\x20do' + _0x2d61ef(_0x353f4c._0x5c8254) + _0x2d61ef(_0x353f4c._0x24acd9) + _0x2d61ef(_0x353f4c._0x575081) + _0x2d61ef(0x937) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20d' + 'ragOffsetX' + '\x20=\x20parseIn' + 't(offsetXI' + 'nput.value' + _0x2d61ef(0x9b4) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20dr' + 'agOffsetY\x20' + '=\x20parseInt' + '(offsetYIn' + 'put.value)' + _0x2d61ef(0x177) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20tr' + 'iggerAutoS' + 'ave();\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20function' + '\x20onCanvasM' + _0x2d61ef(_0x353f4c._0xc8457d) + ')\x20{\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x21929d) + 'sDraggingA' + _0x2d61ef(0x92d) + _0x2d61ef(0x73d) + 'Spriteshee' + 't)\x20return;' + _0x2d61ef(0xa28) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20const\x20re' + 'ct\x20=\x20previ' + _0x2d61ef(0xa63) + 'etBounding' + 'ClientRect' + _0x2d61ef(_0x353f4c._0x314227) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x30b9df) + 'currentX\x20=' + _0x2d61ef(_0x353f4c._0x224c6a) + '\x20-\x20rect.le' + 'ft;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20const\x20' + 'currentY\x20=' + '\x20e.clientY' + '\x20-\x20rect.to' + 'p;\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3c1ca8) + '\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xbc1) + 'deltaX\x20=\x20c' + 'urrentX\x20-\x20' + 'dragStartX' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x2d2c91) + '\x20\x20const\x20de' + 'ltaY\x20=\x20cur' + _0x2d61ef(0xd18) + 'agStartY;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x101f09) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0xb53ba7) + _0x2d61ef(0x3b3) + _0x2d61ef(_0x353f4c._0x2c1dff) + 'X\x20+\x20Math.r' + 'ound(delta' + 'X);\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xbc1) + 'newOffsetY' + '\x20=\x20dragOff' + 'setY\x20+\x20Mat' + _0x2d61ef(0x1a0) + 'ltaY);\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20') + ('\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xb2a) + 'nst\x20offset' + _0x2d61ef(0x6b8) + 'ocument.ge' + _0x2d61ef(0x7e0) + 'Id(\x27offset' + _0x2d61ef(0x3aa) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'const\x20offs' + 'etYInput\x20=' + _0x2d61ef(_0x353f4c._0x5d88fa) + 'getElement' + 'ById(\x27offs' + 'etYInput\x27)' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x4d525b) + _0x2d61ef(_0x353f4c._0x2a8e4c) + '\x20offsetXIn' + 'put.value\x20' + '=\x20newOffse' + 'tX;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20if\x20(of' + 'fsetYInput' + _0x2d61ef(0xb13) + 'nput.value' + '\x20=\x20newOffs' + 'etY;\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0x813) + _0x2d61ef(0xacf) + _0x2d61ef(0x48c) + 'nCanvasMou' + 'seUp()\x20{\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x42c6ba) + 'f\x20(isDragg' + _0x2d61ef(0x4fd) + _0x2d61ef(0x70b) + _0x2d61ef(_0x353f4c._0x14fc9d) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'isDragging' + 'Animation\x20' + '=\x20false;\x0a\x20' + _0x2d61ef(_0x353f4c._0x3a4ab9) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20co' + 'nst\x20offset' + 'XInput\x20=\x20d' + 'ocument.ge' + _0x2d61ef(0x7e0) + _0x2d61ef(_0x353f4c._0x316510) + 'XInput\x27);\x0a' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20const\x20' + _0x2d61ef(0x2ad) + 'ut\x20=\x20docum' + 'ent.getEle' + _0x2d61ef(_0x353f4c._0x218f71) + 'offsetYInp' + _0x2d61ef(_0x353f4c._0x18d7c1) + _0x2d61ef(_0x353f4c._0xa3f9b4) + _0x2d61ef(0xacf) + 'dragOffset' + _0x2d61ef(_0x353f4c._0x56e9b0) + 'nt(offsetX' + _0x2d61ef(0xc39) + 'e)\x20||\x200;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20dragOff' + 'setY\x20=\x20par' + 'seInt(offs' + 'etYInput.v' + _0x2d61ef(_0x353f4c._0x569668) + _0x2d61ef(0x306) + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x320f1b) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xc8c) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20w' + _0x2d61ef(_0x353f4c._0x626edb) + 'haracterSp' + 'rite\x20=\x20fun' + 'ction(data' + 'Url,\x20width' + ',\x20height,\x20' + 'realWidth,' + '\x20realHeigh' + 't,\x20tileWid' + 'th,\x20tileHe' + 'ight,\x20char') + ('acterPrior' + 'ity)\x20{\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20con' + 'st\x20img\x20=\x20n' + 'ew\x20Image()' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20img.onlo' + 'ad\x20=\x20funct' + 'ion()\x20{\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20characte' + 'rSprite\x20=\x20' + _0x2d61ef(0x8f) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + 'haracterSp' + 'riteWidth\x20' + '=\x20width;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20charact' + 'erSpriteHe' + _0x2d61ef(_0x353f4c._0x4398ea) + 'ght;\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + 'haracterSp' + _0x2d61ef(_0x353f4c._0x34c979) + _0x2d61ef(0x87e) + 'Width\x20||\x20w' + 'idth;\x0a\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0xa3f9b4) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x9be) + 'priteRealH' + 'eight\x20=\x20re' + 'alHeight\x20|' + _0x2d61ef(0x806) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x23af8e) + '\x20\x20\x20\x20charac' + _0x2d61ef(_0x353f4c._0x55edfc) + _0x2d61ef(0xbca) + '\x20tileWidth' + _0x2d61ef(0x840) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20characte' + 'rSpriteTil' + 'eHeight\x20=\x20' + 'tileHeight' + '\x20||\x2048;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x472489) + '\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20con' + _0x2d61ef(_0x353f4c._0x589f58) + 'elect\x20=\x20do' + 'cument.get' + 'ElementByI' + 'd(\x27zIndexI' + 'nput\x27);\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20if\x20(zInd' + _0x2d61ef(0xb10) + _0x2d61ef(0xcb0) + 'rPriority)' + '\x20{\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20zIndexSel' + 'ect.value\x20' + '=\x20characte' + 'rPriority;' + _0x2d61ef(_0x353f4c._0x4e1d68) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20}\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x2ca) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20if\x20(' + _0x2d61ef(0x89b) + 'ng)\x20{\x0a\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x80405f) + '\x20\x20\x20\x20isAnim' + 'ating\x20=\x20tr' + 'ue;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x34713c) + 'review();\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20') + (_0x2d61ef(0xb08) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20};\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x42c6ba) + 'mg.src\x20=\x20d' + 'ataUrl;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x497) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20functi' + 'on\x20selectS' + 'pritesheet' + '()\x20{\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20const\x20fil' + 'eInput\x20=\x20d' + _0x2d61ef(0x42b) + 'tElementBy' + _0x2d61ef(_0x353f4c._0x39f79d) + 'put\x27);\x0a\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20fileInp' + 'ut.onchang' + 'e\x20=\x20async\x20' + 'function(e' + ')\x20{\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'if\x20(e.targ' + _0x2d61ef(0x197) + _0x2d61ef(0x689) + '.files[0])' + '\x20{\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + 'onst\x20file\x20' + '=\x20e.target' + '.files[0];' + '\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20if' + '\x20(window.o' + _0x2d61ef(_0x353f4c._0x148c00) + 'indow.open' + _0x2d61ef(0x7df) + 'temHelper)' + _0x2d61ef(0x520) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + _0x2d61ef(0xb4) + 'ivePath\x20=\x20' + _0x2d61ef(0x8a7) + 'ow.opener.' + 'FileSystem' + 'Helper.vfx' + _0x2d61ef(_0x353f4c._0x333c42) + _0x2d61ef(_0x353f4c._0x156a7e) + 'e);\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'if\x20(relati' + 'vePath)\x20{\x0a' + _0x2d61ef(_0x353f4c._0x4ffb0c) + '\x20\x20\x20\x20\x20\x20upda' + 'teFileDisp' + _0x2d61ef(0xc87) + _0x2d61ef(0x870) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x744) + '\x20reader\x20=\x20' + _0x2d61ef(0x859) + _0x2d61ef(0x41a) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20reader' + '.onload\x20=\x20' + 'function(e' + 'vent)\x20{\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20const\x20' + 'img\x20=\x20new\x20' + _0x2d61ef(0x31d) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20img.o' + 'nload\x20=\x20fu' + _0x2d61ef(0x759) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20cur' + 'rentSprite' + _0x2d61ef(0x6f9) + 'g;\x0a\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'if\x20(!isAni' + 'mating)\x20{\x0a' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20isAn' + 'imating\x20=\x20' + 'true;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20animateP' + _0x2d61ef(0x297) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20}\x0a\x20\x20') + ('\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20};\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20img.src' + '\x20=\x20event.t' + 'arget.resu' + _0x2d61ef(_0x353f4c._0x3b89fc) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '};\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20r' + _0x2d61ef(_0x353f4c._0x2b5c01) + 'AsDataURL(' + _0x2d61ef(0x8b3) + _0x2d61ef(0xacf) + '\x20\x20\x20}\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x28a1c3) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x2b7) + 'click();\x0a\x20' + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x1a71a6) + _0x2d61ef(_0x353f4c._0xa3f9b4) + '\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + 'function\x20u' + _0x2d61ef(0xb45) + 'isplay(fil' + _0x2d61ef(_0x353f4c._0x573b1b) + _0x2d61ef(0xacf) + _0x2d61ef(0x744) + '\x20fileBox\x20=' + _0x2d61ef(_0x353f4c._0x5d88fa) + 'getElement' + 'ById(\x27file' + 'Box\x27);\x0a\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20if\x20(fil' + 'eBox)\x20{\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20fileBo' + _0x2d61ef(_0x353f4c._0x2ab763) + 'ent\x20=\x20file' + _0x2d61ef(0x362) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x422) + 'classList.' + 'add(\x27has-f' + 'ile\x27);\x0a\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3c6b15) + '\x20\x20\x20}\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3525ed) + 'nimatePrev' + _0x2d61ef(_0x353f4c._0x467020) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20const\x20' + 'currentTim' + _0x2d61ef(_0x353f4c._0x27ecad) + 'ow();\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20const\x20fp' + 's\x20=\x20parseI' + _0x2d61ef(0x179) + _0x2d61ef(0x44f) + 'ntById(\x27fp' + _0x2d61ef(_0x353f4c._0x1da361) + _0x2d61ef(_0x353f4c._0x108f64) + _0x2d61ef(0xc2) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + 'onst\x20frame' + _0x2d61ef(0x1ed) + '00\x20/\x20fps;\x0a' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20if\x20' + '(currentTi' + _0x2d61ef(_0x353f4c._0x3ad942) + 'rameTime\x20>' + '=\x20frameDel' + 'ay)\x20{\x0a\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20drawPrev' + 'iewFrame()' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x226334) + _0x2d61ef(0x411) + 'e\x20=\x20curren' + _0x2d61ef(0x821) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0xd5c98b) + '\x20\x20requestA' + 'nimationFr' + _0x2d61ef(_0x353f4c._0x2c53b8) + 'ePreview);' + _0x2d61ef(_0x353f4c._0x4e1d68) + '\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20') + ('\x20\x20\x20\x20\x20\x20func' + 'tion\x20drawP' + 'reviewFram' + _0x2d61ef(_0x353f4c._0x5dd7d2) + _0x2d61ef(_0x353f4c._0x5f609a) + '\x20\x20const\x20sc' + 'ale\x20=\x20pars' + 'eInt(docum' + _0x2d61ef(_0x353f4c._0x4dd1c6) + 'mentById(\x27' + _0x2d61ef(0x6a5) + '\x27).value)\x20' + '/\x20100\x20||\x201' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xb2a) + 'nst\x20zIndex' + 'Value\x20=\x20do' + _0x2d61ef(0x803) + 'ElementByI' + _0x2d61ef(_0x353f4c._0x121f0f) + 'nput\x27)?.va' + 'lue\x20||\x20\x27au' + 'to\x27;\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x2bce8a) + '\x20const\x20zIn' + _0x2d61ef(_0x353f4c._0x4f9ad5) + _0x2d61ef(_0x353f4c._0x36d29e) + '=\x20\x27auto\x27\x20?' + _0x2d61ef(0x7c8) + _0x2d61ef(_0x353f4c._0x4413c3) + _0x2d61ef(0x415) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x7d1) + 'ewCtx.clea' + 'rRect(0,\x200' + ',\x20previewC' + 'anvas.widt' + _0x2d61ef(0x9f1) + 'Canvas.hei' + 'ght);\x0a\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x5b96a0) + '\x20\x20previewC' + _0x2d61ef(0x37d) + 'le\x20=\x20previ' + 'ewBgColor;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20pre' + _0x2d61ef(_0x353f4c._0x59651f) + 'llRect(0,\x20' + _0x2d61ef(0xa1) + 'Canvas.wid' + _0x2d61ef(0x951) + _0x2d61ef(0x563) + 'ight);\x0a\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xa0b) + 'ndex\x20===\x205' + ')\x20{\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'drawWithYS' + 'orting(sca' + 'le);\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0xa2353c) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20cons' + _0x2d61ef(_0x353f4c._0x165cc7) + _0x2d61ef(_0x353f4c._0x2d331a) + '\x20=\x20zIndex\x20' + '>=\x205;\x0a\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20if\x20(dra' + _0x2d61ef(_0x353f4c._0x16a104) + 'First)\x20{\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x86a) + 'haracterLa' + 'yer(scale)' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20dr' + 'awAnimatio' + 'nLayer(sca' + 'le);\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20}\x20else\x20{\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20draw' + 'AnimationL' + 'ayer(scale' + ');\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20d' + 'rawCharact' + _0x2d61ef(_0x353f4c._0x21ab10) + _0x2d61ef(0x5fe) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xb14) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '}\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20}\x0a' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20') + (_0x2d61ef(0x5ec) + 'ction\x20draw' + 'WithYSorti' + 'ng(scale)\x20' + '{\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20if\x20(!cha' + 'racterSpri' + _0x2d61ef(_0x353f4c._0x415881) + _0x2d61ef(0x37a) + 'sheet)\x20ret' + 'urn;\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20cons' + 't\x20charDraw' + _0x2d61ef(_0x353f4c._0x427031) + 'haracterSp' + 'riteHeight' + '\x20*\x20scale;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'const\x20char' + 'Y\x20=\x20(previ' + _0x2d61ef(_0x353f4c._0x42ce97) + _0x2d61ef(_0x353f4c._0x572da8) + 'arDrawHeig' + 'ht)\x20/\x202;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x7ff) + 'onst\x20chara' + 'cterBottom' + 'Y\x20=\x20charY\x20' + '+\x20charDraw' + 'Height;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xa07) + _0x2d61ef(_0x353f4c._0x537cab) + 'onBottomY\x20' + '=\x200;\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20if\x20(c' + 'urrentSpri' + 'tesheet)\x20{' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20const' + _0x2d61ef(_0x353f4c._0x215493) + 'rseInt(doc' + 'ument.getE' + 'lementById' + '(\x27rowInput' + _0x2d61ef(0x654) + '||\x201;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x31f) + 'mns\x20=\x20pars' + _0x2d61ef(0xb4c) + 'ent.getEle' + 'mentById(\x27' + 'columnInpu' + 't\x27).value)' + _0x2d61ef(0x6a7) + _0x2d61ef(0xacf) + _0x2d61ef(0xacf) + '\x20const\x20off' + 'setY\x20=\x20par' + _0x2d61ef(0xadd) + _0x2d61ef(_0x353f4c._0x280b67) + _0x2d61ef(_0x353f4c._0x1efee5) + '\x27offsetYIn' + 'put\x27)?.val' + 'ue)\x20||\x200;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3c1ca8) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + _0x2d61ef(0xb4e) + 'Width\x20=\x20cu' + 'rrentSprit' + 'esheet.wid' + 'th\x20/\x20colum' + 'ns;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20co' + 'nst\x20frameH' + 'eight\x20=\x20cu' + 'rrentSprit' + _0x2d61ef(0x90b) + 'ght\x20/\x20rows' + _0x2d61ef(0x306) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x417f53) + _0x2d61ef(0x4e1) + 'ht\x20=\x20frame') + ('Height\x20*\x20s' + 'cale;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x487830) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x48089a) + '\x20charDrawW' + _0x2d61ef(_0x353f4c._0x5bf711) + 'racterSpri' + _0x2d61ef(_0x353f4c._0x5ce757) + 'scale;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x79d) + 'eenY\x20=\x20cha' + _0x2d61ef(_0x353f4c._0x27bcb8) + 'rawHeight\x20' + '-\x20(charDra' + 'wHeight\x20/\x20' + _0x2d61ef(_0x353f4c._0x2a269b) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20const\x20g' + _0x2d61ef(0x88) + '\x20=\x20offsetY' + _0x2d61ef(0x3cb) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'const\x20canv' + 'asScale\x20=\x20' + 'charDrawWi' + 'dth\x20/\x20char' + _0x2d61ef(0xb2c) + 'eRealWidth' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x8d2) + 't\x20canvasOf' + _0x2d61ef(0x578) + 'meOffsetY\x20' + '*\x20canvasSc' + _0x2d61ef(0x170) + _0x2d61ef(_0x353f4c._0x3a7413) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a' + _0x2d61ef(_0x353f4c._0xf17738) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20const\x20' + _0x2d61ef(_0x353f4c._0x17a0b1) + 'reenY\x20-\x20(d' + 'rawHeight\x20' + _0x2d61ef(0x586) + _0x2d61ef(0x4d0) + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x4cd881) + 'ationBotto' + 'mY\x20=\x20animY' + '\x20+\x20drawHei' + 'ght;\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20}\x0a\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x4ae8cd) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x4d82eb) + '\x20Y-sorting' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20if\x20(curre' + _0x2d61ef(0x376) + 'eet\x20&&\x20ani' + 'mationBott' + 'omY\x20<\x20char' + 'acterBotto' + _0x2d61ef(_0x353f4c._0xefbd84) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'drawAnimat' + 'ionLayer(s' + 'cale);\x0a\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x13f3a7) + 'cterLayer(' + _0x2d61ef(_0x353f4c._0x2d1c27) + _0x2d61ef(_0x353f4c._0x5984c9) + '\x20\x20\x20\x20\x20\x20\x20\x20}\x20' + 'else\x20{\x0a\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20drawChara' + 'cterLayer(' + 'scale);\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xd19) + _0x2d61ef(_0x353f4c._0x23c945)) + (_0x2d61ef(_0x353f4c._0x11442a) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20draw' + _0x2d61ef(_0x353f4c._0x34d566) + 'ayer(scale' + ');\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0x103) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20}' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x131f3a) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20func' + 'tion\x20drawC' + 'haracterLa' + 'yer(scale)' + '\x20{\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20if\x20(!char' + 'acterSprit' + _0x2d61ef(0x7a6) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a' + _0x2d61ef(0xacf) + _0x2d61ef(0xb2a) + _0x2d61ef(_0x353f4c._0x3f82a7) + _0x2d61ef(0x379) + 'characterS' + 'priteWidth' + _0x2d61ef(0x306) + _0x2d61ef(_0x353f4c._0x446318) + _0x2d61ef(0x43a) + 'DrawHeight' + '\x20=\x20charact' + 'erSpriteHe' + 'ight;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20const\x20' + 'charX\x20=\x20(p' + 'reviewCanv' + 'as.width\x20-' + '\x20charDrawW' + _0x2d61ef(_0x353f4c._0x21e8a2) + _0x2d61ef(_0x353f4c._0x374822) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + _0x2d61ef(_0x353f4c._0x4491ab) + _0x2d61ef(0xb8d) + 'wCanvas.he' + 'ight\x20-\x20cha' + 'rDrawHeigh' + 't)\x20/\x202;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3c6b15) + '\x20\x20\x20\x20\x20previ' + _0x2d61ef(_0x353f4c._0xe6345e) + 'Image(\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3dbe29) + 'haracterSp' + 'rite,\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x200,' + '\x200,\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x5e9099) + 'acterSprit' + _0x2d61ef(0x756) + _0x2d61ef(_0x353f4c._0x487830) + _0x2d61ef(_0x353f4c._0x218903) + 'characterS' + 'priteHeigh' + 't,\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20charX' + _0x2d61ef(_0x353f4c._0x23c8ca) + _0x2d61ef(_0x353f4c._0x3c1ca8) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20charDrawW' + 'idth,\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20ch' + _0x2d61ef(0x5a4) + 'ht\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20);\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3aba43) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x5ec) + _0x2d61ef(0x8f5) + _0x2d61ef(_0x353f4c._0x3ddf53) + 'ayer(scale' + ')\x20{\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20if\x20(!cur' + 'rentSprite' + 'sheet)\x20ret' + 'urn;\x0a\x20\x20\x20\x20\x20') + (_0x2d61ef(_0x353f4c._0x1d48f0) + _0x2d61ef(_0x353f4c._0x454b62) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20updateRa' + _0x2d61ef(_0x353f4c._0x41f23b) + '();\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20const\x20row' + 's\x20=\x20parseI' + 'nt(documen' + 't.getEleme' + 'ntById(\x27ro' + 'wInput\x27).v' + 'alue)\x20||\x201' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1a2612) + _0x2d61ef(_0x353f4c._0x49c916) + 'mns\x20=\x20pars' + 'eInt(docum' + 'ent.getEle' + _0x2d61ef(0x202) + 'columnInpu' + _0x2d61ef(0x5c5) + '\x20||\x201;\x0a\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20const' + '\x20offsetX\x20=' + '\x20parseInt(' + _0x2d61ef(_0x353f4c._0x5e8ce1) + 'etElementB' + 'yId(\x27offse' + 'tXInput\x27)?' + '.value)\x20||' + '\x200;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20const\x20of' + 'fsetY\x20=\x20pa' + 'rseInt(doc' + 'ument.getE' + _0x2d61ef(0xaa) + '(\x27offsetYI' + _0x2d61ef(_0x353f4c._0xf654) + 'lue)\x20||\x200;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x8e5cc7) + _0x2d61ef(0x2b2) + _0x2d61ef(0xec) + 'Int(docume' + 'nt.getElem' + 'entById(\x27o' + 'pacityInpu' + 't\x27)?.value' + _0x2d61ef(_0x353f4c._0x4c17c0) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20co' + 'nst\x20hue\x20=\x20' + _0x2d61ef(_0x353f4c._0x3fd465) + 'ocument.ge' + 'tElementBy' + _0x2d61ef(0x11f) + 'ut\x27)?.valu' + _0x2d61ef(_0x353f4c._0x31e860) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20con' + 'st\x20blendMo' + _0x2d61ef(_0x353f4c._0x44a231) + 'ent.getEle' + _0x2d61ef(0x202) + _0x2d61ef(0x73e) + _0x2d61ef(0x884) + 'lue\x20||\x20\x27No' + 'rmal\x27;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20const' + '\x20flipHoriz' + _0x2d61ef(_0x353f4c._0x41ede1) + 'cument.get' + 'ElementByI' + 'd(\x27flipHor' + 'izontalChe' + 'ckbox\x27)?.c' + _0x2d61ef(0xc54) + _0x2d61ef(_0x353f4c._0xd5abef) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20const' + '\x20flipVerti' + _0x2d61ef(0xa9a) + 'ment.getEl' + 'ementById(' + '\x27flipVerti' + 'calCheckbo' + 'x\x27)?.check' + _0x2d61ef(_0x353f4c._0x4439d5) + 'e;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20const\x20ran' + _0x2d61ef(0xa3b) + 'izontal\x20=\x20') + ('document.g' + 'etElementB' + 'yId(\x27rando' + 'mFlipHoriz' + 'ontalCheck' + 'box\x27)?.che' + 'cked\x20||\x20fa' + 'lse;\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x23af8e) + '\x20\x20\x20const\x20r' + 'andomFlipV' + 'ertical\x20=\x20' + 'document.g' + 'etElementB' + 'yId(\x27rando' + 'mFlipVerti' + _0x2d61ef(_0x353f4c._0x170f72) + 'x\x27)?.check' + _0x2d61ef(_0x353f4c._0x947a64) + 'e;\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20const\x20rot' + _0x2d61ef(_0x353f4c._0x415f3e) + 'rseInt(doc' + _0x2d61ef(0x823) + _0x2d61ef(0xaa) + '(\x27rotation' + 'Input\x27)?.v' + 'alue)\x20||\x200' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'const\x20rand' + _0x2d61ef(0xa1d) + _0x2d61ef(_0x353f4c._0x3c85d4) + 't.getEleme' + 'ntById(\x27ra' + 'ndomRotati' + 'onCheckbox' + _0x2d61ef(0x20f) + 'd\x20||\x20false' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x1343aa) + 'rse\x20=\x20docu' + 'ment.getEl' + _0x2d61ef(0xbff) + _0x2d61ef(0x5f5) + 'eckbox\x27)?.' + 'checked\x20||' + _0x2d61ef(_0x353f4c._0x40b1d3) + _0x2d61ef(_0x353f4c._0x3013af) + '\x20\x20\x20\x20\x20\x20cons' + 't\x20bloomEna' + 'bled\x20=\x20doc' + 'ument.getE' + 'lementById' + _0x2d61ef(_0x353f4c._0x54b041) + 'ckbox\x27)?.c' + 'hecked\x20||\x20' + 'false;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20const' + '\x20blurAmoun' + 't\x20=\x20parseI' + 'nt(documen' + _0x2d61ef(0x44f) + 'ntById(\x27bl' + _0x2d61ef(0x3a0) + 'put\x27)?.val' + _0x2d61ef(0x604) + _0x2d61ef(_0x353f4c._0x51dd1b) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + _0x2d61ef(0x4d8) + 'sity\x20=\x20par' + 'seInt(docu' + 'ment.getEl' + _0x2d61ef(0xbff) + _0x2d61ef(0x565) + _0x2d61ef(0xcf) + _0x2d61ef(0x53c) + '55;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x18e) + 'ntColor\x20=\x20' + _0x2d61ef(0x560) + 'etElementB' + 'yId(\x27tintC' + _0x2d61ef(0x17d) + ')?.value\x20|' + '|\x20\x27#FFFFFF' + '\x27;\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0xa4b) + 'ningAnimat' + _0x2d61ef(_0x353f4c._0x317468) + _0x2d61ef(_0x353f4c._0x280dee) + 'ementById(' + '\x27openingAn' + 'imationInp' + 'ut\x27)?.valu') + ('e\x20||\x20\x27none' + '\x27;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20const\x20end' + 'ingAnimati' + 'on\x20=\x20docum' + 'ent.getEle' + 'mentById(\x27' + _0x2d61ef(_0x353f4c._0x303362) + 'ationInput' + '\x27)?.value\x20' + _0x2d61ef(0x431) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x8e5cc7) + _0x2d61ef(0x268) + 'tionDurati' + 'on\x20=\x20parse' + 'Int(docume' + 'nt.getElem' + _0x2d61ef(0x9da) + 'nimationDu' + 'rationInpu' + 't\x27)?.value' + ')\x20||\x2030;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x8d2) + 't\x20frameWid' + 'th\x20=\x20curre' + 'ntSpritesh' + 'eet.width\x20' + '/\x20columns;' + _0x2d61ef(0xa28) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + _0x2d61ef(0xb4e) + _0x2d61ef(0x943) + 'urrentSpri' + _0x2d61ef(_0x353f4c._0x1873d0) + 'ight\x20/\x20row' + 's;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20const\x20tot' + 'alFrames\x20=' + _0x2d61ef(0x573) + 'lumns;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20if\x20(op' + 'eningAnima' + 'tion\x20!==\x20\x27' + _0x2d61ef(_0x353f4c._0x448bed) + _0x2d61ef(0x660) + 'peningAnim' + '\x20&&\x20animat' + 'ionFrame\x20=' + _0x2d61ef(0x36b) + 'imationLoo' + _0x2d61ef(_0x353f4c._0xc9375f) + '\x200)\x20{\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x6e4) + _0x2d61ef(_0x353f4c._0x26ba7e) + 'ningAnim\x20=' + '\x20true;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20o' + 'peningAnim' + _0x2d61ef(_0x353f4c._0x116549) + _0x2d61ef(0xc8a) + _0x2d61ef(_0x353f4c._0x3a4ab9) + _0x2d61ef(0x103) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20if\x20(' + _0x2d61ef(_0x353f4c._0x57c6cb) + 'peningAnim' + ')\x20{\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xca0) + _0x2d61ef(_0x353f4c._0x15b341) + _0x2d61ef(0x554) + '++;\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x5cdd42) + '\x20\x20\x20\x20\x20\x20if\x20(' + 'openingAni' + 'mationProg' + _0x2d61ef(_0x353f4c._0x18677f) + 'imationDur' + 'ation)\x20{\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20isPla' + _0x2d61ef(_0x353f4c._0x39c56e) + _0x2d61ef(0x153) + 'lse;\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20}\x0a\x20') + ('\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20}\x0a\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20if\x20(' + 'endingAnim' + _0x2d61ef(0x882) + _0x2d61ef(0x1bc) + '!isPlaying' + 'EndingAnim' + ')\x20{\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20cons' + 't\x20framesLe' + 'ft\x20=\x20rever' + _0x2d61ef(0x5df) + 'tionFrame\x20' + '+\x201\x20:\x20tota' + 'lFrames\x20-\x20' + 'animationF' + 'rame;\x0a\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20if' + _0x2d61ef(0x359) + _0x2d61ef(0x591) + _0x2d61ef(0x483) + _0x2d61ef(0x5fa) + '0\x20/\x20(parse' + 'Int(docume' + _0x2d61ef(0x916) + 'entById(\x27f' + 'psInput\x27).' + _0x2d61ef(_0x353f4c._0x6391b8) + _0x2d61ef(0xafd) + _0x2d61ef(_0x353f4c._0x4b9865) + _0x2d61ef(_0x353f4c._0x1d48f0) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20i' + 'sPlayingEn' + 'dingAnim\x20=' + '\x20true;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x2abc2e) + 'nimationPr' + 'ogress\x20=\x200' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0xb08) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20}\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0xb3db4b) + _0x2d61ef(0xab1) + 'ngAnim)\x20{\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3a4ab9) + '\x20\x20endingAn' + 'imationPro' + _0x2d61ef(0x333) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20}\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x39f6b0) + _0x2d61ef(0xbf3) + 'ty\x20=\x20opaci' + _0x2d61ef(0x72e) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20let\x20fina' + 'lScale\x20=\x20s' + _0x2d61ef(_0x353f4c._0x254a51) + _0x2d61ef(0xacf) + _0x2d61ef(0x873) + 'aleX\x20=\x201;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20le' + _0x2d61ef(_0x353f4c._0x37828c) + '\x201;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20if\x20(isPla' + _0x2d61ef(0xd40) + 'gAnim)\x20{\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20const\x20pro' + 'gress\x20=\x20op' + 'eningAnima' + _0x2d61ef(_0x353f4c._0x273c0d) + 'ss\x20/\x20anima' + 'tionDurati' + 'on;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20cons' + 't\x20easedPro') + (_0x2d61ef(_0x353f4c._0x267fcf) + 'ogress\x20<\x200' + _0x2d61ef(0x1f8) + 'rogress\x20*\x20' + 'progress\x20:' + '\x201\x20-\x20Math.' + _0x2d61ef(_0x353f4c._0x59268e) + _0x2d61ef(0x55b) + _0x2d61ef(_0x353f4c._0x40cd84) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20if\x20(' + 'openingAni' + _0x2d61ef(0x872) + '\x20\x27fadeIn\x27)' + _0x2d61ef(0x520) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x2d1858) + 'inalOpacit' + 'y\x20=\x20opacit' + _0x2d61ef(0x67b) + 'rogress;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20}\x20else\x20if' + '\x20(openingA' + 'nimation\x20=' + '==\x20\x27scaleI' + _0x2d61ef(_0x353f4c._0x37169c) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xc67) + 'le\x20=\x20scale' + '\x20*\x20easedPr' + 'ogress;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x7de) + '(openingAn' + 'imation\x20==' + '=\x20\x27scaleIn' + 'Width\x27)\x20{\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20scal' + _0x2d61ef(0x699) + 'Progress;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20scal' + 'eY\x20=\x201;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x472095) + '(openingAn' + _0x2d61ef(0x4c1) + '=\x20\x27scaleIn' + 'Height\x27)\x20{' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x25d489) + 'leX\x20=\x201;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20scale' + 'Y\x20=\x20easedP' + 'rogress;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x452fd3) + '\x20}\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x508059) + _0x2d61ef(0xacf) + '\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + 'if\x20(isPlay' + 'ingEndingA' + 'nim)\x20{\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + 'onst\x20progr' + 'ess\x20=\x20endi' + 'ngAnimatio' + 'nProgress\x20' + '/\x20animatio' + 'nDuration;' + _0x2d61ef(0xa28) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x28c) + 'asedProgre' + 'ss\x20=\x201\x20-\x20(' + 'progress\x20<' + _0x2d61ef(0x4a4) + '\x20progress\x20' + '*\x20progress' + _0x2d61ef(_0x353f4c._0x1cd761) + 'h.pow(-2\x20*' + _0x2d61ef(_0x353f4c._0x2a98d6)) + ('+\x202,\x202)\x20/\x20' + '2);\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20i' + 'f\x20(endingA' + 'nimation\x20=' + '==\x20\x27fadeOu' + 't\x27)\x20{\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20finalOpa' + 'city\x20=\x20opa' + 'city\x20*\x20eas' + _0x2d61ef(_0x353f4c._0x492f3c) + _0x2d61ef(0x306) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20}\x20else' + '\x20if\x20(endin' + _0x2d61ef(0x192) + _0x2d61ef(0x9a8) + 'eOut\x27)\x20{\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20final' + 'Scale\x20=\x20sc' + 'ale\x20*\x20ease' + _0x2d61ef(0x819) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3c8568) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20}\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x345c85) + _0x2d61ef(_0x353f4c._0x44f618) + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x31e8ce) + 'layFrame\x20=' + _0x2d61ef(0xa89) + '\x20(totalFra' + 'mes\x20-\x201\x20-\x20' + 'animationF' + 'rame)\x20:\x20an' + _0x2d61ef(_0x353f4c._0x964844) + 'me;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20const\x20cu' + _0x2d61ef(0x84f) + '\x20displayFr' + _0x2d61ef(_0x353f4c._0x1de915) + _0x2d61ef(_0x353f4c._0x4b3ccc) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20const\x20c' + 'urrentRow\x20' + '=\x20Math.flo' + 'or(display' + 'Frame\x20/\x20co' + 'lumns);\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20const' + _0x2d61ef(0x447) + _0x2d61ef(_0x353f4c._0x4c0bc9) + 'dth\x20*\x20fina' + 'lScale;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20cons' + 't\x20drawHeig' + 'ht\x20=\x20frame' + 'Height\x20*\x20f' + _0x2d61ef(_0x353f4c._0x10e734) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xab9) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20co' + 'nst\x20charDr' + 'awWidth\x20=\x20' + _0x2d61ef(_0x353f4c._0x2071e1) + 'priteWidth' + _0x2d61ef(0x306) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'const\x20char' + 'DrawHeight' + '\x20=\x20charact' + _0x2d61ef(_0x353f4c._0x9ee70c) + 'ight;\x0a\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1e587d) + '\x20\x20\x20\x20const\x20' + _0x2d61ef(_0x353f4c._0x1cb1a1) + _0x2d61ef(0x89c) + 'as.width\x20-' + '\x20charDrawW' + 'idth)\x20/\x202;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + _0x2d61ef(0xb8c) + '\x20=\x20(previe' + _0x2d61ef(0x563)) + ('ight\x20-\x20cha' + 'rDrawHeigh' + 't)\x20/\x202;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x41ca09) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20const' + '\x20centerX\x20=' + '\x20charX\x20+\x20(' + 'charDrawWi' + _0x2d61ef(0x1ce) + '\x20offsetX;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x759fbf) + 'nst\x20center' + 'Y\x20=\x20charY\x20' + '+\x20(charDra' + 'wHeight\x20/\x20' + '2)\x20+\x20offse' + 'tY;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x389) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20const\x20dra' + 'wFrame\x20=\x20(' + 'ctx,\x20apply' + 'Bloom)\x20=>\x20' + '{\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x42e63c) + _0x2d61ef(_0x353f4c._0x37d9f9) + _0x2d61ef(_0x353f4c._0x3c6b15) + '\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x487830) + _0x2d61ef(0x962) + _0x2d61ef(_0x353f4c._0x422822) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20ctx.g' + _0x2d61ef(_0x353f4c._0x37ba6b) + '\x20=\x20(intens' + 'ity\x20/\x20255)' + _0x2d61ef(_0x353f4c._0x104333) + 'pacity\x20/\x202' + _0x2d61ef(0xd33) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20}\x20e' + 'lse\x20{\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20ctx.glob' + _0x2d61ef(_0x353f4c._0x30ceb9) + 'finalOpaci' + 'ty\x20/\x20255;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xb14) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x5984c9) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + 'onst\x20blend' + _0x2d61ef(0xd01) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x27Nor' + 'mal\x27:\x20\x27sou' + 'rce-over\x27,' + _0x2d61ef(_0x353f4c._0x277eea) + _0x2d61ef(_0x353f4c._0x5984c9) + '\x20\x20\x20\x20\x20\x20\x20\x27Sc' + _0x2d61ef(0x4c9) + 'reen\x27,\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x27Add\x27:\x20' + _0x2d61ef(_0x353f4c._0x3aed0d) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x27Mu' + 'ltiply\x27:\x20\x27' + 'multiply\x27\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20};\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x452fd3) + '\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x8c8) + 'loom)\x20{\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x6b6) + 'obalCompos' + 'iteOperati' + 'on\x20=\x20\x27scre' + _0x2d61ef(_0x353f4c._0x4033af) + _0x2d61ef(_0x353f4c._0x42b989)) + ('\x20\x20\x20\x20\x20\x20\x20}\x20e' + 'lse\x20{\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20ctx.glob' + _0x2d61ef(_0x353f4c._0x1106d4) + 'eOperation' + '\x20=\x20blendMo' + 'des[blendM' + 'ode]\x20||\x20\x27s' + 'ource-over' + '\x27;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xc22) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20ctx.tran' + 'slate(cent' + _0x2d61ef(0xb35) + 'rY);\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'const\x20fina' + 'lRotation\x20' + '=\x20randomRo' + 'tation\x20?\x20c' + 'urrentRand' + 'omRotation' + _0x2d61ef(_0x353f4c._0x5ee1e1) + 'n;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1550da) + 'inalRotati' + 'on\x20!==\x200)\x20' + _0x2d61ef(0x932) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x37a24c) + _0x2d61ef(_0x353f4c._0x496bde) + _0x2d61ef(0x533) + _0x2d61ef(_0x353f4c._0x41d4df) + 'PI\x20/\x20180);' + _0x2d61ef(_0x353f4c._0x51dd1b) + _0x2d61ef(_0x353f4c._0x5cdd42) + '\x20\x20\x20}\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xa04) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'let\x20finalF' + 'lipX\x20=\x20fli' + 'pHorizonta' + 'l;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20let\x20f' + 'inalFlipY\x20' + '=\x20flipVert' + 'ical;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20if\x20(rando' + _0x2d61ef(0x540) + _0x2d61ef(0x651) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20final' + 'FlipX\x20=\x20cu' + 'rrentRando' + 'mFlipX;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x4fedb0) + '}\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20if\x20(ra' + 'ndomFlipVe' + 'rtical)\x20{\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20fina' + 'lFlipY\x20=\x20c' + _0x2d61ef(0x3ef) + 'omFlipY;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0xa7ac7b) + '\x20}\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0xa96dc8) + '\x20\x20\x20\x20\x20\x20\x20\x20le' + 't\x20effectiv' + _0x2d61ef(_0x353f4c._0x3ed7c3) + '(finalFlip' + _0x2d61ef(0x342) + ')\x20*\x20(openi' + 'ngAnimatio') + ('n\x20===\x20\x27sca' + _0x2d61ef(0x52d) + '\x20&&\x20isPlay' + 'ingOpening' + 'Anim\x20?\x20sca' + _0x2d61ef(_0x353f4c._0x44a312) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20let\x20effe' + 'ctiveScale' + 'Y\x20=\x20(final' + 'FlipY\x20?\x20-1' + '\x20:\x201)\x20*\x20(o' + 'peningAnim' + 'ation\x20===\x20' + '\x27scaleInHe' + _0x2d61ef(0x272) + 'sPlayingOp' + _0x2d61ef(0x1e5) + '?\x20scaleY\x20:' + '\x201);\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x5cd242) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'ctx.scale(' + _0x2d61ef(_0x353f4c._0x1a9a21) + 'caleX,\x20eff' + _0x2d61ef(_0x353f4c._0x36d604) + 'eY);\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x329269) + _0x2d61ef(_0x353f4c._0xdb6571) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x53ad9c) + 'if\x20(hue\x20!=' + _0x2d61ef(0x90) + _0x2d61ef(_0x353f4c._0x50bd9d) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20con' + 'st\x20tempCan' + 'vas\x20=\x20docu' + _0x2d61ef(_0x353f4c._0x4bb382) + 'eElement(\x27' + 'canvas\x27);\x0a' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20temp' + 'Canvas.wid' + 'th\x20=\x20frame' + _0x2d61ef(_0x353f4c._0xe11d83) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20tempCan' + 'vas.height' + '\x20=\x20frameHe' + 'ight;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x1d5) + 'mpCtx\x20=\x20te' + 'mpCanvas.g' + 'etContext(' + '\x272d\x27);\x0a\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0xacf) + _0x2d61ef(0x82b) + _0x2d61ef(_0x353f4c._0x53ad9c) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'tempCtx.dr' + 'awImage(\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + 'urrentSpri' + 'tesheet,\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x7ff) + _0x2d61ef(0x8d7) + '*\x20frameWid' + _0x2d61ef(0x2dd) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20curren' + 'tRow\x20*\x20fra' + 'meHeight,\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x14fc9d) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x6c9) + ',\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x159) + _0x2d61ef(_0x353f4c._0x209de9) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x200,\x200,' + _0x2d61ef(0xa28)) + ('\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20frameWidt' + 'h,\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20frameHe' + _0x2d61ef(_0x353f4c._0x567a4c) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20);\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x243b5a) + _0x2d61ef(0x839) + _0x2d61ef(_0x353f4c._0xeb365f) + 'tx.getImag' + _0x2d61ef(_0x353f4c._0x121e5c) + _0x2d61ef(_0x353f4c._0x4923e8) + _0x2d61ef(_0x353f4c._0x4d4097) + 'eight);\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xbc1) + 'data\x20=\x20ima' + 'geData.dat' + _0x2d61ef(0x950) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x3de5ed) + _0x2d61ef(0x1a9) + '5,\x20tintG\x20=' + '\x20255,\x20tint' + 'B\x20=\x20255;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x72c) + 'pplyBloom\x20' + '&&\x20tintCol' + 'or)\x20{\x0a\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x8d2) + 't\x20hex\x20=\x20ti' + _0x2d61ef(_0x353f4c._0x327342) + 'place(\x27#\x27,' + '\x20\x27\x27);\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20tint' + 'R\x20=\x20parseI' + 'nt(hex.sub' + _0x2d61ef(_0x353f4c._0x18d005) + '\x2016);\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20tint' + _0x2d61ef(_0x353f4c._0x522f3a) + 'nt(hex.sub' + 'str(2,\x202),' + _0x2d61ef(_0x353f4c._0x20708c) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20tint' + _0x2d61ef(0x3f5) + 'nt(hex.sub' + 'str(4,\x202),' + _0x2d61ef(0x10f) + _0x2d61ef(0xacf) + _0x2d61ef(0xacf) + '\x20\x20}\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x57d28c) + _0x2d61ef(_0x353f4c._0x243b5a) + 'st\x20hueRadi' + 'ans\x20=\x20hue\x20' + '*\x20Math.PI\x20' + '/\x20180;\x0a\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'for\x20(let\x20i' + '\x20=\x200;\x20i\x20<\x20' + 'data.lengt' + 'h;\x20i\x20+=\x204)' + _0x2d61ef(0x520) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x86f) + _0x2d61ef(0x92a) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x362c1b)) + ('\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'let\x20g\x20=\x20da' + 'ta[i\x20+\x201];' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x4ffb0c) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20let\x20b\x20=\x20d' + _0x2d61ef(0x46d) + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x389) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20if\x20(hue' + '\x20!==\x200)\x20{\x0a' + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x5984c9) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20const\x20' + _0x2d61ef(0xb7) + '.max(r,\x20g,' + '\x20b)\x20/\x20255;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0x744) + _0x2d61ef(0x1b8) + 'h.min(r,\x20g' + ',\x20b)\x20/\x20255' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20let\x20' + 'h,\x20s,\x20l\x20=\x20' + '(max\x20+\x20min' + ')\x20/\x202;\x0a\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3a9a6d) + _0x2d61ef(_0x353f4c._0x38020f) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0xb6c78) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20if\x20(' + 'max\x20===\x20mi' + _0x2d61ef(0xad6) + _0x2d61ef(_0x353f4c._0x43f0a8) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0xa7ac7b) + '\x20\x20\x20h\x20=\x20s\x20=' + '\x200;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20}\x20' + _0x2d61ef(0xc42) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x81a0c7) + _0x2d61ef(_0x353f4c._0x6ac98e) + '\x20\x20\x20\x20\x20const' + '\x20d\x20=\x20max\x20-' + _0x2d61ef(_0x353f4c._0x573a9a) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1dfb42) + _0x2d61ef(0xa59) + _0x2d61ef(_0x353f4c._0x1f3601) + '\x20-\x20min)\x20:\x20' + _0x2d61ef(_0x353f4c._0x18695d) + _0x2d61ef(0x6d7) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x28d) + _0x2d61ef(_0x353f4c._0x34bc79) + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x327c66) + '\x20\x20\x20\x20switch' + '\x20(max)\x20{\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20case\x20r\x20/\x20' + _0x2d61ef(_0x353f4c._0x363166) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x5a0df1) + _0x2d61ef(0xacf) + '\x20h\x20=\x20((g\x20/' + _0x2d61ef(0x6f3) + '\x20255)\x20/\x20d\x20' + '+\x20(g\x20<\x20b\x20?' + '\x206\x20:\x200))\x20/' + '\x206;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x27cd68)) + (_0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + 'ase\x20g\x20/\x2025' + _0x2d61ef(0x618) + _0x2d61ef(_0x353f4c._0x52e414) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20h' + '\x20=\x20((b\x20/\x202' + '55\x20-\x20r\x20/\x202' + _0x2d61ef(0x91b) + '2)\x20/\x206;\x0a\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x18ce84) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20break;' + _0x2d61ef(_0x353f4c._0x15e80e) + _0x2d61ef(_0x353f4c._0x20f385) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20case\x20b\x20' + '/\x20255:\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0x816) + '\x20/\x20255\x20-\x20g' + '\x20/\x20255)\x20/\x20' + 'd\x20+\x204)\x20/\x206' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3679c5) + _0x2d61ef(0x96f) + 'eak;\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x14fc9d) + '\x20\x20\x20}\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x25b151) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'h\x20=\x20(h\x20+\x20h' + 'ueRadians\x20' + '/\x20(2\x20*\x20Mat' + 'h.PI))\x20%\x201' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3755f2) + _0x2d61ef(0xacf) + _0x2d61ef(0xc53) + 'h\x20<\x200)\x20h\x20+' + _0x2d61ef(_0x353f4c._0x5ed82a) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x224ba1) + _0x2d61ef(_0x353f4c._0x4e25d4) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0xa9bec4) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x29a979) + _0x2d61ef(_0x353f4c._0x364422) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x323dfe) + '\x20\x20\x20\x20\x20\x20\x20r2\x20' + '=\x20g2\x20=\x20b2\x20' + _0x2d61ef(0x446) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20}' + _0x2d61ef(_0x353f4c._0x1a8e1a) + _0x2d61ef(_0x353f4c._0x4ffb0c) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20cons' + 't\x20hue2rgb\x20' + '=\x20(p,\x20q,\x20t' + ')\x20=>\x20{\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x6ae1b4) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20i' + _0x2d61ef(_0x353f4c._0x2de0e8) + 't\x20+=\x201;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20') + ('\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'if\x20(t\x20>\x201)' + '\x20t\x20-=\x201;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20if\x20(t\x20<\x201' + _0x2d61ef(_0x353f4c._0x335184) + '\x20p\x20+\x20(q\x20-\x20' + _0x2d61ef(0x334) + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x44991c) + '\x20\x20\x20\x20if\x20(t\x20' + '<\x201/2)\x20ret' + 'urn\x20q;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20i' + 'f\x20(t\x20<\x202/3' + ')\x20return\x20p' + '\x20+\x20(q\x20-\x20p)' + _0x2d61ef(_0x353f4c._0x46895a) + 't)\x20*\x206;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x2d1c9a) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x5dd) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x4fedb0) + '\x20\x20\x20\x20\x20\x20\x20\x20};' + _0x2d61ef(0xa28) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20co' + _0x2d61ef(_0x353f4c._0x3703fb) + _0x2d61ef(_0x353f4c._0x1cc0e9) + '*\x20(1\x20+\x20s)\x20' + ':\x20l\x20+\x20s\x20-\x20' + 'l\x20*\x20s;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x744) + '\x20p\x20=\x202\x20*\x20l' + '\x20-\x20q;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x6ae1b4) + _0x2d61ef(0x2bf) + _0x2d61ef(_0x353f4c._0x57c196) + 'q,\x20h\x20+\x201/3' + ');\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x6ae1b4) + _0x2d61ef(_0x353f4c._0xa3db1c) + _0x2d61ef(0x85c) + 'rgb(p,\x20q,\x20' + 'h);\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20b2\x20=\x20hue' + '2rgb(p,\x20q,' + '\x20h\x20-\x201/3);' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20}\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x34bc79) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x4ffb0c) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20r\x20=\x20' + 'r2\x20*\x20255;\x0a' + _0x2d61ef(_0x353f4c._0x42b989) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20g\x20=\x20g2' + _0x2d61ef(_0x353f4c._0xdeb3f9) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x4200c7) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x874) + '\x20255;\x0a\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20') + ('\x20\x20\x20\x20\x20\x20}\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x8a9) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0xa9bec4) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20i' + 'f\x20(applyBl' + 'oom)\x20{\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0xd5c98b) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20r\x20=\x20(r\x20*\x20' + 'tintR)\x20/\x202' + '55;\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x101f09) + '\x20\x20\x20\x20\x20\x20\x20\x20g\x20' + '=\x20(g\x20*\x20tin' + 'tG)\x20/\x20255;' + _0x2d61ef(_0x353f4c._0x4e1d68) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x31457a) + _0x2d61ef(0x373) + 'b\x20*\x20tintB)' + '\x20/\x20255;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20}\x0a' + _0x2d61ef(_0x353f4c._0x192f2a) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x194712) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x487830) + '\x20data[i]\x20=' + '\x20r;\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x138bc9) + _0x2d61ef(0x278) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x219e28) + _0x2d61ef(_0x353f4c._0x5984c9) + '\x20data[i\x20+\x20' + '2]\x20=\x20b;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x276e08) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1e288a) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20t' + _0x2d61ef(_0x353f4c._0x32dd98) + 'ImageData(' + _0x2d61ef(0x1ae) + _0x2d61ef(0xa06) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3a4ab9) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20if\x20(apply' + _0x2d61ef(_0x353f4c._0x422822) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + 'onst\x20blurr' + 'edCanvas\x20=' + '\x20document.' + 'createElem' + 'ent(\x27canva' + 's\x27);\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x4d1911) + 'edCanvas.w' + _0x2d61ef(_0x353f4c._0x1634b2) + 'meWidth\x20+\x20' + '(blurAmoun' + _0x2d61ef(_0x353f4c._0x34ca82) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xa58) + 'urredCanva' + 's.height\x20=' + '\x20frameHeig' + 'ht\x20+\x20(blur' + _0x2d61ef(0xa69) + ');\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0xac2) + 'lurredCtx\x20' + _0x2d61ef(0x1be) + _0x2d61ef(0x8b5) + _0x2d61ef(0x238) + '\x27);\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20') + ('\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20blurre' + 'dCtx.filte' + 'r\x20=\x20\x27blur(' + '\x27\x20+\x20blurAm' + 'ount\x20+\x20\x27px' + ')\x27;\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x6ae1b4) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20blurre' + _0x2d61ef(0x450) + 'mage(tempC' + _0x2d61ef(0xbb8) + 'rAmount\x20*\x20' + _0x2d61ef(_0x353f4c._0x5bf117) + 'unt\x20*\x202);\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20ctx.drawI' + 'mage(\x0a\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0xf17738) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'blurredCan' + 'vas,\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20-' + 'drawWidth\x20' + _0x2d61ef(0x6ad) + _0x2d61ef(0x4a9) + _0x2d61ef(0xb86) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3a4ab9) + '\x20\x20\x20\x20\x20\x20\x20\x20-d' + _0x2d61ef(_0x353f4c._0x54feb2) + '/\x202\x20-\x20(blu' + 'rAmount\x20*\x20' + '2),\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x28e7ca) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20dr' + 'awWidth\x20+\x20' + '(blurAmoun' + 't\x20*\x204),\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0x18b) + _0x2d61ef(0xb38) + 'Amount\x20*\x204' + ')\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x446318) + '\x20\x20);\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x5b96a0) + _0x2d61ef(_0x353f4c._0xa2353c) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'ctx.drawIm' + 'age(\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x92e) + 'empCanvas,' + _0x2d61ef(0xa28) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20-draw' + _0x2d61ef(0x868) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20-draw' + 'Height\x20/\x202' + ',\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20draw' + 'Width,\x0a\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3a6b86) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20drawHeigh' + 't\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20);\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20}\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20}\x20els' + _0x2d61ef(0xb85)) + (_0x2d61ef(0xacf) + _0x2d61ef(0xacf) + _0x2d61ef(0xd12) + 'age(\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0xa96dc8) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1ca1fa) + 'ntSpritesh' + 'eet,\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20curre' + 'ntCol\x20*\x20fr' + _0x2d61ef(0x4ac) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + 'currentRow' + _0x2d61ef(_0x353f4c._0x3c1343) + _0x2d61ef(_0x353f4c._0x5aa13b) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20fram' + 'eWidth,\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x115782) + '\x20\x20\x20\x20\x20\x20\x20\x20fr' + _0x2d61ef(_0x353f4c._0x3a5c39) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x56fc63) + _0x2d61ef(_0x353f4c._0x258beb) + _0x2d61ef(_0x353f4c._0x8dea73) + 'h\x20/\x202,\x0a\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20-dr' + 'awHeight\x20/' + '\x202,\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x6ac) + 'dth,\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20drawH' + _0x2d61ef(0xa17) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0xd1b) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20}\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x4b1e82) + '\x20\x20\x20\x20ctx.re' + 'store();\x0a\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20};\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x8a9) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x25648a) + _0x2d61ef(_0x353f4c._0x239974) + 'led)\x20{draw' + 'Frame(prev' + 'iewCtx,\x20tr' + 'ue);}\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20drawFr' + _0x2d61ef(_0x353f4c._0x339f2a) + 'wCtx,\x20fals' + _0x2d61ef(0x1b7) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3f9a1d) + _0x2d61ef(0xa5d) + 'animationF' + 'rame\x20+\x201)\x20' + '%\x20totalFra' + _0x2d61ef(0x799) + _0x2d61ef(0xacf) + _0x2d61ef(0xb72) + _0x2d61ef(0x5ee) + 'e\x20===\x200)\x20{' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x24e) + 'onLoopCoun' + 't++;\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20}\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20}' + '\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20fu' + 'nction\x20sav' + _0x2d61ef(_0x353f4c._0x379a47) + _0x2d61ef(0x934) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x975) + 'mationName') + ('\x20=\x20documen' + 't.getEleme' + _0x2d61ef(0x8f7) + 'imationNam' + 'eInput\x27)?.' + 'value.trim' + _0x2d61ef(0xdd) + _0x2d61ef(0xacf) + '\x20if\x20(!anim' + 'ationName)' + _0x2d61ef(_0x353f4c._0x1eb1e4) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20a' + 'lert(\x27Plea' + 'se\x20enter\x20a' + 'n\x20animatio' + 'n\x20name!\x27);' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20ret' + 'urn;\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0x16c) + 'ntSpritesh' + 'eet)\x20{\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20alert(\x27' + 'Please\x20loa' + 'd\x20a\x20sprite' + 'sheet\x20firs' + _0x2d61ef(_0x353f4c._0x296f41) + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x38d9c8) + _0x2d61ef(_0x353f4c._0x435943) + '\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20const' + '\x20fileBox\x20=' + '\x20document.' + _0x2d61ef(0xc8b) + 'ById(\x27file' + _0x2d61ef(0xd2) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20const\x20f' + 'ileName\x20=\x20' + _0x2d61ef(0x20b) + 'xtContent;' + '\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20if' + '\x20(fileName' + '\x20===\x20\x27Clic' + 'k\x20to\x20selec' + _0x2d61ef(_0x353f4c._0x97028b) + 'eet\x27)\x20{\x0a\x20\x20' + _0x2d61ef(_0x353f4c._0x219e28) + '\x20\x20\x20\x20alert(' + _0x2d61ef(0x49d) + 'ad\x20a\x20sprit' + 'esheet\x20fir' + 'st!\x27);\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20return;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20cons' + 't\x20editorOf' + _0x2d61ef(0xd22) + 'rseInt(doc' + 'ument.getE' + 'lementById' + '(\x27offsetXI' + 'nput\x27)?.va' + 'lue)\x20||\x200;' + _0x2d61ef(_0x353f4c._0x277eea) + '\x20\x20\x20\x20\x20\x20\x20con' + 'st\x20editorO' + 'ffsetY\x20=\x20p' + 'arseInt(do' + _0x2d61ef(_0x353f4c._0x3c83e1) + _0x2d61ef(_0x353f4c._0x243aaf) + 'd(\x27offsetY' + 'Input\x27)?.v' + 'alue)\x20||\x200' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20co' + 'nst\x20saveTa' + 'rgetSprite' + '\x20=\x20documen' + _0x2d61ef(_0x353f4c._0x274e14) + 'ntById(\x27sa' + _0x2d61ef(0xd10) + 'riteCheckb' + 'ox\x27)?.chec' + _0x2d61ef(_0x353f4c._0xdf7b03) + 'se;\x0a\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20const\x20ani' + 'mationData' + '\x20=\x20{\x0a\x20\x20\x20\x20\x20') + (_0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x4d8785) + 'mationName' + ',\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20sp' + 'ritesheetF' + _0x2d61ef(0x78f) + 'ame,\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20rows:\x20par' + 'seInt(docu' + 'ment.getEl' + 'ementById(' + _0x2d61ef(_0x353f4c._0x217cc6) + ').value)\x20|' + '|\x201,\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x28e7ca) + '\x20columns:\x20' + 'parseInt(d' + 'ocument.ge' + _0x2d61ef(0x7e0) + 'Id(\x27column' + 'Input\x27).va' + 'lue)\x20||\x201,' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20fps' + _0x2d61ef(0xcd5) + _0x2d61ef(0x9dc) + _0x2d61ef(_0x353f4c._0x2c89fe) + _0x2d61ef(0x641) + _0x2d61ef(_0x353f4c._0xa948a5) + 'ue)\x20||\x2060,' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xc31) + 'le:\x20parseI' + 'nt(documen' + _0x2d61ef(0x44f) + 'ntById(\x27sc' + 'aleInput\x27)' + '.value)\x20||' + '\x20100,\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20opacity:' + '\x20parseInt(' + _0x2d61ef(_0x353f4c._0x2487c1) + _0x2d61ef(0x5a1) + _0x2d61ef(0x690) + 'tyInput\x27)?' + '.value)\x20||' + '\x20255,\x0a\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x169fbe) + '\x20\x20hue:\x20par' + 'seInt(docu' + 'ment.getEl' + 'ementById(' + '\x27hueInput\x27' + ')?.value)\x20' + _0x2d61ef(_0x353f4c._0x3ed87d) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20blendMod' + _0x2d61ef(0x27e) + _0x2d61ef(_0x353f4c._0x274e14) + _0x2d61ef(_0x353f4c._0x59e3b6) + 'endModeInp' + 'ut\x27)?.valu' + _0x2d61ef(0x84e) + 'al\x27,\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20playInRev' + 'erse:\x20docu' + 'ment.getEl' + 'ementById(' + '\x27reverseCh' + _0x2d61ef(_0x353f4c._0x422c96) + _0x2d61ef(0x41b) + '\x20false,\x0a\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20flip:\x20' + _0x2d61ef(_0x353f4c._0xd0f0a5) + 'etElementB' + 'yId(\x27flipH' + 'orizontalC' + 'heckbox\x27)?' + _0x2d61ef(_0x353f4c._0x3e0588) + _0x2d61ef(0x98b) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20flipY' + ':\x20document' + '.getElemen' + 'tById(\x27fli' + _0x2d61ef(_0x353f4c._0x50536f) + 'heckbox\x27)?' + '.checked\x20|' + _0x2d61ef(0x98b) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20rando' + 'mFlipX:\x20do' + 'cument.get' + _0x2d61ef(_0x353f4c._0x4a78f1) + _0x2d61ef(_0x353f4c._0x2fd8c6)) + (_0x2d61ef(_0x353f4c._0x593ea9) + 'talCheckbo' + 'x\x27)?.check' + 'ed\x20||\x20fals' + 'e,\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20r' + 'andomFlipY' + ':\x20document' + _0x2d61ef(_0x353f4c._0x351a71) + 'tById(\x27ran' + _0x2d61ef(0x1ec) + 'ticalCheck' + 'box\x27)?.che' + 'cked\x20||\x20fa' + 'lse,\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20rotation:' + '\x20parseInt(' + _0x2d61ef(_0x353f4c._0x7832e2) + 'etElementB' + 'yId(\x27rotat' + 'ionInput\x27)' + '?.value)\x20|' + '|\x200,\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20randomRot' + _0x2d61ef(0x894) + 'ument.getE' + 'lementById' + _0x2d61ef(_0x353f4c._0x2e4295) + 'tationChec' + _0x2d61ef(0xc6c) + 'ecked\x20||\x20f' + _0x2d61ef(_0x353f4c._0x4f7c93) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20openingA' + 'nimation:\x20' + 'document.g' + _0x2d61ef(0x5a1) + 'yId(\x27openi' + 'ngAnimatio' + 'nInput\x27)?.' + 'value\x20||\x20\x27' + _0x2d61ef(0x32d) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20endingA' + _0x2d61ef(0x380) + _0x2d61ef(0x560) + 'etElementB' + _0x2d61ef(0x603) + 'gAnimation' + 'Input\x27)?.v' + 'alue\x20||\x20\x27n' + 'one\x27,\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20animatio' + 'nDuration:' + '\x20parseInt(' + 'document.g' + 'etElementB' + 'yId(\x27anima' + 'tionDurati' + _0x2d61ef(0x765) + '.value)\x20||' + '\x2030,\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20bloomEffe' + 'ct:\x20docume' + 'nt.getElem' + 'entById(\x27b' + 'loomCheckb' + _0x2d61ef(0x1d2) + _0x2d61ef(0xb59) + _0x2d61ef(0x6a9) + _0x2d61ef(_0x353f4c._0x258beb) + _0x2d61ef(_0x353f4c._0xe7debe) + ':\x20parseInt' + '(document.' + 'getElement' + 'ById(\x27blur' + 'AmountInpu' + _0x2d61ef(_0x353f4c._0x28dadc) + ')\x20||\x2015,\x0a\x20' + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x18d3e7) + _0x2d61ef(0xc10) + _0x2d61ef(0xb4c) + 'ent.getEle' + 'mentById(\x27' + 'intensityI' + _0x2d61ef(_0x353f4c._0xf654) + 'lue)\x20||\x2025' + _0x2d61ef(0xb23) + _0x2d61ef(_0x353f4c._0x3855b0) + _0x2d61ef(0x768) + 'document.g' + _0x2d61ef(0x5a1) + 'yId(\x27tintC' + 'olorInput\x27' + ')?.value\x20|') + ('|\x20\x27#FFFFFF' + '\x27,\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3a8dc4) + _0x2d61ef(_0x353f4c._0x404b50) + _0x2d61ef(_0x353f4c._0xe4840e) + 'lementById' + '(\x27zIndexIn' + 'put\x27)?.val' + 'ue\x20||\x20\x27aut' + _0x2d61ef(0x741) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'offsetX:\x20M' + 'ath.round(' + _0x2d61ef(0x449) + 'etX\x20/\x202),\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20offs' + 'etY:\x20Math.' + 'round(edit' + 'orOffsetY\x20' + '/\x202),\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x3c4) + _0x2d61ef(_0x353f4c._0x149ca5) + 'saveTarget' + 'Sprite\x20&&\x20' + _0x2d61ef(0x9be) + _0x2d61ef(0x501) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20dat' + _0x2d61ef(_0x353f4c._0x4408f4) + _0x2d61ef(0xb2c) + 'e.src,\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20width:\x20' + _0x2d61ef(0x9be) + 'priteWidth' + ',\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20he' + 'ight:\x20char' + 'acterSprit' + _0x2d61ef(0xa03) + _0x2d61ef(_0x353f4c._0x80405f) + '\x20\x20\x20\x20}\x20:\x20nu' + _0x2d61ef(0x96) + _0x2d61ef(_0x353f4c._0x119d38) + ';\x0a\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20i' + _0x2d61ef(_0x353f4c._0x95e751) + 'opener\x20&&\x20' + 'window.ope' + 'ner.saveAn' + 'imationToL' + 'ibrary)\x20{\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20wind' + _0x2d61ef(0xa4c) + 'saveAnimat' + 'ionToLibra' + _0x2d61ef(_0x353f4c._0xa40963) + 'onData);\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20}\x0a\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20}\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20let\x20libra' + 'ryAnimatio' + _0x2d61ef(0x357) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20asyn' + _0x2d61ef(_0x353f4c._0x11da14) + '\x20openLibra' + 'ry()\x20{\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20const\x20m' + 'odal\x20=\x20doc' + 'ument.getE' + _0x2d61ef(_0x353f4c._0x4598b2) + '(\x27libraryM' + _0x2d61ef(_0x353f4c._0x34c8c3) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20modal.' + 'classList.' + 'add(\x27activ' + _0x2d61ef(0x366) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20if\x20(wind' + 'ow.opener\x20' + '&&\x20window.' + _0x2d61ef(0xb98) + 'dAnimation' + 'Library)\x20{' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20try' + '\x20{\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xa07) + _0x2d61ef(_0x353f4c._0x4b8fd1) + _0x2d61ef(0x3f3) + 'wait\x20windo') + ('w.opener.l' + _0x2d61ef(0x464) + _0x2d61ef(0x3c0) + _0x2d61ef(_0x353f4c._0x48239b) + _0x2d61ef(_0x353f4c._0x3d2fc5) + 'isplayLibr' + 'ary();\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20}\x20catch' + '\x20(error)\x20{' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20con' + 'sole.error' + '(\x27Error\x20lo' + 'ading\x20libr' + _0x2d61ef(_0x353f4c._0x1dc35e) + 'or);\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x53ad9c) + '\x20document.' + 'getElement' + _0x2d61ef(_0x353f4c._0x3b5774) + 'aryGrid\x27).' + _0x2d61ef(0xb1) + '=\x20\x27<div\x20cl' + 'ass=\x22libra' + 'ry-empty\x22>' + 'Error\x20load' + 'ing\x20librar' + 'y</div>\x27;\x0a' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20}}}\x0a' + _0x2d61ef(0x394) + 'closeLibra' + _0x2d61ef(_0x353f4c._0x2c3368) + '\x20const\x20mod' + 'al\x20=\x20docum' + 'ent.getEle' + _0x2d61ef(_0x353f4c._0x218f71) + 'libraryMod' + 'al\x27);\x0a\x20\x20\x20\x20' + 'modal.clas' + 'sList.remo' + _0x2d61ef(0x532) + _0x2d61ef(_0x353f4c._0x4f21c9) + _0x2d61ef(0xb8a) + 'layLibrary' + '()\x20{\x0a\x20\x20\x20\x20c' + 'onst\x20grid\x20' + '=\x20document' + '.getElemen' + 'tById(\x27lib' + 'raryGrid\x27)' + _0x2d61ef(0x211) + _0x2d61ef(0x5d9) + 't.keys(lib' + _0x2d61ef(_0x353f4c._0x3385ee) + 'ions).leng' + _0x2d61ef(0xb9c) + _0x2d61ef(_0x353f4c._0xeb5456) + 'return;\x0a\x20\x20' + '\x20\x20}\x0a\x20\x20\x20\x20\x0a\x20' + _0x2d61ef(_0x353f4c._0x2dda4b) + _0x2d61ef(_0x353f4c._0x187985) + '\x27\x27;\x0a\x20\x20\x20\x20\x0a\x20' + '\x20\x20\x20for\x20(co' + 'nst\x20[name,' + _0x2d61ef(0x13f) + '\x20of\x20Object' + '.entries(l' + 'ibraryAnim' + 'ations))\x20{' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20c' + 'onst\x20item\x20' + '=\x20document' + '.createEle' + 'ment(\x27div\x27' + _0x2d61ef(0x2ce) + '\x20item.clas' + _0x2d61ef(_0x353f4c._0x4468cd) + 'ibrary-ite' + _0x2d61ef(_0x353f4c._0x4a0248) + _0x2d61ef(_0x353f4c._0x38f569) + '\x20const\x20del' + 'eteBtn\x20=\x20d' + _0x2d61ef(0x5e1) + _0x2d61ef(_0x353f4c._0x222631) + 't(\x27div\x27);\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20de' + 'leteBtn.cl' + 'assName\x20=\x20' + '\x27library-i' + _0x2d61ef(_0x353f4c._0x16cf61) + '\x27;\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x9ad454) + '.innerHTML' + '\x20=\x20\x27✕\x27;\x0a\x20\x20' + _0x2d61ef(_0x353f4c._0x788ff) + 'teBtn.titl' + 'e\x20=\x20\x27Delet' + 'e\x20animatio') + ('n\x27;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20deleteBt' + 'n.onclick\x20' + '=\x20(e)\x20=>\x20{' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20e.stopP' + _0x2d61ef(0xa23) + '();\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x788ff) + _0x2d61ef(0x33d) + 'nFromLibra' + 'ry(name);\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20};' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20it' + 'em.onclick' + '\x20=\x20()\x20=>\x20l' + _0x2d61ef(0x464) + 'onFromLibr' + _0x2d61ef(_0x353f4c._0x3ae989) + 'animData);' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20co' + 'nst\x20previe' + _0x2d61ef(_0x353f4c._0x575368) + 'nt.createE' + 'lement(\x27di' + 'v\x27);\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20preview' + _0x2d61ef(0x77c) + '\x20=\x20\x27librar' + 'y-item-pre' + 'view\x27;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20const\x20' + 'canvas\x20=\x20d' + 'ocument.cr' + 'eateElemen' + _0x2d61ef(0x807) + _0x2d61ef(_0x353f4c._0x48239b) + _0x2d61ef(0xbf9) + 'dth\x20=\x20180;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20c' + _0x2d61ef(0xc97) + 'ht\x20=\x20100;\x0a' + _0x2d61ef(_0x353f4c._0x1cd4c7) + 'eview.appe' + 'ndChild(ca' + 'nvas);\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20const\x20' + _0x2d61ef(_0x353f4c._0x38a490) + '\x20document.' + 'createElem' + 'ent(\x27div\x27)' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + 'itemName.c' + 'lassName\x20=' + _0x2d61ef(0x81c) + _0x2d61ef(_0x353f4c._0x53a166) + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + 'itemName.t' + 'extContent' + '\x20=\x20name;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20cons' + 't\x20itemInfo' + '\x20=\x20documen' + 't.createEl' + 'ement(\x27div' + _0x2d61ef(0x522) + '\x20\x20itemInfo' + '.className' + '\x20=\x20\x27librar' + 'y-item-inf' + 'o\x27;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20itemInfo' + _0x2d61ef(0xa70) + 'nt\x20=\x20animD' + _0x2d61ef(0x2fa) + '\x20\x27x\x27\x20+\x20ani' + _0x2d61ef(_0x353f4c._0x312c90) + _0x2d61ef(0x9d2) + _0x2d61ef(0x8f1) + 'ta.fps\x20+\x20\x27' + _0x2d61ef(0xa3f) + '\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20item.a' + 'ppendChild' + '(deleteBtn' + ');\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xd14) + 'ndChild(pr' + 'eview);\x0a\x20\x20' + _0x2d61ef(0xb0e) + '.appendChi' + _0x2d61ef(_0x353f4c._0x4ec8b3) + _0x2d61ef(0x1b7) + '\x20\x20item.app' + 'endChild(i') + (_0x2d61ef(0x26e) + '\x20\x20\x20\x20\x20\x20\x20\x20gr' + 'id.appendC' + 'hild(item)' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20s' + 'tartLibrar' + _0x2d61ef(_0x353f4c._0x3d0bf8) + 'anvas,\x20ani' + 'mData);\x0a\x20\x20' + '\x20\x20}\x0a}\x0a\x0afun' + 'ction\x20dele' + 'teAnimatio' + 'nFromLibra' + 'ry(animati' + 'onName)\x20{\x0a' + '\x20\x20\x20\x20delete' + '\x20libraryAn' + 'imations[a' + 'nimationNa' + 'me];\x0a\x20\x20\x20\x20\x0a' + _0x2d61ef(_0x353f4c._0x119649) + 'ndow.opene' + _0x2d61ef(_0x353f4c._0x40b2e9) + 'w.opener.d' + 'eleteAnima' + 'tionFromLi' + 'brary)\x20{\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20win' + 'dow.opener' + _0x2d61ef(0x7bd) + 'mationFrom' + _0x2d61ef(0xa05) + 'imationNam' + 'e);\x0a\x20\x20\x20\x20}\x0a' + '\x20\x20\x20\x20displa' + 'yLibrary()' + ';\x0a}\x0a\x0afunct' + _0x2d61ef(_0x353f4c._0x198806) + 'ibraryPrev' + 'iew(canvas' + ',\x20animData' + ')\x20{\x0a\x20\x20\x20\x20co' + _0x2d61ef(_0x353f4c._0x58da79) + 'canvas.get' + _0x2d61ef(_0x353f4c._0x28bc9a) + 'd\x27);\x0a\x20\x20\x20\x20c' + 'tx.imageSm' + 'oothingEna' + _0x2d61ef(0x9e3) + _0x2d61ef(0x1e1) + '\x20\x20\x20let\x20cha' + _0x2d61ef(0x2e9) + '=\x20null;\x0a\x20\x20' + _0x2d61ef(_0x353f4c._0xbca749) + _0x2d61ef(0x920) + 'cterSprite' + '\x20&&\x20animDa' + _0x2d61ef(0x973) + _0x2d61ef(_0x353f4c._0x2fe3b9) + 'ataUrl)\x20{\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20ch' + 'aracterImg' + '\x20=\x20new\x20Ima' + 'ge();\x0a\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x56489f) + 'terImg.src' + '\x20=\x20animDat' + 'a.characte' + 'rSprite.da' + _0x2d61ef(_0x353f4c._0x16e1fc) + _0x2d61ef(0x1c9) + '\x20\x20const\x20im' + 'g\x20=\x20new\x20Im' + 'age();\x0a\x20\x20\x20' + '\x20img.onloa' + 'd\x20=\x20functi' + 'on()\x20{\x0a\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x33fa9c) + 'rame\x20=\x200;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20co' + 'nst\x20totalF' + 'rames\x20=\x20an' + 'imData.row' + 's\x20*\x20animDa' + 'ta.columns' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + 'const\x20fram' + _0x2d61ef(0x4b3) + 'mg.width\x20/' + _0x2d61ef(0x6f6) + 'columns;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20con' + 'st\x20frameHe' + 'ight\x20=\x20img' + '.height\x20/\x20' + _0x2d61ef(_0x353f4c._0x56863b) + _0x2d61ef(_0x353f4c._0x6dc070) + _0x2d61ef(0x82b) + '\x20\x20const\x20pr') + ('eviewScale' + '\x20=\x20(animDa' + 'ta.scale\x20/' + _0x2d61ef(_0x353f4c._0x49fc09) + _0x2d61ef(_0x353f4c._0x3e113e) + '\x20const\x20dra' + _0x2d61ef(_0x353f4c._0x81c963) + 'rameWidth\x20' + _0x2d61ef(_0x353f4c._0xe9b61e) + 'cale;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20const\x20' + 'drawHeight' + '\x20=\x20frameHe' + 'ight\x20*\x20pre' + 'viewScale;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20le' + 't\x20randomFl' + 'ipX\x20=\x20fals' + 'e;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20let\x20rando' + _0x2d61ef(_0x353f4c._0x241062) + _0x2d61ef(0x2f7) + _0x2d61ef(_0x353f4c._0x5000b8) + _0x2d61ef(_0x353f4c._0x5b1a32) + 'on\x20=\x200;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20let\x20' + _0x2d61ef(_0x353f4c._0x266a7d) + 'ter\x20=\x200;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20func' + _0x2d61ef(_0x353f4c._0x4991a7) + 'te()\x20{\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + 'tx.clearRe' + _0x2d61ef(_0x353f4c._0x1e267e) + _0x2d61ef(0xa2d) + 'h,\x20canvas.' + 'height);\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20random' + _0x2d61ef(_0x353f4c._0x3ef322) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x75b) + 'domCounter' + _0x2d61ef(_0x353f4c._0x36fffd) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20rand' + _0x2d61ef(_0x353f4c._0x4e1798) + '=\x200;\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x23af8e) + _0x2d61ef(_0x353f4c._0x37920a) + 'ata.random' + _0x2d61ef(0x79a) + 'domFlipX\x20=' + '\x20Math.rand' + 'om()\x20<\x200.5' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x22ad62) + _0x2d61ef(_0x353f4c._0x32d662) + '.randomFli' + _0x2d61ef(0x499) + _0x2d61ef(0xbef) + _0x2d61ef(_0x353f4c._0x10ce66) + ')\x20<\x200.5;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1ca654) + 'nimData.ra' + 'ndomRotati' + 'on)\x20random' + _0x2d61ef(_0x353f4c._0x189359) + '\x20Math.rand' + _0x2d61ef(_0x353f4c._0xd87c73) + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xb08) + _0x2d61ef(_0x353f4c._0x4be8c6) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20let\x20charC' + 'enterX\x20=\x20c' + 'anvas.widt' + 'h\x20/\x202;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20l' + _0x2d61ef(_0x353f4c._0x1612a8) + 'terY\x20=\x20can' + 'vas.height' + '\x20/\x202;\x0a\x20\x20\x20\x20' + _0x2d61ef(0x8a9) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20if\x20(chara' + 'cterImg\x20&&' + '\x20character' + 'Img.comple' + _0x2d61ef(_0x353f4c._0x380e65) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20const\x20ch' + _0x2d61ef(0xcf2) + '0.6;\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x58c60d)) + (_0x2d61ef(_0x353f4c._0x229ac8) + _0x2d61ef(0x428) + 'aracterSpr' + 'ite.width\x20' + '*\x20charScal' + 'e;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + 'onst\x20charH' + _0x2d61ef(_0x353f4c._0x37bd87) + 'imData.cha' + _0x2d61ef(_0x353f4c._0x181f22) + 'te.height\x20' + '*\x20charScal' + 'e;\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x791cd0) + 'onst\x20charX' + '\x20=\x20(canvas' + _0x2d61ef(_0x353f4c._0x262288) + _0x2d61ef(0x38a) + '/\x202;\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20const\x20cha' + 'rY\x20=\x20(canv' + 'as.height\x20' + _0x2d61ef(0x2b1) + 'ht)\x20/\x202;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x28d) + _0x2d61ef(_0x353f4c._0x545f1c) + '\x20\x20ctx.draw' + 'Image(char' + _0x2d61ef(_0x353f4c._0x1d0d32) + 'charX,\x20cha' + 'rY,\x20charWi' + 'dth,\x20charH' + 'eight);\x0a\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0x216) + _0x2d61ef(_0x353f4c._0x1e587d) + '\x20charCente' + _0x2d61ef(0x855) + '\x20+\x20charWid' + 'th\x20/\x202;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20charCe' + 'nterY\x20=\x20ch' + 'arY\x20+\x20char' + _0x2d61ef(0x767) + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xb08) + '\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20let\x20displ' + 'ayFrame\x20=\x20' + _0x2d61ef(_0x353f4c._0x142bd7) + 'layInRever' + _0x2d61ef(_0x353f4c._0x3bf52b) + 'lFrames\x20-\x20' + '1\x20-\x20frame)' + '\x20:\x20frame;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20const\x20co' + 'l\x20=\x20displa' + 'yFrame\x20%\x20a' + 'nimData.co' + _0x2d61ef(_0x353f4c._0x383a9c) + _0x2d61ef(0x7ff) + 'onst\x20row\x20=' + '\x20Math.floo' + 'r(displayF' + _0x2d61ef(0x242) + 'mData.colu' + 'mns);\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20' + _0x2d61ef(_0x353f4c._0x3c1ca8) + '\x20const\x20pre' + 'viewOffset' + 'X\x20=\x20(animD' + 'ata.offset' + 'X\x20*\x202)\x20*\x200' + '.6;\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x8d2) + _0x2d61ef(_0x353f4c._0x34bfa5) + 'ffsetY\x20=\x20(' + _0x2d61ef(_0x353f4c._0x271765) + 'ffsetY\x20*\x202' + ')\x20*\x200.6;\x0a\x20' + _0x2d61ef(_0x353f4c._0xabb7bb) + _0x2d61ef(0x2ca) + _0x2d61ef(_0x353f4c._0x2d9212) + _0x2d61ef(_0x353f4c._0x1ae1b3) + 'arCenterX\x20' + '+\x20previewO' + 'ffsetX;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x3dd) + _0x2d61ef(_0x353f4c._0x4a9322) + _0x2d61ef(_0x353f4c._0x3be30b) + _0x2d61ef(0x65c) + 'tY;\x0a\x20\x20\x20\x20\x20\x20') + (_0x2d61ef(_0x353f4c._0x5a1cfb) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + _0x2d61ef(_0x353f4c._0x29ea24) + _0x2d61ef(_0x353f4c._0x4cff4d) + _0x2d61ef(_0x353f4c._0x116685) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20const\x20fin' + 'alHeight\x20=' + '\x20drawHeigh' + 't;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20const' + '\x20finalOpac' + 'ity\x20=\x20anim' + _0x2d61ef(_0x353f4c._0x16820c) + _0x2d61ef(0x61a) + _0x2d61ef(_0x353f4c._0x15e80e) + '\x20\x20\x20const\x20h' + 'ue\x20=\x20animD' + _0x2d61ef(_0x353f4c._0x2208c7) + '\x200;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20i' + 'f\x20(animDat' + _0x2d61ef(_0x353f4c._0x2b0c6d) + 'ect)\x20{\x0a\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x5ddfcf) + _0x2d61ef(_0x353f4c._0x3ee2fc) + _0x2d61ef(_0x353f4c._0xee68f6) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20ctx.globa' + 'lAlpha\x20=\x20(' + '(animData.' + _0x2d61ef(0x5cb) + _0x2d61ef(_0x353f4c._0x385d92) + _0x2d61ef(0xcc5) + 'nalOpacity' + '\x20/\x20255);\x0a\x20' + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x531f11) + 'lobalCompo' + _0x2d61ef(_0x353f4c._0x656053) + 'ion\x20=\x20\x27scr' + 'een\x27;\x0a\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x6ae1b4) + _0x2d61ef(_0x353f4c._0xd437d3) + 'slate(anim' + 'X,\x20animY);' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xbc1) + 'finalRotat' + 'ion\x20=\x20anim' + 'Data.rando' + 'mRotation\x20' + '?\x20randomRo' + 'tation\x20:\x20(' + 'animData.r' + 'otation\x20||' + '\x200);\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20if\x20(final' + 'Rotation\x20!' + '==\x200)\x20{\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20ct' + 'x.rotate(f' + 'inalRotati' + 'on\x20*\x20Math.' + 'PI\x20/\x20180);' + _0x2d61ef(0xa28) + '\x20\x20\x20\x20\x20\x20\x20}\x0a\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x2fc) + 'nalFlipX\x20=' + '\x20animData.' + 'randomFlip' + 'X\x20?\x20random' + 'FlipX\x20:\x20(a' + _0x2d61ef(0xc9a) + _0x2d61ef(0x4f9) + 'e);\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x435943) + 'const\x20fina' + 'lFlipY\x20=\x20a' + 'nimData.ra' + 'ndomFlipY\x20' + '?\x20randomFl' + 'ipY\x20:\x20(ani' + 'mData.flip' + 'Y\x20||\x20false' + ');\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + _0x2d61ef(_0x353f4c._0x2f977f) + 'inalFlipX\x20' + _0x2d61ef(0x91e) + _0x2d61ef(0x116) + '\x20?\x20-1\x20:\x201)') + (';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20const' + '\x20bloomCanv' + 'as\x20=\x20docum' + 'ent.create' + 'Element(\x27c' + 'anvas\x27);\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20bloom' + 'Canvas.wid' + 'th\x20=\x20frame' + 'Width;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20bloomCa' + 'nvas.heigh' + 't\x20=\x20frameH' + _0x2d61ef(0x287) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1335e6) + 'loomCtx\x20=\x20' + _0x2d61ef(_0x353f4c._0xb74cc) + _0x2d61ef(0xaa1) + _0x2d61ef(0x1f1) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20bloo' + _0x2d61ef(_0x353f4c._0x1381ac) + 'mage(img,\x20' + 'col\x20*\x20fram' + 'eWidth,\x20ro' + _0x2d61ef(_0x353f4c._0x35a36d) + 'eight,\x20fra' + 'meWidth,\x20f' + 'rameHeight' + ',\x200,\x200,\x20fr' + 'ameWidth,\x20' + 'frameHeigh' + _0x2d61ef(0x9a) + _0x2d61ef(0xacf) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xc3b) + '(hue\x20!==\x200' + ')\x20{\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x58eef7) + 'imageData\x20' + _0x2d61ef(0x4a6) + '.getImageD' + 'ata(0,\x200,\x20' + 'frameWidth' + ',\x20frameHei' + _0x2d61ef(_0x353f4c._0x1db093) + _0x2d61ef(_0x353f4c._0x57d28c) + '\x20\x20\x20\x20\x20\x20cons' + 't\x20data\x20=\x20i' + _0x2d61ef(_0x353f4c._0x17f22a) + 'ata;\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x452fd3) + _0x2d61ef(_0x353f4c._0x2d2508) + '\x20hueRadian' + 's\x20=\x20hue\x20*\x20' + 'Math.PI\x20/\x20' + '180;\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x5afb09) + _0x2d61ef(_0x353f4c._0x2044fd) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20for\x20' + '(let\x20i\x20=\x200' + _0x2d61ef(_0x353f4c._0x2cea04) + '.length;\x20i' + '\x20+=\x204)\x20{\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20let\x20r\x20=' + _0x2d61ef(0x92a) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x326c02) + _0x2d61ef(0x710) + '=\x20data[i\x20+' + '\x201];\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20l' + 'et\x20b\x20=\x20dat' + 'a[i\x20+\x202];\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + 'onst\x20max\x20=' + '\x20Math.max(' + 'r,\x20g,\x20b)\x20/' + _0x2d61ef(0x53a) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'const\x20min\x20' + '=\x20Math.min' + '(r,\x20g,\x20b)\x20' + '/\x20255;\x0a\x20\x20\x20') + ('\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x7e20ec) + '\x20l\x20=\x20(max\x20' + '+\x20min)\x20/\x202' + _0x2d61ef(0x306) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20if\x20(max\x20=' + _0x2d61ef(_0x353f4c._0x199ec3) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20h\x20' + '=\x20s\x20=\x200;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3c931d) + _0x2d61ef(_0x353f4c._0x3b11f9) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'const\x20d\x20=\x20' + 'max\x20-\x20min;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20s' + _0x2d61ef(0x9b1) + _0x2d61ef(0x3c1) + '-\x20max\x20-\x20mi' + 'n)\x20:\x20d\x20/\x20(' + _0x2d61ef(_0x353f4c._0x4402a0) + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3cc9b8) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x64f) + _0x2d61ef(_0x353f4c._0xd0d12) + ')\x20{\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xa88) + '\x20r\x20/\x20255:\x0a' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3cc9b8) + '\x20\x20\x20\x20\x20\x20h\x20=\x20' + '((g\x20/\x20255\x20' + '-\x20b\x20/\x20255)' + _0x2d61ef(_0x353f4c._0x5aa016) + _0x2d61ef(_0x353f4c._0x461760) + _0x2d61ef(0x75c) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x419) + _0x2d61ef(0x306) + _0x2d61ef(_0x353f4c._0x169fbe) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20case\x20g' + '\x20/\x20255:\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20h\x20=\x20((' + 'b\x20/\x20255\x20-\x20' + 'r\x20/\x20255)\x20/' + _0x2d61ef(_0x353f4c._0x5bd706) + '6;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x527bd7) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20b' + _0x2d61ef(_0x353f4c._0x515270) + _0x2d61ef(_0x353f4c._0x44991c) + _0x2d61ef(_0x353f4c._0x41b63d) + '\x20\x20\x20\x20\x20\x20\x20\x20ca' + 'se\x20b\x20/\x20255' + ':\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20h\x20' + '=\x20((r\x20/\x2025' + '5\x20-\x20g\x20/\x2025' + '5)\x20/\x20d\x20+\x204' + _0x2d61ef(_0x353f4c._0x77680a) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20break;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20}\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x146aaa) + _0x2d61ef(_0x353f4c._0x276e08) + _0x2d61ef(_0x353f4c._0x81a0c7) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xa28) + _0x2d61ef(_0x353f4c._0x3b272b)) + ('\x20\x20\x20\x20\x20h\x20=\x20(' + 'h\x20+\x20hueRad' + 'ians\x20/\x20(2\x20' + '*\x20Math.PI)' + ')\x20%\x201;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x550eb4) + '\x20if\x20(h\x20<\x200' + ')\x20h\x20+=\x201;\x0a' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20l' + 'et\x20r2,\x20g2,' + '\x20b2;\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1cae0a) + 'f\x20(s\x20===\x200' + ')\x20{\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x545f1c) + _0x2d61ef(_0x353f4c._0x218903) + '\x20\x20r2\x20=\x20g2\x20' + '=\x20b2\x20=\x20l;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x4e50a8) + _0x2d61ef(_0x353f4c._0x13c8e1) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20const\x20hue' + _0x2d61ef(_0x353f4c._0x415200) + '\x20q,\x20t)\x20=>\x20' + '{\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x24bea1) + '<\x200)\x20t\x20+=\x20' + _0x2d61ef(_0x353f4c._0x439c10) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20if\x20(t' + '\x20>\x201)\x20t\x20-=' + '\x201;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1b0ff3) + 't\x20<\x201/6)\x20r' + 'eturn\x20p\x20+\x20' + _0x2d61ef(0x8fd) + '6\x20*\x20t;\x0a\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x452fd3) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xa18) + 'f\x20(t\x20<\x201/2' + _0x2d61ef(0x763) + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20if\x20(t\x20' + _0x2d61ef(_0x353f4c._0x53fed2) + 'urn\x20p\x20+\x20(q' + '\x20-\x20p)\x20*\x20(2' + '/3\x20-\x20t)\x20*\x20' + '6;\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x4867ba) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20retur' + _0x2d61ef(_0x353f4c._0x3d0425) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1643d5) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20const\x20q' + '\x20=\x20l\x20<\x200.5' + '\x20?\x20l\x20*\x20(1\x20' + _0x2d61ef(_0x353f4c._0x18db10) + '\x20s\x20-\x20l\x20*\x20s' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x5a5f36) + _0x2d61ef(_0x353f4c._0x1973c6) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20r' + _0x2d61ef(0x80d) + _0x2d61ef(0x155) + '+\x201/3);\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3755f2) + '\x20\x20\x20\x20\x20\x20g2\x20=' + _0x2d61ef(_0x353f4c._0x5f27c7) + ',\x20q,\x20h);\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x326c02)) + (_0x2d61ef(_0x353f4c._0x491c6f) + '=\x20hue2rgb(' + 'p,\x20q,\x20h\x20-\x20' + _0x2d61ef(0x62b) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '}\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x5a1956) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0xb47f26) + '\x20data[i]\x20=' + _0x2d61ef(_0x353f4c._0x279f43) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x326f71) + _0x2d61ef(_0x353f4c._0x1db05d) + _0x2d61ef(0x63a) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20data[i\x20' + '+\x202]\x20=\x20b2\x20' + _0x2d61ef(0x12d) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20}\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0xb681bf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x612) + _0x2d61ef(_0x353f4c._0x1179fc) + _0x2d61ef(0x54a) + 'a,\x200,\x200);\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20}\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x4ed) + 'rCanvas\x20=\x20' + 'document.c' + 'reateEleme' + 'nt(\x27canvas' + '\x27);\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'const\x20blur' + '\x20=\x20animDat' + 'a.blurAmou' + 'nt\x20||\x2015;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20blur' + 'Canvas.wid' + _0x2d61ef(0xc03) + _0x2d61ef(_0x353f4c._0xb52604) + _0x2d61ef(_0x353f4c._0x45d2dd) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20blurCa' + 'nvas.heigh' + _0x2d61ef(0xa3e) + 'eight\x20+\x20bl' + _0x2d61ef(_0x353f4c._0x3cea60) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x2d9212) + 'blurCtx\x20=\x20' + 'blurCanvas' + '.getContex' + 't(\x272d\x27);\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20blurC' + 'tx.filter\x20' + '=\x20\x27blur(\x27\x20' + '+\x20blur\x20+\x20\x27' + _0x2d61ef(_0x353f4c._0xe89a9b) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20blurCtx.' + 'drawImage(' + _0x2d61ef(0xced) + _0x2d61ef(_0x353f4c._0x5a9236) + '2,\x20blur\x20*\x20' + _0x2d61ef(_0x353f4c._0x2f8000) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20ctx' + '.drawImage' + _0x2d61ef(0xbd3) + 's,\x20-finalW' + 'idth\x20/\x202\x20-' + '\x20blur\x20*\x202,' + '\x20-finalHei' + 'ght\x20/\x202\x20-\x20' + _0x2d61ef(_0x353f4c._0x369895) + _0x2d61ef(0x3f2) + '\x20+\x20blur\x20*\x20' + '4,\x20finalHe' + 'ight\x20+\x20blu' + _0x2d61ef(0x7aa) + _0x2d61ef(_0x353f4c._0xb47f26) + '\x20\x20\x20\x20ctx.re' + 'store();\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20') + ('\x20}\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20ct' + 'x.save();\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xa68) + _0x2d61ef(0x983) + 'finalOpaci' + 'ty\x20/\x20255;\x0a' + _0x2d61ef(_0x353f4c._0x329269) + _0x2d61ef(_0x353f4c._0x38f569) + '\x20\x20\x20\x20\x20const' + _0x2d61ef(_0x353f4c._0x40dd75) + 's\x20=\x20{\x0a\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x27Normal\x27' + _0x2d61ef(_0x353f4c._0x347849) + _0x2d61ef(0x9e0) + _0x2d61ef(_0x353f4c._0x48f62f) + '\x20\x20\x20\x27Screen' + '\x27:\x20\x27screen' + _0x2d61ef(0x7e) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x27' + 'Add\x27:\x20\x27lig' + _0x2d61ef(_0x353f4c._0x1154dc) + _0x2d61ef(_0x353f4c._0x216288) + _0x2d61ef(0xa65) + 'ly\x27:\x20\x27mult' + 'iply\x27\x0a\x20\x20\x20\x20' + _0x2d61ef(0x1e0) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x501a79) + 'balComposi' + 'teOperatio' + _0x2d61ef(0xa92) + 'odes[animD' + _0x2d61ef(_0x353f4c._0x63b0e1) + 'ode]\x20||\x20\x27s' + _0x2d61ef(_0x353f4c._0x43d2f6) + '\x27;\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x39b2af) + '\x20\x20\x20\x20\x20\x20\x20\x20ct' + 'x.translat' + _0x2d61ef(_0x353f4c._0x5e0d85) + 'nimY);\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20const\x20fi' + 'nalRotatio' + 'n\x20=\x20animDa' + 'ta.randomR' + _0x2d61ef(0x8fe) + _0x2d61ef(0x2db) + 'tion\x20:\x20(an' + 'imData.rot' + 'ation\x20||\x200' + ');\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x7f2) + 'inalRotati' + 'on\x20!==\x200)\x20' + '{\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20ct' + 'x.rotate(f' + 'inalRotati' + 'on\x20*\x20Math.' + _0x2d61ef(_0x353f4c._0xa22bb8) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20}\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x55d756) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x530) + _0x2d61ef(_0x353f4c._0x380c31) + 'nimData.ra' + 'ndomFlipX\x20' + '?\x20randomFl' + 'ipX\x20:\x20(ani' + _0x2d61ef(0x89e) + '\x20||\x20false)' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20const\x20' + _0x2d61ef(_0x353f4c._0x489979) + _0x2d61ef(_0x353f4c._0x2ebfe7) + 'a.randomFl' + _0x2d61ef(_0x353f4c._0x308890) + 'omFlipY\x20:\x20' + '(animData.' + 'flipY\x20||\x20f' + _0x2d61ef(0x8be) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20c' + 'tx.scale(f' + _0x2d61ef(0x927) + _0x2d61ef(0x91e) + 'finalFlipY' + _0x2d61ef(_0x353f4c._0x44a3f7) + _0x2d61ef(_0x353f4c._0x4b94bc) + '\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20if\x20' + _0x2d61ef(_0x353f4c._0x54b302) + ')\x20{\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf)) + (_0x2d61ef(0x1b1) + 'Canvas\x20=\x20d' + 'ocument.cr' + 'eateElemen' + _0x2d61ef(_0x353f4c._0x4fb9c9) + ');\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20t' + _0x2d61ef(_0x353f4c._0x208159) + 'width\x20=\x20fr' + _0x2d61ef(0xcfa) + _0x2d61ef(0xacf) + _0x2d61ef(0xc44) + 'Canvas.hei' + _0x2d61ef(_0x353f4c._0x3a551f) + 'eHeight;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20const' + '\x20tempCtx\x20=' + '\x20tempCanva' + 's.getConte' + _0x2d61ef(_0x353f4c._0x5c6bfa) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20temp' + 'Ctx.drawIm' + 'age(img,\x20c' + 'ol\x20*\x20frame' + 'Width,\x20row' + '\x20*\x20frameHe' + _0x2d61ef(_0x353f4c._0x30db26) + 'eWidth,\x20fr' + _0x2d61ef(0xc3e) + '\x200,\x200,\x20fra' + 'meWidth,\x20f' + _0x2d61ef(_0x353f4c._0x3a91cf) + ');\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20cons' + 't\x20imageDat' + 'a\x20=\x20tempCt' + _0x2d61ef(0x36d) + 'Data(0,\x200,' + '\x20frameWidt' + 'h,\x20frameHe' + _0x2d61ef(_0x353f4c._0x4ed096) + _0x2d61ef(0xacf) + '\x20\x20\x20const\x20d' + _0x2d61ef(_0x353f4c._0xbaa63b) + 'eData.data' + _0x2d61ef(_0x353f4c._0x1d6688) + _0x2d61ef(_0x353f4c._0xbc8388) + 'nst\x20hueRad' + 'ians\x20=\x20hue' + '\x20*\x20Math.PI' + _0x2d61ef(0xbb3) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20for\x20(let\x20' + _0x2d61ef(_0x353f4c._0x312246) + _0x2d61ef(0xc0c) + _0x2d61ef(_0x353f4c._0x228a78) + _0x2d61ef(0x903) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20let\x20r\x20' + '=\x20data[i];' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xac6) + 'ata[i\x20+\x201]' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20let\x20b\x20=\x20' + _0x2d61ef(0x25c) + '];\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x40b997) + 'max\x20=\x20Math' + '.max(r,\x20g,' + '\x20b)\x20/\x20255;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20const\x20min' + '\x20=\x20Math.mi' + 'n(r,\x20g,\x20b)' + _0x2d61ef(_0x353f4c._0x56a053) + _0x2d61ef(_0x353f4c._0x370019) + '\x20\x20\x20\x20\x20\x20\x20\x20le' + 't\x20h,\x20s,\x20l\x20' + _0x2d61ef(0x940) + 'in)\x20/\x202;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xab9) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x138) + '=\x20min)\x20{\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20') + ('\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20h\x20=\x20s\x20=' + '\x200;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3891c8) + _0x2d61ef(0x520) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20con' + _0x2d61ef(_0x353f4c._0x49df27) + '\x20-\x20min;\x0a\x20\x20' + _0x2d61ef(_0x353f4c._0x3a7413) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20s\x20=\x20l\x20>\x20' + _0x2d61ef(0x72b) + '(2\x20-\x20max\x20-' + '\x20min)\x20:\x20d\x20' + '/\x20(max\x20+\x20m' + _0x2d61ef(_0x353f4c._0x2446f1) + _0x2d61ef(_0x353f4c._0x326c02) + _0x2d61ef(_0x353f4c._0xb681bf) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xa9b) + '\x20(max)\x20{\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x23c390) + '\x20\x20\x20\x20\x20\x20\x20cas' + 'e\x20r\x20/\x20255:' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20h\x20=\x20((g' + '\x20/\x20255\x20-\x20b' + '\x20/\x20255)\x20/\x20' + 'd\x20+\x20(g\x20<\x20b' + _0x2d61ef(_0x353f4c._0x258116) + '\x20/\x206;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20br' + 'eak;\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20case\x20g\x20' + '/\x20255:\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20h' + '\x20=\x20((b\x20/\x202' + _0x2d61ef(_0x353f4c._0x4810fc) + '55)\x20/\x20d\x20+\x20' + _0x2d61ef(0x6b3) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x101f09) + _0x2d61ef(_0x353f4c._0x27cd68) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20case\x20' + 'b\x20/\x20255:\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20h\x20=\x20((r\x20/' + '\x20255\x20-\x20g\x20/' + _0x2d61ef(0x416) + '+\x204)\x20/\x206;\x0a' + _0x2d61ef(_0x353f4c._0x218903) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x14fc9d) + _0x2d61ef(_0x353f4c._0x5dafe6) + _0x2d61ef(_0x353f4c._0x2fb674) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20}\x0a\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x31fcf8) + '\x20\x20\x20\x20\x20}\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x677) + '=\x20(h\x20+\x20hue' + 'Radians\x20/\x20' + '(2\x20*\x20Math.' + _0x2d61ef(0x996) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'if\x20(h\x20<\x200)' + _0x2d61ef(0x239) + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0xb681bf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x213409) + _0x2d61ef(0xaa7) + ',\x20b2;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20if\x20(' + 's\x20===\x200)\x20{' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20r2\x20=\x20') + ('g2\x20=\x20b2\x20=\x20' + 'l;\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xa5) + _0x2d61ef(0x932) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20cons' + 't\x20hue2rgb\x20' + _0x2d61ef(_0x353f4c._0x15345a) + ')\x20=>\x20{\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x213409) + '\x20\x20\x20\x20\x20if\x20(t' + '\x20<\x200)\x20t\x20+=' + '\x201;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x2bce8a) + '\x20\x20if\x20(t\x20>\x20' + '1)\x20t\x20-=\x201;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xa18) + 'f\x20(t\x20<\x201/6' + ')\x20return\x20p' + '\x20+\x20(q\x20-\x20p)' + '\x20*\x206\x20*\x20t;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x5abae0) + '\x20\x20\x20\x20\x20\x20\x20\x20if' + '\x20(t\x20<\x201/2)' + _0x2d61ef(_0x353f4c._0x10128d) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x570bb5) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20i' + 'f\x20(t\x20<\x202/3' + ')\x20return\x20p' + '\x20+\x20(q\x20-\x20p)' + '\x20*\x20(2/3\x20-\x20' + _0x2d61ef(0x1d1) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3a9a6d) + '\x20\x20\x20\x20\x20\x20retu' + 'rn\x20p;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x52126f) + '};\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xa04) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20const\x20q\x20' + _0x2d61ef(_0x353f4c._0xebde5d) + _0x2d61ef(_0x353f4c._0x1218f3) + '\x20s)\x20:\x20l\x20+\x20' + 's\x20-\x20l\x20*\x20s;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0x744) + _0x2d61ef(0xd31) + _0x2d61ef(_0x353f4c._0x461294) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x335) + _0x2d61ef(_0x353f4c._0x4e3dbc) + '\x20+\x201/3);\x0a\x20' + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x218903) + '\x20\x20\x20g2\x20=\x20hu' + 'e2rgb(p,\x20q' + ',\x20h);\x0a\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0xacf) + 'b2\x20=\x20hue2r' + 'gb(p,\x20q,\x20h' + _0x2d61ef(0x222) + _0x2d61ef(_0x353f4c._0x4a8533) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20}' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1a2874) + _0x2d61ef(_0x353f4c._0x115ab5) + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20data[i\x20+' + '\x201]\x20=\x20g2\x20*' + '\x20255;\x0a\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20data' + '[i\x20+\x202]\x20=\x20' + 'b2\x20*\x20255;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20}\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20tempCtx.p' + 'utImageDat' + 'a(imageDat') + ('a,\x200,\x200);\x0a' + _0x2d61ef(_0x353f4c._0x52baef) + _0x2d61ef(0xae1) + _0x2d61ef(_0x353f4c._0x223137) + 'tempCanvas' + ',\x20-finalWi' + 'dth\x20/\x202,\x20-' + 'finalHeigh' + 't\x20/\x202,\x20fin' + 'alWidth,\x20f' + 'inalHeight' + _0x2d61ef(_0x353f4c._0xe2d337) + '\x20\x20\x20\x20\x20}\x20els' + 'e\x20{\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'ctx.drawIm' + 'age(img,\x20c' + _0x2d61ef(_0x353f4c._0x27e01d) + 'Width,\x20row' + '\x20*\x20frameHe' + 'ight,\x20fram' + 'eWidth,\x20fr' + _0x2d61ef(0xc3e) + _0x2d61ef(0x825) + _0x2d61ef(_0x353f4c._0x3074e8) + 'inalHeight' + _0x2d61ef(_0x353f4c._0x212a66) + _0x2d61ef(_0x353f4c._0x34cf90) + 'nalHeight)' + _0x2d61ef(_0x353f4c._0x299bc4) + _0x2d61ef(0xb08) + '\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20' + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x1e7f91) + 're();\x0a\x20\x20\x20\x20' + _0x2d61ef(0x8a9) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20frame\x20=\x20(' + _0x2d61ef(0x232) + '\x20%\x20totalFr' + _0x2d61ef(0xd42) + '\x20\x20\x20\x20}\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20setInte' + _0x2d61ef(_0x353f4c._0x1f68a0) + _0x2d61ef(0xbee) + '\x20Math.min(' + 'animData.f' + 'ps,\x2030));\x0a' + _0x2d61ef(_0x353f4c._0x6d33ee) + '\x20\x0a\x20\x20\x20\x20if\x20(' + 'window.ope' + 'ner\x20&&\x20win' + 'dow.opener' + '.ImageMana' + _0x2d61ef(0x40b) + _0x2d61ef(_0x353f4c._0x3e7999) + '\x20tempBitma' + 'p\x20=\x20window' + _0x2d61ef(0x7a0) + 'ageManager' + '.loadPictu' + 're(animDat' + _0x2d61ef(_0x353f4c._0x5344b5) + 'eetFile);\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20if' + '\x20(tempBitm' + _0x2d61ef(_0x353f4c._0x1f7879) + 'Bitmap._ur' + 'l)\x20{\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20img' + _0x2d61ef(_0x353f4c._0x4c5f50) + _0x2d61ef(_0x353f4c._0x33bd40) + _0x2d61ef(_0x353f4c._0x5c0dbe) + '\x20\x20}\x0a\x20\x20\x20\x20}\x0a' + '}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20f' + _0x2d61ef(_0x353f4c._0x2b4a50) + _0x2d61ef(0xc85) + _0x2d61ef(0x4b6) + _0x2d61ef(0x195) + 'nimData)\x20{' + _0x2d61ef(_0x353f4c._0x45b655) + _0x2d61ef(_0x353f4c._0x52e414) + '\x20closeLibr' + _0x2d61ef(_0x353f4c._0x181b8b) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20con' + 'st\x20img\x20=\x20n' + 'ew\x20Image()' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20img.onlo' + 'ad\x20=\x20funct' + 'ion()\x20{\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20currentS' + 'pritesheet' + '\x20=\x20img;\x0a\x20\x20') + ('\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x5e3) + '.getElemen' + _0x2d61ef(_0x353f4c._0x47c9ac) + 'mationName' + _0x2d61ef(_0x353f4c._0x4a1136) + 'lue\x20=\x20name' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20docu' + 'ment.getEl' + 'ementById(' + '\x27rowInput\x27' + ').value\x20=\x20' + _0x2d61ef(_0x353f4c._0xbdcb07) + 'ows;\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20d' + _0x2d61ef(_0x353f4c._0x423d4a) + 'tElementBy' + 'Id(\x27column' + 'Input\x27).va' + _0x2d61ef(_0x353f4c._0x1e16f4) + 'Data.colum' + 'ns;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20do' + _0x2d61ef(_0x353f4c._0x36710c) + _0x2d61ef(0x6d8) + 'd(\x27fpsInpu' + 't\x27).value\x20' + '=\x20animData' + '.fps;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'document.g' + 'etElementB' + _0x2d61ef(0x901) + _0x2d61ef(0xaa6) + 'lue\x20=\x20anim' + 'Data.scale' + _0x2d61ef(0x306) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1be6f0) + _0x2d61ef(_0x353f4c._0x7275e4) + 'ementById(' + '\x27opacityIn' + _0x2d61ef(_0x353f4c._0x230027) + _0x2d61ef(_0x353f4c._0x4c8abe) + 'ta.opacity' + '\x20||\x20255;\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20documen' + 't.getEleme' + 'ntById(\x27hu' + _0x2d61ef(0x56a) + 'alue\x20=\x20ani' + _0x2d61ef(_0x353f4c._0x50acba) + '||\x200;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'document.g' + 'etElementB' + 'yId(\x27blend' + 'ModeInput\x27' + _0x2d61ef(_0x353f4c._0x334661) + _0x2d61ef(0x849) + 'lendMode\x20|' + '|\x20\x27Normal\x27' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xca2) + _0x2d61ef(_0x353f4c._0x57763a) + 'ementById(' + _0x2d61ef(_0x353f4c._0x997c6c) + 'eckbox\x27).c' + 'hecked\x20=\x20a' + 'nimData.pl' + 'ayInRevers' + 'e\x20||\x20false' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20docu' + 'ment.getEl' + 'ementById(' + '\x27flipHoriz' + 'ontalCheck' + _0x2d61ef(_0x353f4c._0xd267b1) + _0x2d61ef(0x35a) + 'Data.flip\x20' + '||\x20false;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20docume' + _0x2d61ef(0x916) + 'entById(\x27f' + 'lipVertica' + 'lCheckbox\x27') + (').checked\x20' + _0x2d61ef(_0x353f4c._0x8f5087) + '.flipY\x20||\x20' + 'false;\x0a\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x53ad9c) + _0x2d61ef(0xacf) + '\x20document.' + 'getElement' + 'ById(\x27rand' + 'omFlipHori' + 'zontalChec' + _0x2d61ef(0x8ae) + 'cked\x20=\x20ani' + _0x2d61ef(0x87a) + 'omFlipX\x20||' + '\x20false;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20document' + _0x2d61ef(_0x353f4c._0x47b62e) + 'tById(\x27ran' + 'domFlipVer' + 'ticalCheck' + 'box\x27).chec' + 'ked\x20=\x20anim' + _0x2d61ef(_0x353f4c._0x120a2a) + 'mFlipY\x20||\x20' + _0x2d61ef(0xa0e) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3aad2c) + '\x20document.' + 'getElement' + 'ById(\x27rota' + _0x2d61ef(0x3b2) + ').value\x20=\x20' + 'animData.r' + 'otation\x20||' + '\x200;\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x5984c9) + '\x20\x20\x20\x20\x20\x20\x20\x20do' + 'cument.get' + 'ElementByI' + 'd(\x27randomR' + 'otationChe' + 'ckbox\x27).ch' + 'ecked\x20=\x20an' + 'imData.ran' + 'domRotatio' + 'n\x20||\x20false' + _0x2d61ef(_0x353f4c._0x15ec22) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20docu' + _0x2d61ef(0x746) + 'ementById(' + '\x27openingAn' + 'imationInp' + 'ut\x27).value' + '\x20=\x20animDat' + 'a.openingA' + 'nimation\x20|' + _0x2d61ef(_0x353f4c._0x5a08d8) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x584) + 'nt.getElem' + 'entById(\x27e' + _0x2d61ef(_0x353f4c._0x4cfec8) + 'tionInput\x27' + _0x2d61ef(0x636) + _0x2d61ef(0x976) + 'ndingAnima' + _0x2d61ef(0xa37) + 'one\x27;\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x560) + 'etElementB' + _0x2d61ef(_0x353f4c._0xb8e7b7) + _0x2d61ef(0xa97) + 'onInput\x27).' + 'value\x20=\x20an' + _0x2d61ef(0xcf3) + 'mationDura' + _0x2d61ef(0x6f2) + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20docu' + 'ment.getEl' + 'ementById(' + '\x27bloomChec' + _0x2d61ef(_0x353f4c._0x3f58b9) + 'cked\x20=\x20ani' + 'mData.bloo' + 'mEffect\x20||' + '\x20false;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1cfbbc) + '\x20\x20document' + '.getElemen' + 'tById(\x27blu') + (_0x2d61ef(0x22c) + _0x2d61ef(_0x353f4c._0x1e3ed8) + _0x2d61ef(_0x353f4c._0x4c38dd) + 'a.blurAmou' + 'nt\x20||\x2015;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20docume' + 'nt.getElem' + 'entById(\x27i' + 'ntensityIn' + 'put\x27).valu' + 'e\x20=\x20animDa' + 'ta.intensi' + _0x2d61ef(0x61a) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20docum' + 'ent.getEle' + 'mentById(\x27' + _0x2d61ef(0x1c6) + _0x2d61ef(_0x353f4c._0x37d131) + 'ue\x20=\x20animD' + 'ata.tintCo' + 'lor\x20||\x20\x27#F' + 'FFFFF\x27;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20document' + '.getElemen' + 'tById(\x27zIn' + _0x2d61ef(0x885) + _0x2d61ef(_0x353f4c._0x48042c) + 'nimData.zI' + 'ndex;\x0a\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'document.g' + 'etElementB' + _0x2d61ef(_0x353f4c._0x59e620) + 'tXInput\x27).' + _0x2d61ef(0xc6a) + _0x2d61ef(0x63f) + 'setX\x20*\x202;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20docume' + 'nt.getElem' + _0x2d61ef(_0x353f4c._0x6209ef) + _0x2d61ef(_0x353f4c._0x4e1e47) + 't\x27).value\x20' + _0x2d61ef(0x69b) + '.offsetY\x20*' + '\x202;\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20updateH' + 'ueDisplay(' + _0x2d61ef(0x2ce) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20upd' + 'ateRotatio' + 'nDisplay()' + _0x2d61ef(_0x353f4c._0x299bc4) + _0x2d61ef(_0x353f4c._0x386e60) + _0x2d61ef(0x29f) + 'teAutoSave' + 'Visibility' + '();\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20if\x20(ani' + 'mData.char' + 'acterSprit' + _0x2d61ef(0x80f) + 'ata.charac' + 'terSprite.' + 'dataUrl)\x20{' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x208068) + _0x2d61ef(_0x353f4c._0x103ba1) + 'onst\x20charI' + 'mg\x20=\x20new\x20I' + 'mage();\x0a\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20char' + 'Img.onload' + '\x20=\x20functio' + 'n()\x20{\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20ch' + 'aracterSpr' + 'ite\x20=\x20char' + 'Img;\x0a\x20\x20\x20\x20\x20') + ('\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x26511e) + 'racterSpri' + 'teWidth\x20=\x20' + _0x2d61ef(_0x353f4c._0x1c4001) + 'haracterSp' + _0x2d61ef(0x15a) + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0xacf) + _0x2d61ef(_0x353f4c._0x56489f) + 'terSpriteH' + 'eight\x20=\x20an' + _0x2d61ef(_0x353f4c._0x535898) + 'racterSpri' + 'te.height;' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x23af8e) + '\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20if\x20(' + '!isAnimati' + 'ng)\x20{\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20isAnimat' + _0x2d61ef(_0x353f4c._0x479853) + _0x2d61ef(_0x353f4c._0x2c45a3) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x575ca8) + 'imatePrevi' + 'ew();\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x3aba43) + _0x2d61ef(_0x353f4c._0x2c78a0) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x1e0) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0x7ff) + 'harImg.src' + '\x20=\x20animDat' + _0x2d61ef(_0x353f4c._0x484b22) + 'rSprite.da' + _0x2d61ef(0x734) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20}\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20updateFi' + _0x2d61ef(0x3eb) + _0x2d61ef(_0x353f4c._0x4af433) + 'pritesheet' + 'File);\x0a\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20if\x20(' + '!isAnimati' + _0x2d61ef(0xc70) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20isAnim' + _0x2d61ef(0xc48) + _0x2d61ef(_0x353f4c._0x4cbf8a) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x8fa) + 'review();\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x276e08) + _0x2d61ef(_0x353f4c._0x80405f) + '\x20\x20\x20\x20\x20\x20};\x0a\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x926) + '.opener\x20&&' + '\x20window.op' + 'ener.Image' + 'Manager)\x20{' + _0x2d61ef(_0x353f4c._0x51dd1b) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20const' + '\x20tempBitma' + 'p\x20=\x20window' + '.opener.Im' + 'ageManager') + (_0x2d61ef(_0x353f4c._0xe61ce5) + _0x2d61ef(_0x353f4c._0x47ddf2) + 'a.spritesh' + 'eetFile);\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20if\x20(te' + 'mpBitmap\x20&' + _0x2d61ef(_0x353f4c._0x5b5e44) + _0x2d61ef(_0x353f4c._0x552ce4) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1f3375) + _0x2d61ef(0xa18) + 'mg.src\x20=\x20t' + _0x2d61ef(_0x353f4c._0x2d5990) + '_url;\x0a\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0xacf) + '}\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20}\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20d' + 'ocument.ad' + _0x2d61ef(_0x353f4c._0x3979f9) + 'ener(\x27clic' + 'k\x27,\x20functi' + 'on(event)\x20' + '{\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20const\x20mo' + 'dal\x20=\x20docu' + 'ment.getEl' + 'ementById(' + '\x27libraryMo' + 'dal\x27);\x0a\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x323dfe) + '\x20\x20\x20\x20\x20\x20\x20if\x20' + '(event.tar' + _0x2d61ef(0xad7) + _0x2d61ef(_0x353f4c._0x5e804f) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20closeLibr' + 'ary();\x0a\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0x103) + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20});\x0a\x0a' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20func' + 'tion\x20remov' + _0x2d61ef(0x9c3) + 'Sprites()\x20' + _0x2d61ef(_0x353f4c._0x46bf40) + _0x2d61ef(_0x353f4c._0x5cac09) + '\x20\x20const\x20sp' + 'riteCount\x20' + _0x2d61ef(_0x353f4c._0x22a2c9) + 'alues(libr' + 'aryAnimati' + 'ons).filte' + _0x2d61ef(_0x353f4c._0x1e9ccc) + 'anim.chara' + 'cterSprite' + _0x2d61ef(0x310) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20if\x20(sprit' + 'eCount\x20===' + _0x2d61ef(_0x353f4c._0x59c1f9) + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20let\x20rem' + _0x2d61ef(0xb03) + '=\x200;\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xab0) + 'const\x20[nam' + 'e,\x20animDat' + 'a]\x20of\x20Obje' + 'ct.entries' + '(libraryAn' + 'imations))' + '\x20{\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x25648a) + '(animData.' + 'characterS' + 'prite)\x20{\x0a\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20ani' + 'mData.char' + 'acterSprit') + ('e\x20=\x20null;\x0a' + _0x2d61ef(_0x353f4c._0x3070d8) + _0x2d61ef(0xacf) + _0x2d61ef(0x12e) + 'movedCount' + '++;\x0a\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x43f0a8) + _0x2d61ef(0x664) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '}\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20if\x20(win' + 'dow.opener' + _0x2d61ef(_0x353f4c._0x235a2b) + _0x2d61ef(_0x353f4c._0x491926) + 'moveAllTar' + _0x2d61ef(_0x353f4c._0x342bc3) + 'FromLibrar' + 'y)\x20{\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xb15) + 'indow.open' + 'er.removeA' + _0x2d61ef(0x315) + 'ritesFromL' + 'ibrary();\x0a' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '}\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + _0x2d61ef(0x2e4) + _0x2d61ef(_0x353f4c._0x5855f2) + _0x2d61ef(_0x353f4c._0x15e80e) + '\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20func' + 'tion\x20updat' + 'eHueDispla' + _0x2d61ef(_0x353f4c._0x38f6b5) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20cons' + 't\x20hueValue' + _0x2d61ef(_0x353f4c._0x329e24) + _0x2d61ef(0x44f) + 'ntById(\x27hu' + _0x2d61ef(0x74c) + 'value\x20||\x200' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20const\x20hu' + _0x2d61ef(0x235) + _0x2d61ef(_0x353f4c._0xabd7c1) + 'getElement' + _0x2d61ef(0x270) + _0x2d61ef(0x89f) + _0x2d61ef(_0x353f4c._0x192f2a) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'if\x20(hueDis' + 'play)\x20{\x0a\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20hueDispl' + 'ay.textCon' + 'tent\x20=\x20hue' + 'Value\x20+\x20\x27°' + '\x27;\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x327c66) + '\x20\x20\x20}\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1b2518) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'function\x20u' + 'pdatePrevi' + 'ew()\x20{\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20tri' + 'ggerAutoSa' + 've();\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x97c) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20function\x20' + 'triggerAut' + 'oSave()\x20{\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20co' + 'nst\x20autoSa' + 'veField\x20=\x20' + 'document.g' + 'etElementB' + 'yId(\x27autoS' + 'aveField\x27)' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + 'const\x20auto') + ('SaveEnable' + 'd\x20=\x20docume' + 'nt.getElem' + _0x2d61ef(_0x353f4c._0x38ccc1) + 'utoSaveChe' + 'ckbox\x27)?.c' + 'hecked\x20||\x20' + _0x2d61ef(0xa0e) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x39b2af) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20if\x20(!a' + 'utoSaveFie' + 'ld\x20||\x20auto' + 'SaveField.' + _0x2d61ef(0x19d) + 'lay\x20===\x20\x27n' + _0x2d61ef(0x9b2) + 'utoSaveEna' + 'bled)\x20retu' + _0x2d61ef(0x7cb) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20const\x20a' + 'nimationNa' + 'me\x20=\x20docum' + 'ent.getEle' + _0x2d61ef(_0x353f4c._0x218f71) + 'animationN' + 'ameInput\x27)' + '?.value.tr' + 'im();\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20if\x20(!a' + 'nimationNa' + _0x2d61ef(0x9ec) + ';\x0a\x0a\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x5c75ed) + '\x20if\x20(windo' + 'w.opener\x20&' + '&\x20window.o' + _0x2d61ef(0x455) + _0x2d61ef(0xb20) + 'ibrary)\x20{\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20window.o' + 'pener.load' + 'AnimationL' + 'ibrary().t' + 'hen((libra' + 'ry)\x20=>\x20{\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20if\x20(l' + 'ibrary\x20&&\x20' + _0x2d61ef(0x5d3) + 'imationNam' + 'e])\x20{\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20if\x20(' + _0x2d61ef(_0x353f4c._0xc08b06) + 'meout)\x20{\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20clearTi' + 'meout(auto' + 'SaveTimeou' + 't);\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20}\x0a\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x5e0493) + _0x2d61ef(_0x353f4c._0x539704) + _0x2d61ef(0xc23) + 'meout(()\x20=' + '>\x20{\x0a\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20sa' + 'veToLibrar' + 'y(true);\x0a\x20' + _0x2d61ef(_0x353f4c._0x3070d8) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20}' + ',\x20100);\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20}\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20})' + ';\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x327c66) + '}\x0a\x20\x20\x20\x20\x20\x20\x20\x20') + ('\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20functio' + 'n\x20updateAu' + _0x2d61ef(_0x353f4c._0x11d18f) + 'bility()\x20{' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20con' + 'st\x20autoSav' + 'eField\x20=\x20d' + 'ocument.ge' + _0x2d61ef(_0x353f4c._0x375bed) + _0x2d61ef(_0x353f4c._0x3fda53) + 'veField\x27);' + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20con' + 'st\x20animati' + 'onName\x20=\x20d' + 'ocument.ge' + 'tElementBy' + 'Id(\x27animat' + _0x2d61ef(0xd47) + 'ut\x27)?.valu' + 'e.trim();\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x41ca09) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20if\x20(!an' + 'imationNam' + 'e\x20||\x20!auto' + 'SaveField)' + _0x2d61ef(_0x353f4c._0x3bccc3) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20if\x20(aut' + _0x2d61ef(0x8d5) + _0x2d61ef(_0x353f4c._0x4060f0) + 'Field.styl' + 'e.display\x20' + '=\x20\x27none\x27;\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + 'return;\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20}\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20i' + 'f\x20(window.' + 'opener\x20&&\x20' + 'window.ope' + 'ner.loadAn' + _0x2d61ef(_0x353f4c._0x212faa) + 'rary)\x20{\x0a\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20wi' + 'ndow.opene' + 'r.loadAnim' + _0x2d61ef(0xa75) + _0x2d61ef(0xb3c) + '(library)\x20' + '=>\x20{\x0a\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xa18) + 'f\x20(library' + _0x2d61ef(0x784) + _0x2d61ef(0xf2) + 'nName])\x20{\x0a' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0x48f) + 'toSaveFiel' + _0x2d61ef(_0x353f4c._0x19234c) + 'splay\x20=\x20\x27b' + 'lock\x27;\x0a\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x1789fe) + '\x20}\x20else\x20{\x0a' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(0xacf) + '\x20\x20\x20\x20\x20\x20\x20\x20au' + 'toSaveFiel' + 'd.style.di' + _0x2d61ef(_0x353f4c._0x79f2a3) + _0x2d61ef(_0x353f4c._0x33b324) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '}\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + '\x20\x20});\x0a\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x55ddb9) + _0x2d61ef(0xb14) + _0x2d61ef(_0x353f4c._0x3b62ba) + '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x2d61ef(_0x353f4c._0x2413b4) + '\x20\x20\x20\x20\x20\x20\x20\x20</' + 'body>\x0a\x20\x20\x20\x20' + '\x20\x20\x20\x20')), AnimationEditorWindow['document']['close'](); const _0x3fec23 = setInterval(() => { const _0x170ae1 = _0x2d61ef; if ('zoKQj' !== 'zoKQj') return _0x2ae645 = _0x4f9f56, _0x2721bf; else { if (AnimationEditorWindow && AnimationEditorWindow['closed']) { if ('pFMSU' === 'pFMSU') clearInterval(_0x3fec23), disableEditorPreviewMode(); else { const _0x3150a9 = _0x332a91('fs'), _0x263782 = _0x19a891(_0x170ae1(_0x2ae777._0x1d5763)), _0x523c25 = _0x263782['dirname'](_0x46a3c5[_0x170ae1(0x2b9)]['filename']) + '/js/', _0x4cd3d6 = _0x523c25 + ('AnimationS' + 'olutionLib' + _0x170ae1(0x43f)); if (_0x3150a9[_0x170ae1(_0x2ae777._0x216ea0)](_0x4cd3d6)) { const _0x4e27da = _0x3150a9['readFileSy' + 'nc'](_0x4cd3d6, 'utf8'); return _0x26e0aa = _0x4ad7f1[_0x170ae1(_0x2ae777._0x3ecab4)](_0x4e27da), _0x10cfba['resolve'](_0x4aa376); } } } } }, -0x3e * -0xb + -0x9a0 + 0x146 * 0x7); } } } function enableEditorPreviewMode() { editorPreviewMode = !![], selectedCharacterForPreview = null, hxSetAlwaysRun(!![]); } function disableEditorPreviewMode() { editorPreviewMode = ![], selectedCharacterForPreview = null, hxSetAlwaysRun(![]); } function handleCharacterClick(_0x516d69, _0x3873d6) { const _0x2a770f = { _0x1638a2: 0xbfc, _0xddb63f: 0xbfc }, _0x50fd04 = _0x4bda12; if (!editorPreviewMode || !SceneManager['_scene']['_spriteset']) return; const _0x3f2c68 = getCharacterAtPosition(_0x516d69, _0x3873d6); if (_0x3f2c68) { selectedCharacterForPreview = _0x3f2c68; if (AnimationEditorWindow && !AnimationEditorWindow['closed']) { const _0x2c3d38 = SceneManager['_scene']['_spriteset']['_character' + _0x50fd04(0xc78)]['find'](_0x5140a4 => _0x5140a4['_character'] === _0x3f2c68); if (_0x2c3d38 && _0x2c3d38[_0x50fd04(_0x2a770f._0x1638a2)] && _0x2c3d38[_0x50fd04(_0x2a770f._0xddb63f)]['isReady']()) sendCharacterSpriteToEditor(_0x2c3d38, _0x3f2c68); else _0x2c3d38 && _0x2c3d38[_0x50fd04(0xbfc)] && _0x2c3d38['bitmap']['addLoadLis' + 'tener'](() => { sendCharacterSpriteToEditor(_0x2c3d38, _0x3f2c68); }); } } } function deleteAnimationFromLibrary(_0x46096b) { const _0x584374 = { _0x511789: 0x304, _0x8b708e: 0x3b8, _0x54c460: 0x519, _0x516e97: 0x4e7, _0x101cbf: 0x514 }, _0x278f2c = _0x4bda12; if (!Utils['isNwjs']()) return; try { if ('JKjgf' !== 'Mtqvl') { const _0x2477fc = require('fs'), _0x1fcd51 = require('path'), _0x486519 = _0x1fcd51['dirname'](process['mainModule'][_0x278f2c(0x59c)]) + '/js/', _0x3d73df = _0x486519 + ('AnimationS' + 'olutionLib' + 'rary.json'); if (_0x2477fc[_0x278f2c(0xbe6)](_0x3d73df)) { if ('moHHs' !== 'RQYAT') { const _0x8b1c5e = _0x2477fc[_0x278f2c(_0x584374._0x511789) + 'nc'](_0x3d73df, _0x278f2c(_0x584374._0x8b708e)); let _0x402384 = JSON['parse'](_0x8b1c5e); _0x402384[_0x46096b] ? (delete _0x402384[_0x46096b], _0x2477fc['writeFileS' + _0x278f2c(0xc98)](_0x3d73df, JSON[_0x278f2c(_0x584374._0x54c460)](_0x402384, null, -0x23de + 0xaf0 + 0x98 * 0x2a), 'utf8'), animationLibraryCache = _0x402384) : console['warn'](_0x278f2c(0xa0f) + 'not\x20found\x20' + _0x278f2c(0xcf1) + ':\x20' + _0x46096b); } else _0x3b7386[_0x278f2c(_0x584374._0x516e97)]('Error\x20load' + 'ing\x20animat' + 'ion\x20librar' + 'y:', _0x1955d6); } } else delete _0x5270ab[_0x1b7ee2], _0xb4f511['writeFileS' + 'ync'](_0x35c866, _0x59dcfb['stringify'](_0x4749f0, null, -0x2141 + 0x1da0 + 0x3a3), 'utf8'), _0x5b050e = _0x1fc709; } catch (_0x55977e) { console[_0x278f2c(0x4e7)]('Error\x20dele' + _0x278f2c(0xb33) + 'tion\x20from\x20' + _0x278f2c(_0x584374._0x101cbf), _0x55977e); } } function removeAllTargetSpritesFromLibrary() { const _0x3e73ab = { _0x586395: 0x9be, _0x5074e6: 0x271, _0x321760: 0x90f }, _0x3a93fe = _0x4bda12; if (!Utils['isNwjs']()) return; try { if ('lWeoI' === 'lWeoI') { const _0x657d2 = require('fs'), _0x485ab7 = require('path'), _0x3786cc = _0x485ab7['dirname'](process['mainModule']['filename']) + '/js/', _0x2fa5d3 = _0x3786cc + ('AnimationS' + 'olutionLib' + _0x3a93fe(0x43f)); if (_0x657d2['existsSync'](_0x2fa5d3)) { const _0x528eaa = _0x657d2[_0x3a93fe(0x304) + 'nc'](_0x2fa5d3, 'utf8'); let _0x4a9685 = JSON[_0x3a93fe(0x994)](_0x528eaa), _0x597ef3 = 0x140e * 0x1 + -0x1 * 0x21a9 + 0xd9b; for (const _0x1afa8f in _0x4a9685) { _0x4a9685[_0x1afa8f][_0x3a93fe(_0x3e73ab._0x586395) + 'prite'] && (_0x4a9685[_0x1afa8f][_0x3a93fe(0x9be) + _0x3a93fe(_0x3e73ab._0x5074e6)] = null, _0x597ef3++); } _0x657d2['writeFileS' + 'ync'](_0x2fa5d3, JSON['stringify'](_0x4a9685, null, -0x6b * 0x38 + 0x760 * 0x1 + 0x100a), 'utf8'), animationLibraryCache = _0x4a9685; } } else _0x172509[_0x435ae5]['characterS' + 'prite'] && (_0x1b403b[_0x5295b6]['characterS' + 'prite'] = null, _0x291663++); } catch (_0x20a483) { console[_0x3a93fe(0x4e7)](_0x3a93fe(_0x3e73ab._0x321760) + 'ving\x20targe' + 't\x20sprites\x20' + 'from\x20libra' + 'ry:', _0x20a483); } } function _0x5d62(_0x2081b8, _0x438087) { _0x2081b8 = _0x2081b8 - (0x2df * 0x1 + 0x6 * 0x1b3 + -0x431 * 0x3); const _0x1c429e = _0x436a(); let _0x52d0e4 = _0x1c429e[_0x2081b8]; return _0x52d0e4; } window['removeAllT' + 'argetSprit' + 'esFromLibr' + 'ary'] = removeAllTargetSpritesFromLibrary; function sendCharacterSpriteToEditor(_0x453452, _0x2fd10c) { const _0x466843 = { _0x171f62: 0xc80, _0x4ab0b5: 0x24b, _0x3de79f: 0x9f0, _0x3beafe: 0x33b, _0x23fb97: 0x371, _0x291cf6: 0x353, _0x1b0e11: 0x4e7, _0x2256a4: 0x528, _0x33a3a1: 0x704, _0x32afff: 0xaeb, _0x363935: 0x2bd, _0x2ec198: 0x59c, _0x4849c2: 0x33f }, _0x305e82 = _0x4bda12; if (!_0x453452 || !_0x453452[_0x305e82(0xbfc)] || !AnimationEditorWindow) return; const _0x8f862e = _0x453452['bitmap'], _0x39568c = document['createElem' + _0x305e82(0xb50)](_0x305e82(_0x466843._0x171f62)), _0x1a8699 = _0x39568c['getContext']('2d'), _0xb89434 = _0x453452[_0x305e82(_0x466843._0x4ab0b5) + 'th'](), _0x5235c9 = _0x453452[_0x305e82(_0x466843._0x3de79f) + _0x305e82(_0x466843._0x3beafe)](), _0x132848 = _0xb89434, _0x514ddd = _0x5235c9, _0x37288f = $gameMap['tileWidth'](), _0x1ea0ff = $gameMap[_0x305e82(_0x466843._0x23fb97)](); let _0x291511 = -0x21e * 0x9 + -0xdf * 0x10 + 0x20ff; if (_0x2fd10c[_0x305e82(_0x466843._0x291cf6) + 'ype'] !== undefined) { if ('zzOnY' !== 'zzOnY') _0x5f0445[_0x305e82(_0x466843._0x1b0e11)]('Error\x20savi' + 'ng\x20animati' + 'on\x20to\x20libr' + 'ary:', _0x465e58); else switch (_0x2fd10c[_0x305e82(_0x466843._0x291cf6) + 'ype']) { case 0x604 + -0x13 * 0x79 + -0x21 * -0x17: _0x291511 = -0x1 * -0xca9 + -0x1a1a + 0xd75; break; case 0xb4 + 0x6a1 * 0x1 + -0xe * 0x86: _0x291511 = 0x15cd + 0x2 * 0x67d + 0xb96 * -0x3; break; case -0x946 + 0x183e + -0xef6: _0x291511 = 0xb1e + -0x1 * 0x4cb + -0x64d; break; default: _0x291511 = 0x14ab + 0xb * -0x2a1 + -0x1d * -0x49; break; } } else 'YDXVx' === 'YDXVx' ? _0x291511 = -0x160b + -0x2 * -0xd9 + 0x145e : _0xcdef03['setCharact' + 'erSprite'](_0x1ed76b, _0x3af76e, _0x2f40b4, _0x5df26c, _0x58e54c, _0x54ca76, _0x277f28, _0x27d3b7); let _0x1393c7, _0x90ea4d; if (_0x453452['_isBigChar' + 'acter']) _0x1393c7 = 0x4b * -0x5e + 0x1517 + -0x673 * -0x1, _0x90ea4d = 0x24 * 0x25 + 0x3b * 0x32 + -0x10ba; else { const _0x200146 = _0x2fd10c['_character' + 'Index'] || -0x7 * -0x1f0 + -0x689 + 0x7 * -0x101, _0x265a19 = _0x2fd10c['_frames'] || 0x3 * 0xf3 + -0x30 * -0xc9 + -0x2886, _0xac5b98 = _0x200146 % (-0x5 * -0x71e + 0xa05 + 0x2d97 * -0x1) * _0x265a19, _0x499f18 = Math[_0x305e82(_0x466843._0x2256a4)](_0x200146 / (-0x6f * -0x29 + -0x16 * -0xd6 + -0x269 * 0xf)) * (-0x1e6 + -0x1f12 + 0x20fc); _0x1393c7 = _0xac5b98 * _0xb89434, _0x90ea4d = _0x499f18 * _0x5235c9; } _0x39568c['width'] = _0xb89434, _0x39568c[_0x305e82(0x704)] = _0x5235c9; const _0x23f5db = document['createElem' + 'ent']('canvas'), _0x1f23b9 = _0x23f5db['getContext']('2d'); _0x23f5db['width'] = _0x8f862e['width'], _0x23f5db[_0x305e82(0x704)] = _0x8f862e[_0x305e82(_0x466843._0x33a3a1)], _0x1f23b9['drawImage'](_0x8f862e[_0x305e82(_0x466843._0x32afff)] || _0x8f862e['_image'], -0xd * -0x166 + 0x24c1 * -0x1 + 0x1293, -0x21f5 + -0xc * -0x1e7 + 0xb * 0x103), _0x1a8699[_0x305e82(_0x466843._0x363935)](_0x23f5db, _0x1393c7, _0x90ea4d, _0xb89434, _0x5235c9, 0x1 * -0x1baf + -0xb * -0x336 + -0x187 * 0x5, 0xdd0 + 0x1 * 0x2707 + -0x34d7, _0xb89434, _0x5235c9); const _0x2e226b = _0x39568c[_0x305e82(0x9bf)](); if (AnimationEditorWindow && !AnimationEditorWindow['closed']) { if ('rwybx' !== 'rwybx') { const _0x5744cb = _0x58d1a6('fs'), _0x45546a = _0x56660f('path'), _0x748d92 = _0x45546a['dirname'](_0x1f664b['mainModule'][_0x305e82(_0x466843._0x2ec198)]) + _0x305e82(_0x466843._0x4849c2), _0x30f72c = _0x748d92 + (_0x305e82(0x41e) + 'olutionLib' + 'rary.json'); let _0x37b469 = {}; if (_0x5744cb['existsSync'](_0x30f72c)) { const _0x54d4f9 = _0x5744cb['readFileSy' + 'nc'](_0x30f72c, 'utf8'); _0x37b469 = _0x11990e[_0x305e82(0x994)](_0x54d4f9); } _0x37b469[_0x4b9597['name']] = _0x5c210f, _0x5744cb['writeFileS' + 'ync'](_0x30f72c, _0x1bb003[_0x305e82(0x519)](_0x37b469, null, 0x5cb * 0x6 + -0x1576 + -0xd4a), 'utf8'), _0xad5f0f = _0x37b469; } else AnimationEditorWindow['setCharact' + _0x305e82(0xa13)](_0x2e226b, _0xb89434, _0x5235c9, _0x132848, _0x514ddd, _0x37288f, _0x1ea0ff, _0x291511); } } function getCharacterAtPosition(_0x2dad51, _0x10870f) { const _0x40218f = { _0x22c2bb: 0x947, _0x50cb23: 0x3c5 }, _0x4c7360 = _0x4bda12; if (!SceneManager['_scene'] || !SceneManager[_0x4c7360(0x8f2)][_0x4c7360(_0x40218f._0x22c2bb)]) return null; const _0x309df9 = SceneManager['_scene']['_spriteset']['_character' + _0x4c7360(0xc78)]; for (let _0x37557e = _0x309df9['length'] - (0xb8 + 0x252 + -0x7 * 0x6f); _0x37557e >= 0x5dc + 0x2577 + -0x2b53; _0x37557e--) { const _0x4c7077 = _0x309df9[_0x37557e]; if (!_0x4c7077[_0x4c7360(0x46b)]) continue; const _0x1e4ceb = {}; _0x1e4ceb['left'] = _0x4c7077['x'] - _0x4c7077['width'] / (0x214b + -0x22fe + -0x13 * -0x17), _0x1e4ceb['right'] = _0x4c7077['x'] + _0x4c7077['width'] / (-0x1 * 0x319 + -0x2b4 + 0x5cf), _0x1e4ceb[_0x4c7360(0xa51)] = _0x4c7077['y'] - _0x4c7077['height'], _0x1e4ceb[_0x4c7360(_0x40218f._0x50cb23)] = _0x4c7077['y']; const _0x42d0d2 = _0x1e4ceb; if (_0x2dad51 >= _0x42d0d2[_0x4c7360(0xcb6)] && _0x2dad51 <= _0x42d0d2['right'] && _0x10870f >= _0x42d0d2['top'] && _0x10870f <= _0x42d0d2[_0x4c7360(0x3c5)]) return _0x4c7077['_character']; } return null; } let _hxAlwaysRun = ![]; function hxSetAlwaysRun(_0x52bf9a) { _hxAlwaysRun = _0x52bf9a; } if (Object[_0x4bda12(0x546) + 'ertyDescri' + 'ptor'](document, _0x4bda12(0x2a2))?.['configurab' + 'le'] !== ![]) { const _hxOriginalHasFocus = document['hasFocus']['bind'](document); Object['defineProp' + 'erty'](document, 'hasFocus', { 'value': function () { return _hxAlwaysRun || _hxOriginalHasFocus(); }, 'writable': ![], 'configurable': !![] }); } window['getAnimati' + 'onFromLibr' + 'ary'] = getAnimationFromLibrary, window['saveAnimat' + 'ionToLibra' + 'ry'] = saveAnimationToLibrary, window['loadAnimat' + 'ionLibrary'] = loadAnimationLibrary, window[_0x4bda12(0x199) + 'ationFromL' + 'ibrary'] = deleteAnimationFromLibrary;
})();