/*:
 * @author Synrec/Kylestclr
 * @plugindesc v1.3 A Rhythm game creator
 * @target MZ
 * 
 * @command Start Rhythm
 * @desc Starts Rhythm game
 * 
 * @arg Identifier
 * @desc The identifier of the rhythm game to start
 * @type text
 * @default rhythm
 * 
 * @help
 * Set the game parameters in the plugin parameters.
 * If you are new to the plugin, it is recommended that
 * you use the auto mode which will automatically generate 
 * buttons for your minigame.
 * 
 * When setting up your auto mode gameplay, ensure "Auto Setup"
 * is set to 'true', leave the "Auto FFT" as 2048 unless you are
 * very sure you know what you are doing. The trigger threshold
 * is the sound wave amplitude read time the sound exceeds threshold.
 * 
 * The "Auto Rail" parameter can be used to determine which section
 * of the wave amplitude can be used for the amplitude average
 * calculation.
 * 
 * Threshold value is gained from the amplitude average value of the 
 * wave in addition to the "Auto Threshold" value set. If the section
 * of the wave under consideration exceeds the threshold, it will
 * begin generating button data.
 * 
 * See the HELP file for more information.
 * 
 * If using with the tactical battle system and you want
 * the rhythm game to activate in battle, set the 
 * "Target Animation" of the skill to 'target' and set a
 * skill animation. It won't use battler normal attack.
 * 
 * @param Do Not Destroy
 * @desc Prevents button JS destruction
 * Useful for MV users
 * @type boolean
 * @default false
 * 
 * @param Keep Project Alive
 * @desc Prevents the game from going inactive when
 * project window not active
 * @type boolean
 * @default false
 * 
 * @param Game Configurations
 * @desc Setup rhythm games
 * @type struct<gameConfig>[]
 * @default []
 * 
 * @param Hold Length Per Frame
 * @desc Set the draw length per hold frame
 * Value is pixels per frame
 * @type text
 * @default 3
 * 
 * @param Hold Color
 * @desc Set the color for holding
 * @type text
 * @default #0000ff
 * 
 * @param Button Configurations
 * @desc Setup game buttons here
 * @type struct<btnGameConfig>[]
 * @default []
 * 
 * @param Score Variable
 * @desc Game variable used for score
 * A perfect hit is 100 points
 * @type variable
 * @default 1
 * 
 * @param Skill Configurations
 * @desc Setup skills to go with rhythm game
 * @type struct<skillRhythm>[]
 * @default []
 * 
 */
/*~struct~skillRhythm:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default Skill
 * 
 * @param Skill
 * @desc Select the skill to overwrite
 * @type skill
 * @default 1
 * 
 * @param Rhythm Game
 * @desc Type identifier of rhythm game
 * @type text
 * @default rhythm
 * 
 */
/*~struct~scoreSprite:
 * 
 * @param Screen X
 * @desc Screen position
 * @type text
 * @default 0
 * 
 * @param Screen Y
 * @desc Screen position
 * @type text
 * @default 0
 * 
 * @param Graphic
 * @desc Sets the animated graphic
 * Used as background
 * @type struct<animGfx>
 * 
 * @param Text Offset X
 * @desc Offsets the text from left side
 * @type text
 * @default 0
 * 
 * @param Text Offset Y
 * @desc Offsets the text from top side
 * @type text
 * @default 0
 * 
 * @param Font Face
 * @desc Font face used for the text
 * @type text
 * @default sans-serif
 * 
 * @param Font Size
 * @desc The size of the font for text
 * @type text
 * @default 16
 * 
 * @param Text Color
 * @desc Color of the text
 * @type text
 * @default #ffffff
 * 
 * @param Text Outline Color
 * @desc Color of the text outline
 * @type text
 * @default rgba(0, 0, 0, 0.5)
 * 
 * @param Text Outline Size
 * @desc Size of text outline
 * @type text
 * @default 3
 * 
 */
/*~struct~audioSe:
 * 
 * @param name
 * @text Name
 * @desc Select audio se file
 * @type file
 * @dir audio/se/
 * 
 * @param volume
 * @text Volume
 * @desc Loudness
 * @type text
 * @default 90
 * 
 * @param pitch
 * @text Pitch
 * @desc Tone
 * @type text
 * @default 100
 * 
 * @param pan
 * @text Pan
 * @desc Balance
 * @type text
 * @default 0
 * 
 */
/*~struct~popupSe:
 * 
 * @param Bad Popup
 * @desc Play sound effect if bad input
 * Selects at random if multiple
 * @type struct<audioSe>[]
 * @default []
 * 
 * @param Good Popup
 * @desc Play sound effect if good input
 * Selects at random if multiple
 * @type struct<audioSe>[]
 * @default []
 * 
 * @param Perfect Popup
 * @desc Play sound effect if perfect input
 * Selects at random if multiple
 * @type struct<audioSe>[]
 * @default []
 * 
 */
/*~struct~autoRailSetup:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default Auto Rail
 * 
 * @param Rail Input
 * @desc The rail input to consider
 * @type select
 * @option ok
 * @option cancel
 * @option up
 * @option down
 * @option left
 * @option right
 * @option pageup
 * @option pagedown
 * @default ok
 * 
 * @param Start Index
 * @desc The start to check
 * @type text
 * @default 0
 * 
 * @param End Index
 * @desc The end to stop check at
 * @type text
 * @default Infinity
 * 
 */
/*~struct~autoVisualizer:
 * 
 * @param Screen X
 * @desc Start position on screen
 * @type text
 * @default 0
 * 
 * @param Screen Y
 * @desc Start position on screen
 * @type text
 * @default 0
 * 
 * @param Draw Mode
 * @desc Choose how to draw the visualizer
 * @type select
 * @option circle
 * @option line
 * @default line
 * 
 * @param Inner Radius
 * @desc Used for circle and square
 * @type text
 * @default 64
 * 
 * @param Bar Width
 * @desc The width of the bar
 * @type text
 * @default 2
 * 
 * @param Scale X
 * @desc How much to scale by
 * @type text
 * @default 1
 * 
 * @param Scale Y
 * @desc How much to scale by
 * @type text
 * @default 1
 * 
 * @param Color
 * @desc The bar hex color
 * Leave empty for random
 * @type text
 * 
 */
/*~struct~gameConfig:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default Game
 * 
 * @param Identifier
 * @desc Unique identifier for game configuration
 * @type text
 * @default game
 * 
 * @param End Event
 * @desc Calls common event on game end
 * @type common_event
 * @default 0
 * 
 * @param Score Sprite Configuration
 * @desc Setup score sprite
 * @type struct<scoreSprite>
 * 
 * @param Duration
 * @desc Sets the duration for the game if no BGM
 * @type text
 * @default 1800
 * 
 * @param BGM
 * @desc Setup custom BGM to play during game
 * Ignores duration if set
 * @type struct<musicBGM>
 * 
 * @param Sound Popup
 * @desc Play sound based on input timing
 * @type struct<popupSe>
 * 
 * @param Game Speed
 * @desc How fast buttons move towards target area
 * @type text
 * @default 6
 * 
 * @param Start Buffer
 * @desc Time before the game starts
 * Used in auto mode
 * @type text
 * @default 60
 * 
 * @param Start Buffer SE
 * @desc Used alternatively to fixed "Start Buffer"
 * Used in auto mode
 * @type struct<audioSe>
 * 
 * @param Start Buffer Play Count
 * @parent Start Buffer SE
 * @desc Number of times to play SE before starting game
 * @type text
 * @default 3
 * 
 * @param Input Buffer
 * @parent Game Speed
 * @desc Time granted for hold input before decay
 * @type text
 * @default 12
 * 
 * @param Hold Length Per Frame
 * @desc Set the draw length per hold frame
 * Value is pixels per frame
 * @type text
 * @default 3
 * 
 * @param Hold Color
 * @desc Set the color for holding
 * @type text
 * @default #0000ff
 * 
 * @param Button Rails
 * @desc Setup rails for each button
 * @type struct<gameRail>[]
 * @default []
 * 
 * @param Button Spawn
 * @desc Setup button spawns
 * @type struct<buttonSpawn>[]
 * @default []
 * 
 * @param Button Score
 * @parent Button Spawn
 * @desc Score on triggering button
 * @type text
 * @default 100
 * 
 * @param Button Hold Score
 * @parent Button Spawn
 * @desc Max Score for holding button
 * @type text
 * @default 100
 * 
 * @param Auto Setup
 * @desc Automatically spawns buttons based on
 * audio
 * @type boolean
 * @default false
 * 
 * @param Visualizer
 * @parent Auto Setup
 * @desc A visualizer of the BGM
 * Leave parameter empty to  disable
 * @type struct<autoVisualizer>
 * 
 * @param Auto FFT
 * @parent Auto Setup
 * @desc Fast Fourier Transformvalue for auto bgm
 * @type number
 * @min 32
 * @max 32768
 * @default 2048
 * 
 * @param Auto Rail Setup
 * @parent Auto Setup
 * @desc Determine consideration points for rails
 * Determine wave amplitude index to start and end
 * @type struct<autoRailSetup>[]
 * @default[]
 * 
 * @param Auto Spawn Cooldown
 * @parent Auto Setup
 * @desc Add a cooldown for button spawn
 * @type text
 * @default 48
 * 
 * @param Auto Threshold
 * @parent Auto Setup
 * @desc The Audio wave threshold value to begin check
 * @type text
 * @default 80
 * 
 * @param Auto Trigger Threshold
 * @parent Auto Setup
 * @desc The press time needed for a trigger button
 * @type text
 * @default 6
 * 
 * @param Auto Press Threshold
 * @parent Auto Setup
 * @desc The press time needed for a hold button
 * @type text
 * @default 60
 * 
 * @param Auto Shift Spawn
 * @parent Auto Setup
 * @desc Ignores autospawn thresholds above in favour
 * of a "smart" system. May fail.
 * @type boolean
 * @default false
 * 
 * @param Auto Shift Decay
 * @parent Auto Shift Spawn
 * @desc Controls rate of threshold check decay
 * @type text
 * @default 1
 * 
 */
/*~struct~animGfx:
 * 
 * @param Graphic
 * @desc Picture to be used
 * @type file
 * @dir img/pictures/
 * 
 * @param Frames
 * @desc Number of graphic frames
 * @type text
 * @default 1
 * 
 * @param Frame Rate
 * @desc Number of graphic frames
 * @type text
 * @default 1
 * 
 * @param Offset X
 * @desc Offset Value
 * @type text
 * @default 0
 * 
 * @param Offset Y
 * @desc Offset Value
 * @type text
 * @default 0
 * 
 */
/*~struct~btnGameConfig:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default Button
 * 
 * @param Identifier
 * @desc Set the associated button
 * @type select
 * @option ok
 * @option cancel
 * @option up
 * @option down
 * @option left
 * @option right
 * @option pageup
 * @option pagedown
 * @default ok
 * 
 * @param Graphic
 * @desc Sets the animated graphic
 * @type struct<animGfx>
 * 
 */
/*~struct~buttonSpawn:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default Button
 * 
 * @param Identifier
 * @desc Set the associated button
 * @type select
 * @option ok
 * @option cancel
 * @option up
 * @option down
 * @option left
 * @option right
 * @option pageup
 * @option pagedown
 * @default ok
 * 
 * @param Trigger Only
 * @desc Ignores holding time and score
 * @type boolean
 * @default false
 * 
 * @param Spawn Time
 * @desc Time at which to spawn button
 * @type text
 * @default 0
 * 
 * @param Hold Time
 * @desc Time for button press before valid confirm
 * Time in frames
 * @type text
 * @default 1
 * 
 */
/*~struct~musicBGM:
 * 
 * @param name
 * @text Name
 * @desc Select BGM file
 * @type file
 * @dir audio/bgm/
 * 
 * @param volume
 * @text Volume
 * @desc Loudness
 * @type text
 * @default 90
 * 
 * @param pitch
 * @text Pitch
 * @desc Tone
 * @type text
 * @default 100
 * 
 * @param pan
 * @text Pan
 * @desc Balance
 * @type text
 * @default 0
 * 
 */
/*~struct~gameRail:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default Rail
 * 
 * @param X
 * @desc Screen position setting
 * @type text
 * @default 0
 * 
 * @param Y
 * @desc Screen position setting
 * @type text
 * @default 0
 * 
 * @param Rotation
 * @desc How much to rotate the rail
 * @type text
 * @default 0
 * 
 * @param Button
 * @desc Set the associated button
 * @type select
 * @option ok
 * @option cancel
 * @option up
 * @option down
 * @option left
 * @option right
 * @option pageup
 * @option pagedown
 * @default ok
 * 
 * @param Spawn Times
 * @desc Set time at which button spawns
 * @type text[]
 * @default []
 * 
 * @param Background
 * @desc Set the image for background
 * Right end of image used for spawn point.
 * @type file
 * @dir img/pictures/
 * 
 * @param Foreground
 * @desc Set the image for background
 * Left end of image used for confirm point.
 * @type file
 * @dir img/pictures/
 * 
 * @param Battle Skill
 * @desc If the skill is used by battler, execute skill
 * @type skill
 * @default 0
 * 
 * @param Update Functions
 * @desc Execute these scripts per update
 * @type note[]
 * @default []
 * 
 */

function ANIM_GFX_PARSER_RHYTHM(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function BUTTON_SPAWN_PARSER_RHYTHM(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function BGM_PARSER_RHYTHM(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function SE_PARSER_RHYTHM(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function SOUND_POPUPS_PARSER_RHYTHM(obj){
    try{
        obj = JSON.parse(obj);
        try{
            obj['Bad Popup'] = JSON.parse(obj['Bad Popup']).map((config)=>{
                return SE_PARSER_RHYTHM(config);
            }).filter(Boolean);
        }catch(e){
            obj['Bad Popup'] = [];
        }
        try{
            obj['Good Popup'] = JSON.parse(obj['Good Popup']).map((config)=>{
                return SE_PARSER_RHYTHM(config);
            }).filter(Boolean);
        }catch(e){
            obj['Good Popup'] = [];
        }
        try{
            obj['Perfect Popup'] = JSON.parse(obj['Perfect Popup']).map((config)=>{
                return SE_PARSER_RHYTHM(config);
            }).filter(Boolean);
        }catch(e){
            obj['Perfect Popup'] = [];
        }
        return obj;
    }catch(e){
        const obj = {};
        obj['Bad Popup'] = [];
        obj['Good Popup'] = [];
        obj['Perfect Popup'] = [];
        return obj;
    }
}

function BUTTON_RAIL_PARSER_RHYTHM(obj){
    try{
        obj = JSON.parse(obj);
        try{
            obj['Spawn Times'] = JSON.parse(obj['Spawn Times']);
        }catch(e){
            obj['Spawn Times'] = [];
        }
        try{
            obj['Update Functions'] = JSON.parse(obj['Update Functions']).map((note)=>{
                try{
                    return JSON.parse(note);
                }catch(e){
                    return;
                }
            }).filter(Boolean)
        }catch(e){
            obj['Update Functions'] = [];
        }
        return obj;
    }catch(e){
        return;
    }
}

function SCORE_SPRITE_PARSER_RHYTHM(obj){
    try{
        obj = JSON.parse(obj);
        obj['Graphic'] = ANIM_GFX_PARSER_RHYTHM(obj['Graphic']);
        return obj;
    }catch(e){
        return;
    }
}

function AUTO_RAIL_PARSER_RHYTHM(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function AUTO_VISUALIZER_PARSER_RHYTHM(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function GAME_PARSER_RHYTHM(obj){
    try{
        obj = JSON.parse(obj)
        obj['Score Sprite Configuration'] = SCORE_SPRITE_PARSER_RHYTHM(obj['Score Sprite Configuration']);
        obj['BGM'] = BGM_PARSER_RHYTHM(obj['BGM']);
        obj['Sound Popup'] = SOUND_POPUPS_PARSER_RHYTHM(obj['Sound Popup']);
        obj['Start Buffer SE'] = SE_PARSER_RHYTHM(obj['Start Buffer SE']);
        try{
            obj['Button Rails'] = JSON.parse(obj['Button Rails']).map((config)=>{
                return BUTTON_RAIL_PARSER_RHYTHM(config);
            }).filter(Boolean)
        }catch(e){
            obj['Button Rails'] = [];
        }
        try{
            obj['Button Spawn'] = JSON.parse(obj['Button Spawn']).map((config)=>{
                return BUTTON_SPAWN_PARSER_RHYTHM(config);
            }).filter(Boolean)
        }catch(e){
            obj['Button Spawn'] = [];
        }
        obj['Visualizer'] = AUTO_VISUALIZER_PARSER_RHYTHM(obj['Visualizer']);
        try{
            obj['Auto Rail Setup'] = JSON.parse(obj['Auto Rail Setup']).map((config)=>{
                return AUTO_RAIL_PARSER_RHYTHM(config);
            }).filter(Boolean)
        }catch(e){
            obj['Auto Rail Setup'] = [];
        }
        return obj;
    }catch(e){
        return;
    }
}

function ANIM_GFX_PARSER_RHYTHM(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function BUTTON_PARSER_RHYTHM(obj){
    try{
        obj = JSON.parse(obj);
        obj['Graphic'] = ANIM_GFX_PARSER_RHYTHM(obj['Graphic']);
        return obj
    }catch(e){
        return;
    }
}

function SKILL_PARSER_RHYTHM(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

const Syn_Rhythm = {};
Syn_Rhythm.Plugin = PluginManager.parameters(`Syn_Rhythm`);
Syn_Rhythm.SCORE_VAR_ID = eval(Syn_Rhythm.Plugin['Score Variable']);
Syn_Rhythm.HOLD_PER_FRAME = Syn_Rhythm.Plugin['Hold Length Per Frame'];
Syn_Rhythm.HOLD_COLOR = Syn_Rhythm.Plugin['Hold Color'];
Syn_Rhythm.DO_NOT_DESTROY_BUTTON = eval(Syn_Rhythm.Plugin['Do Not Destroy']);
Syn_Rhythm.KEEP_ALIVE = eval(Syn_Rhythm.Plugin['Keep Project Alive']);

try{
    Syn_Rhythm.GAME_CONFIGURATIONS = JSON.parse(Syn_Rhythm.Plugin['Game Configurations']).map((config)=>{
        return GAME_PARSER_RHYTHM(config);
    }).filter(Boolean)
}catch(e){
    Syn_Rhythm.GAME_CONFIGURATIONS = [];
}

try{
    Syn_Rhythm.BUTTON_CONFIGURATIONS = JSON.parse(Syn_Rhythm.Plugin['Button Configurations']).map((config)=>{
        return BUTTON_PARSER_RHYTHM(config);
    }).filter(Boolean)
}catch(e){
    Syn_Rhythm.BUTTON_CONFIGURATIONS = [];
}

try{
    Syn_Rhythm.SKILL_CONFIGURATIONS = JSON.parse(Syn_Rhythm.Plugin['Skill Configurations']).map((config)=>{
        return SKILL_PARSER_RHYTHM(config);
    }).filter(Boolean)
}catch(e){
    Syn_Rhythm.SKILL_CONFIGURATIONS = [];
}

if(Utils.RPGMAKER_NAME == "MZ"){
    PluginManager.registerCommand(`Syn_Rhythm`, `Start Rhythm`, (obj)=>{
        const id = obj['Identifier'];
        if(!id)return;
        $gameTemp.startRhythmGame(id);
    })
}

Syn_Rhythm_ScnMngr_IsGmActv = SceneManager.isGameActive;
SceneManager.isGameActive = function() {
    if(Syn_Rhythm.KEEP_ALIVE){
        return true;
    }
    return Syn_Rhythm_ScnMngr_IsGmActv.call(this, ...arguments);
}

Syn_Rhythm_BattMngr_IsBusy = BattleManager.isBusy;
BattleManager.isBusy = function() {
    return (
        Syn_Rhythm_BattMngr_IsBusy.call(this, ...arguments)||
        !!$gameTemp.rhythmGame()
    );
}

Game_Temp.prototype.startRhythmGame = function(id, battler, targets){
    this.endRhythmGame();
    const game_config = Syn_Rhythm.GAME_CONFIGURATIONS.find((config)=>{
        return config['Identifier'] == id;
    })
    if(!game_config){
        console.error(`Failed to located game configuration for: ${id}`);
        return;
    }
    this._rhythm_game = JsonEx.makeDeepCopy(game_config);
    const scene = SceneManager._scene;
    const game_controller = new SpriteRhythm_Controller();
    scene.addChild(game_controller);
    this._rhythm_controller = game_controller;
    this._rhythm_battler = battler;
    this._rhythm_targets = targets;
}

Game_Temp.prototype.rhythmGame = function(){
    return this._rhythm_game;
}

Game_Temp.prototype.rhythmController = function(){
    return this._rhythm_controller;
}

Game_Temp.prototype.rhythmBattler = function(){
    return this._rhythm_battler;
}

Game_Temp.prototype.rhythmTargets = function(){
    return this._rhythm_targets;
}

Game_Temp.prototype.endRhythmGame = function(){
    const config = this.rhythmGame();
    if(config){
        const end_event = eval(config['End Event']);
        if(end_event){
            this.reserveCommonEvent(end_event);
        }
    }
    const controller = this.rhythmController();
    if(!controller)return;
    if(controller.parent){
        controller.parent.removeChild(controller);
    }
    this._rhythm_battler = null;
    this._rhythm_controller = null;
    this._rhythm_game = null;
    Input.clear();
}

Syn_Rhythm_GmActn_MkDmgVal = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue = function(target, critical) {
    const base = Syn_Rhythm_GmActn_MkDmgVal.call(this, ...arguments);
    const dmg_ratio = this._dmg_ratio;
    if(isNaN(dmg_ratio))return base;
    return Math.round(base * dmg_ratio);
}

Syn_Rhythm_GmPlyr_CanMov = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
    if (!!$gameTemp.rhythmGame()) {
        return false;
    }
    return Syn_Rhythm_GmPlyr_CanMov.call(this, ...arguments);
}
/**
 * The following is for the tactical battle system.
 */
Game_MapBattler.prototype.processRhythmGame = function(){
    const coords = this._targetHitBatt.coords;
    const origin = this._targetHitBatt.origin;
    const action = this._targetHitBatt.action;
    const data = this._targetHitBatt.data;
    if(!DataManager.isSkill(data))return;
    const skill_id = data.id;
    const skill_config = Syn_Rhythm.SKILL_CONFIGURATIONS.find((config)=>{
        return eval(config['Skill']) == skill_id;
    })
    if(!skill_config)return;
    const enemies = this._battler.isActor() ? this.getValidEnemies(coords, data) : this.getValidActors(coords, data);
    const allies = this._battler.isActor() ? this.getValidActors(coords, data) : this.getValidEnemies(coords, data);
    const configuration = getConfigurationDataTBS(data, this);
    let targets = [];
    const confuseType = this._confuseType;
    const isConfused = this._battler.isConfused();
    if((this.isEnemyScope(data) || isConfused) && [0,1,2].includes(confuseType)){
        targets = targets.concat(enemies);
    }
    if((this.isAllyScope(data) || isConfused) && [0,2,3].includes(confuseType)){
        targets = targets.concat(allies);
    }
    if((this.isUserScope(data) || isConfused) && [0,2].includes(confuseType)){
        for(let i = 0; i < coords.length; i++){
            const coord = coords[i];
            const x = coord[0];
            const y = coord[1];
            if(this.x == x && this.y == y){
                targets.push(this);
            }
        }
    }
    targets = this.filterTargets(targets, action);
    targets = targets.filter(Boolean);
    if(targets.length <= 0)return;
    const hitTargets = targets.map(target => target._battler);
    const rhythm_id = skill_config['Rhythm Game'];
    const battler = this._battler;
    $gameTemp.startRhythmGame(rhythm_id, battler, hitTargets)
}

Syn_Rhythm_GmMapBatt_AppHitBatt = Game_MapBattler.prototype.applyHitBatt;
Game_MapBattler.prototype.applyHitBatt = function(){
    if(!this._targetHitBatt)return;
    if(!this._targetHitBatt.rhythm){
        this.processRhythmGame();
        this._targetHitBatt.rhythm = true;
        return;
    }
    Syn_Rhythm_GmMapBatt_AppHitBatt.call(this, ...arguments);
}

function SpriteRhythm_AnimGfx(){
    this.initialize(...arguments);
}

SpriteRhythm_AnimGfx.prototype = Object.create(Sprite.prototype);
SpriteRhythm_AnimGfx.prototype.constructor = SpriteRhythm_AnimGfx;

SpriteRhythm_AnimGfx.prototype.initialize = function(gfx_obj){
    Sprite.prototype.initialize.call(this);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.setGfx(gfx_obj);
}

SpriteRhythm_AnimGfx.prototype.setGfx = function(gfx_obj){
    this._gfx = gfx_obj;
    if(gfx_obj){
        const x = eval(gfx_obj['Offset X']) || 0;
        const y = eval(gfx_obj['Offset Y']) || 0;
        this.move(x, y);
    }else{
        this.bitmap = null;
    }
    this._frame_update = 0;
    this._cur_frame = 0;
    this.updateFrames();
}

SpriteRhythm_AnimGfx.prototype.update = function(){
    Sprite.prototype.update.call(this);
    this.updateBitmap();
    this.updateFrames();
}

SpriteRhythm_AnimGfx.prototype.updateBitmap = function(){
    const gfx_obj = this._gfx;
    if(!gfx_obj){
        this.bitmap = null;
        return;
    }
    const bitmap_name = gfx_obj['Graphic'];
    if(bitmap_name){
        const bitmap = ImageManager.loadPicture(bitmap_name);
        this.bitmap = bitmap;
    }
}

SpriteRhythm_AnimGfx.prototype.updateFrames = function(){
    const gfx_obj = this._gfx;
    if(!this.bitmap || !gfx_obj)return;
    if(this._frame_update <= 0){
        try{
            this._frame_update = JsonEx.makeDeepCopy(gfx_obj['Frame Rate']);
        }catch(e){
            console.error(`Failed to parse update rate from gfx obj. ${e}`);
            this._frame_update = 6;
        }
        const frames = gfx_obj['Frames'];
        const bitmap = this.bitmap;
        const bw = bitmap.width / frames;
        const bh = bitmap.height;
        const bx = bw * this._cur_frame;
        const by = 0;
        this.setFrame(bx,by,bw,bh);
        this._cur_frame++;
        if(this._cur_frame >= frames){
            this._cur_frame = 0;
        }
    }else this._frame_update--;
}

function SpriteRhythm_GameButton(){
    this.initialize(...arguments);
}

SpriteRhythm_GameButton.prototype = Object.create(SpriteRhythm_AnimGfx.prototype);
SpriteRhythm_GameButton.prototype.constructor = SpriteRhythm_GameButton;

SpriteRhythm_GameButton.prototype.initialize = function(data){
    Sprite.prototype.initialize.call(this);
    this.setupData(data);
    this.createHoldSprite();
}

SpriteRhythm_GameButton.prototype.inValidArea = function(){
    const parent = this.parent;
    if(!parent)return false;
}

SpriteRhythm_GameButton.prototype.triggerActivate = function(){
    const valid = this.inValidArea();
    this.triggerButton(valid);
}

SpriteRhythm_GameButton.prototype.triggerButton = function(valid){
    if(!valid){
        SoundManager.playBuzzer();
        this._delete = true;
        return;
    }else{
        SoundManager.playOk();
        this._active = true;
    }
}

SpriteRhythm_GameButton.prototype.isButtonPressed = function(){
    const data = this._data;
    const btn_id = data['Identifier'];
    return Input.isPressed(btn_id);
}

SpriteRhythm_GameButton.prototype.setupData = function(data){
    this._data = data;
    this._hold_time = eval(data['Hold Time']);
    const id = data['Identifier'];
    const config = Syn_Rhythm.BUTTON_CONFIGURATIONS.find((btn)=>{
        return btn['Identifier'] == id;
    })
    if(!config){
        throw new Error(`Button: ${id} is not configured.`);
    }
    const gfx = config['Graphic'];
    if(!gfx){
        throw new Error(`You need to set graphic for the button.`);
    }
    this.setGfx(gfx);
}

SpriteRhythm_GameButton.prototype.createHoldSprite = function(){
    const data = this._data;
    const hold_per_frame = eval(Syn_Rhythm.HOLD_PER_FRAME);
    this._max_hold = JsonEx.makeDeepCopy(this._hold_time);
    const bw = hold_per_frame * this._max_hold;
    const bh = this.height * 0.5;
    const sprite = new Sprite();
    sprite.rotation = Math.PI;
    sprite.y = bh * -0.5;
    sprite.bitmap = new Bitmap(bw, bh);
    sprite.bitmap.fillRect(0,0,bw,bh,Syn_Rhythm.HOLD_COLOR);
    if(!eval(data['Trigger Only'])){
        this.addChild(sprite);
    }
    this._hold_sprite = sprite;
}

SpriteRhythm_GameButton.prototype.removeButton = function(){
    if(this.parent){
        this.parent.destroyButton(this);
    }
    if(!Syn_Rhythm.DO_NOT_DESTROY_BUTTON){
        if(this.destroy)this.destroy();
    }else{
        this.setGfx(null)
    }
    delete this;
}

SpriteRhythm_GameButton.prototype.update = function(){
    SpriteRhythm_AnimGfx.prototype.update.call(this, ...arguments);
    this.updatePressed();
    this.updateHoldGfx();
}

SpriteRhythm_GameButton.prototype.updatePressed = function(){
    if(!this._active)return;
    if(this.isButtonPressed()){
        this._hold_time--;
    }
}

SpriteRhythm_GameButton.prototype.updateHoldGfx = function(){
    const cur_time = this._hold_time;
    const max_time = this._max_hold;
    const ratio = (cur_time/max_time).clamp(0, 1);
    const hold_per_frame = eval(Syn_Rhythm.HOLD_PER_FRAME);
    const sprite = this._hold_sprite;
    const bitmap = sprite.bitmap;
    bitmap.clear();
    const bw = hold_per_frame * this._max_hold * ratio;
    const bh = this.height * 0.5;
    sprite.y = bh * 1.5;
    if(!this._hold_resize){
        if(isNaN(this._rfsh))this._rfsh = 0;
        sprite.bitmap = new Bitmap(hold_per_frame * this._max_hold, bh || 16);
        this._rfsh++;
        if(this._rfsh > 6){
            this._hold_resize = true;
        }
    }
    bitmap.fillRect(0, 0, bw, bh, Syn_Rhythm.HOLD_COLOR);
}

function SpriteRhythm_GameRail(){
    this.initialize(...arguments);
}

SpriteRhythm_GameRail.prototype = Object.create(Sprite.prototype);
SpriteRhythm_GameRail.prototype.constructor = SpriteRhythm_GameRail;

SpriteRhythm_GameRail.prototype.initialize = function(data){
    Sprite.prototype.initialize.call(this);
    this._buttons = [];
    this.createForeground();
    this.setupData(data);
    Input.clear();
}

SpriteRhythm_GameRail.prototype.confirmButton = function(){
    if(this._holding)return;
    const buttons = this._buttons;
    if(buttons.length <= 0){
        this._is_triggered = false;
        SoundManager.playBuzzer();
        return;
    }
    const button = buttons.shift();
    if(button){
        const data = button._data
        const trigger_only = eval(data['Trigger Only']);
        const game_config = $gameTemp.rhythmGame();
        const trigger_score = eval(game_config['Button Score']) || 0;
        const sounds = game_config['Sound Popup'];
        const bad_sounds = sounds['Bad Popup'];
        const good_sounds = sounds['Good Popup'];
        const perfect_sounds = sounds['Perfect Popup'];
        let skill_scale = 0;
        this._holding = 1;
        const bx = button.x;
        const bw = button.width;
        const score_var_id = Syn_Rhythm.SCORE_VAR_ID;
        const old_value = $gameVariables.value(score_var_id);
        const fg = this._foreground;
        const fg_x = fg.x;
        const fg_w = fg.width;
        if(
            (bx + bw) <= (fg_x + fg_w) &&
            bx >= fg_x
        ){
            const new_value = old_value + trigger_score;
            $gameVariables.setValue(score_var_id, new_value);
            if(perfect_sounds.length > 0){
                const se_index = Math.randomInt(perfect_sounds.length);
                const sound = perfect_sounds[se_index];
                sound.volume = eval(sound.volume);
                sound.pitch = eval(sound.pitch);
                sound.pan = eval(sound.pan);
                AudioManager.playSe(sound);
            }else{
                SoundManager.playOk();
            }
            if(!trigger_only){
                this._held_button = button;
                this._hold_scale = 1;
            }else{
                this._is_triggered = false;
                this.executeSkill(100);
                button.removeButton();
            }
        }else if(
            (
                (bx + bw) < fg_x ||
                (bx + bw) > (fg_x + fg_w)
            ) &&
            (
                bx < fg_x ||
                bx > (fg_x + fg_w)
            )
        ){
            this._is_triggered = false;
            this.executeSkill(0);
            if(bad_sounds.length > 0){
                const se_index = Math.randomInt(bad_sounds.length);
                const sound = bad_sounds[se_index];
                sound.volume = eval(sound.volume);
                sound.pitch = eval(sound.pitch);
                sound.pan = eval(sound.pan);
                AudioManager.playSe(sound);
            }else{
                SoundManager.playBuzzer();
            }
            button.removeButton();
        }else{
            if(
                bx < fg_x &&
                (bx + bw) <= (fg_x + fg_w)
            ){
                const sep = fg_x - bx;
                const score_ratio = 1 - (sep / fg_w);
                const score_bonus = Math.min(99, Math.floor(Math.abs(99 * score_ratio)));
                const new_value = old_value + score_bonus;
                $gameVariables.setValue(score_var_id, new_value);
                if(good_sounds.length > 0){
                    const se_index = Math.randomInt(good_sounds.length);
                    const sound = good_sounds[se_index];
                    sound.volume = eval(sound.volume);
                    sound.pitch = eval(sound.pitch);
                    sound.pan = eval(sound.pan);
                    AudioManager.playSe(sound);
                }else{
                    SoundManager.playOk();
                }
                if(!trigger_only){
                    this._held_button = button;
                    this._hold_scale = score_ratio;
                }else{
                    this._is_triggered = false;
                    this.executeSkill(100 * score_ratio);
                    button.removeButton();
                }
            }else if(
                bx >= fg_x &&
                (bx + bw) > (fg_x + fg_w)
            ){
                const sep = (bx + bw) - (fg_x + fg_w);
                const score_ratio = 1 - (sep / fg_w);
                const score_bonus = Math.min(99, Math.floor(Math.abs(99 * score_ratio)));
                const new_value = old_value + score_bonus;
                $gameVariables.setValue(score_var_id, new_value);
                SoundManager.playOk();
                if(!trigger_only){
                    this._held_button = button;
                    this._hold_scale = score_ratio;
                }else{
                    this._is_triggered = false;
                    this.executeSkill(100 * score_ratio);
                    button.removeButton();
                }
            }
        }
        if(this._held_button && $gameTemp.rhythmBattler()){
            this._skill_scale = this._hold_scale;
        }
    }
}

SpriteRhythm_GameRail.prototype.executeSkill = function(scale){
    let  map_tbs = false;
    if($gameMap.isTBS){
        map_tbs = $gameMap.isTBS();
    }
    const log_window = BattleManager._logWindow;
    if(!log_window && !map_tbs)return;
    const battler = $gameTemp.rhythmBattler();
    if(!battler)return;
    const data = this._data;
    const skill_id = eval(data['Battle Skill']);
    if(!skill_id)return;
    const skill_data = $dataSkills[skill_id];
    const scale_ratio = battler.isActor() ? (scale / 100) : (1 - (scale / 100));
    const action = new Game_Action(battler);
    action.setSkill(skill_id);
    action._dmg_ratio = scale_ratio;
    if(scale_ratio <= 0 && !map_tbs){
        log_window.performAction(battler, action);
        return;
    }
    const targets = $gameTemp.rhythmTargets();
    targets.forEach((target)=>{
        action.apply(target);
        target.startDamagePopup();
        target.refresh();
        if(!map_tbs){
            log_window.displayAddedStates(target);
        }
    })
    if(!map_tbs){
        log_window.showAnimation(battler, targets, skill_data.animationId);
    }else if(map_tbs){
        const configuration = getConfigurationDataTBS(data, this);
        const target_anim = configuration['Animation Type'] == 'target';
        const anim = data.animationId;
        const map_battlers = $gameMap._enemies.concat($gameMap._actors);
        const map_targets = targets.map((battler)=>{
            return map_battlers.find((map_char)=>{
                return map_char._battler == battler;
            })
        }).filter(Boolean)
        if(target_anim && anim > 0){
            if(TBS_MV_MODE){
                map_targets.forEach((target)=>{
                    target.requestAnimation(anim);
                })
            }else{
                $gameTemp.requestAnimation(map_targets, anim);
            }
        }
    }
}

SpriteRhythm_GameRail.prototype.releaseButton = function(){
    const score_var_id = Syn_Rhythm.SCORE_VAR_ID;
    const old_value = $gameVariables.value(score_var_id);
    const held_button = this._held_button;
    if(!held_button){
        this._held_button = null;
        this._holding = 0;
        this._hold_scale = 0;
        return;
    }
    const score_ratio = this._hold_scale;
    if(!held_button._destroyed){
        const game_config = $gameTemp.rhythmGame();
        const hold_score = eval(game_config['Button Hold Score']);
        const max_score = Math.round(hold_score * score_ratio);
        const input_buffer = eval(game_config['Input Buffer']) || 0;
        const btn_data = held_button._data;
        const max_hold_time = eval(btn_data['Hold Time']) || 1;
        const hold_time = this._holding;
        if(
            hold_time == max_hold_time ||
            (
                hold_time + input_buffer <= max_hold_time &&
                hold_time > max_hold_time
            ) ||
            (
                hold_time > max_hold_time &&
                hold_time - input_buffer <= max_hold_time
            )
        ){
            const new_value = Math.max(0, (old_value + max_score))
            $gameVariables.setValue(score_var_id, new_value);
        }else{
            let ratio = hold_time / max_hold_time;
            if(ratio > 1){
                ratio = 1 - (ratio.mod(1));
            }
            const score = Math.round(max_score * ratio);
            const new_value = Math.max(0, old_value + score);
            $gameVariables.setValue(score_var_id, new_value);
        }
        held_button.removeButton();
    }
    this.executeSkill(Math.round(100 * score_ratio));
    this._held_button = null;
    this._holding = 0;
}

SpriteRhythm_GameRail.prototype.createButton = function(spawn_data){
    const button = new SpriteRhythm_GameButton(spawn_data)
    this.addChild(button);
    this._buttons.push(button);
}

SpriteRhythm_GameRail.prototype.destroyButton = function(btn){
    if(!btn)return;
    const btn_index = this._buttons.indexOf(btn);
    if(btn_index >= 0){
        this._buttons.splice(btn_index, 1);
        this.removeChild(btn);
    }
}

SpriteRhythm_GameRail.prototype.createForeground = function(){
    const sprite = new Sprite();
    this.addChild(sprite);
    this._foreground = sprite;
}

SpriteRhythm_GameRail.prototype.setupData = function(data){
    this._data = data;
    if(!data)return;
    const x = eval(data['X']) || 0;
    const y = eval(data['Y']) || 0;
    this.move(x, y);
    const r = eval(data['Rotation']) || 0;
    this.rotation = r;
    const bg_name = data['Background'];
    if(!bg_name){
        throw new Error(`Game rail needs a background image.`);
    }
    const fg_name = data['Foreground'];
    if(!fg_name){
        throw new Error(`Game rail needs a foreground image.`);
    }
    this.bitmap = ImageManager.loadPicture(bg_name);
    const foreground = this._foreground;
    foreground.bitmap = ImageManager.loadPicture(fg_name);
    this._spawned_buttons = [];
}

SpriteRhythm_GameRail.prototype.update = function(){
    Sprite.prototype.update.call(this);
    this.updateForegroundPosition();
    this.updateButtonPositions();
    this.updateInput();
    this.updateHolding();
    this.updateFunctions();
}

SpriteRhythm_GameRail.prototype.updateForegroundPosition = function(){
    const foreground = this._foreground;
    const fw = foreground.width;
    const bitmap = this.bitmap;
    const bw = bitmap.width;
    foreground.x = bw - fw;
}

SpriteRhythm_GameRail.prototype.updateButtonPositions = function(){
    const foreground = this._foreground;
    const fx = foreground.x;
    const fw = foreground.width;
    const game_config = $gameTemp.rhythmGame();
    const spd = eval(game_config['Game Speed']) || 1;
    const buttons = this._buttons;
    for(let i = 0; i < buttons.length; i++){
        const btn = buttons[i];
        btn.x += spd;
        if(btn.x > fx + fw){
            SoundManager.playBuzzer();
            this.executeSkill(0);
            btn.removeButton();
            i--;
        }
    }
}

SpriteRhythm_GameRail.prototype.updateInput = function(){
    const data = this._data;
    const btn_id = data['Button'];
    if(Input.isTriggered(btn_id) && !this._is_triggered){
        this._is_triggered = true;
    }
    if(this._is_triggered){
        if(Input.isPressed(btn_id)){
            this.confirmButton();
        }else{
            this.releaseButton();
            this._is_triggered = false;
        }
    }
}

SpriteRhythm_GameRail.prototype.updateHolding = function(){
    if(this._held_button){
        this._held_button._active = true;
        if(isNaN(this._holding))this._holding = 1;
        this._holding++;
    }else{
        this._holding = 0;
    }
}

SpriteRhythm_GameRail.prototype.updateFunctions = function(){
    const data = this._data;
    const update_functions = data['Update Functions'];
    update_functions.forEach((note)=>{
        try{
            eval(note);
        }catch(e){
            console.error(e);
        }
    })
}

function SpriteRhythm_Visualizer(){
    this.initialize(...arguments);
}

SpriteRhythm_Visualizer.prototype = Object.create(Sprite.prototype);
SpriteRhythm_Visualizer.prototype.constructor = SpriteRhythm_Visualizer;

SpriteRhythm_Visualizer.prototype.initialize = function(){
    Sprite.prototype.initialize.call(this);
    const game_config = $gameTemp.rhythmGame();
    const data = game_config['Visualizer'];
    this.move(0, 0);
    this.scale.x = eval(data['Scale X']);
    this.scale.y = eval(data['Scale Y']);
    this._draw_mode = data['Draw Mode'];
    this._fixed_color = data['Color'];
    this._data = data;
    this.bitmap = new Bitmap(Graphics.width, Graphics.height);
    this.createGfxPIXI();
    // this.anchor.x = 0.5;
    // this.anchor.y = 1;
}

SpriteRhythm_Visualizer.prototype.createGfxPIXI = function(){
    const pixi = new PIXI.Graphics();
    this.addChild(pixi);
    this._pixi = pixi;
}

SpriteRhythm_Visualizer.prototype.generateRandomColor = function(){
    const base_r = Math.randomInt(255);
    const base_g = Math.randomInt(255);
    const base_b = Math.randomInt(255);
    const mult_r = Math.random() < 0.5 ? -1 : 1;
    const mult_g = Math.random() < 0.5 ? -1 : 1;
    const mult_b = Math.random() < 0.5 ? -1 : 1;
    const calc_r = !isNaN(this._last_r) ? (this._last_r + Math.randomInt(2) * mult_r).clamp(0, 255) : 0
    const calc_g = !isNaN(this._last_g) ? (this._last_g + Math.randomInt(2) * mult_g).clamp(0, 255) : 0
    const calc_b = !isNaN(this._last_b) ? (this._last_b + Math.randomInt(2) * mult_b).clamp(0, 255) : 0
    this._last_r = calc_r || base_r;
    this._last_g = calc_g || base_g;
    this._last_b = calc_b || base_b;
    const r = (calc_r ? calc_r : base_r).toString(16).padZero(2); 
    const g = (calc_g ? calc_g : base_g).toString(16).padZero(2); 
    const b = (calc_b ? calc_b : base_b).toString(16).padZero(2);
    const color = this._saved_color || `#${r}${g}${b}`;
    if(!this._saved_color){
        this._saved_color = color;
        this._color_cooldown = 30;
    }else{
        this._color_cooldown--;
        if(this._color_cooldown <= 0){
            this._saved_color = null;
        }
    }
    return color;
}

SpriteRhythm_Visualizer.prototype.convertTo0XHEX = function(str){
    const nums = str.slice(str.indexOf('#') + 1);
    return eval(`0x${nums}`);
}

SpriteRhythm_Visualizer.prototype.drawCircle = function(){
    const visualizer_settings = this._data;
    const display_array = this._data_array;
    const pixi = this._pixi;
    pixi.clear();
    const r = eval(visualizer_settings['Inner Radius']) || 0;
    const x = eval(visualizer_settings['Screen X']) || 0;
    const y = eval(visualizer_settings['Screen Y']) || 0;
    const w = eval(visualizer_settings['Bar Width']);
    const a = (Math.PI * 2) / display_array.filter(Boolean).length * w;
    for(let i = 0; i < display_array.length; i++){
        const color = this.convertTo0XHEX(visualizer_settings['Color'] || this.generateRandomColor());
        const angle = a * i;
        const mag = display_array[i];
        const cx = x + r * Math.cos(angle);
        const cy = y + r * Math.sin(angle);
        const tx = cx + mag * Math.cos(angle);
        const ty = cy + mag * Math.sin(angle);
        pixi.lineStyle(w, color, 0.5);
        pixi.moveTo(cx,cy);
        pixi.lineTo(tx,ty);
    }
}

SpriteRhythm_Visualizer.prototype.drawSquare = function(){
    const visualizer_settings = this._data;
    const display_array = this._data_array;
    const pixi = this._pixi;
    pixi.clear();
    const x = eval(visualizer_settings['Screen X']) || 0;
    const y = eval(visualizer_settings['Screen Y']) || 0;
    const w = eval(visualizer_settings['Bar Width']);
    const a = (Math.PI * 2) / display_array.filter(Boolean).length * w;
    for(let i = 0; i < display_array.length; i++){
        const color = this.convertTo0XHEX(visualizer_settings['Color'] || this.generateRandomColor());
        const angle = a * i;
        const mag = display_array[i];
        const cx = x + r * Math.cos(angle);
        const cy = y + r * Math.sin(angle);
        const tx = cx + mag * Math.cos(angle);
        const ty = cy + mag * Math.sin(angle);
        pixi.lineStyle(w, color, 0.5);
        pixi.moveTo(cx,cy);
        pixi.lineTo(tx,ty);
    }
}

SpriteRhythm_Visualizer.prototype.drawLine = function(){
    const visualizer_settings = this._data;
    const display_array = this._data_array;
    const display = this.bitmap;
    display.clear();
    const x = eval(visualizer_settings['Screen X']) || 0;
    const y = eval(visualizer_settings['Screen Y']) || 0;
    const w = eval(visualizer_settings['Bar Width']);
    for(let i = 0; i < display_array.length; i++){
        const color = visualizer_settings['Color'] || this.generateRandomColor();
        const mag = display_array[i];
        const bx = w * i;
        const by = 0;
        display.fillRect(x + bx, y + by, w, -mag, color);
    }
}

SpriteRhythm_Visualizer.prototype.update = function(){
    Sprite.prototype.update.call(this, ...arguments);
    this.updateDisplayAnalyzer();
    this.updateDraw();
}

SpriteRhythm_Visualizer.prototype.updateDisplayAnalyzer = function(){
    const controller = this.parent;
    if(!controller)return;
    const analyzer = controller._display_analyzer;
    const buffer_length = analyzer.frequencyBinCount;
    const data_array = new Uint8Array(buffer_length);
    analyzer.getByteFrequencyData(data_array);
    this._data_array = data_array;
}

SpriteRhythm_Visualizer.prototype.updateDraw = function(){
    const draw_mode = this._draw_mode;
    switch(draw_mode){
        case "circle":
            this.drawCircle();
            break;
        case "square":
            this.drawSquare();
            break;
        case "line":
            this.drawLine();
            break;
        default:
            this.drawLine();
    }
}

function SpriteRhythm_Score(){
    this.initialize(...arguments);
}

SpriteRhythm_Score.prototype = Object.create(Sprite.prototype);
SpriteRhythm_Score.prototype.constructor = SpriteRhythm_Score;

SpriteRhythm_Score.prototype.initialize = function(){
    Sprite.prototype.initialize.call(this);
    this.createBackground();
    this.createText();
    this.setPosition();
}

SpriteRhythm_Score.prototype.createBackground = function(){
    const game_config = $gameTemp.rhythmGame();
    const score_sprite_config = game_config['Score Sprite Configuration'];
    if(!score_sprite_config)return;
    const gfx = score_sprite_config['Graphic'];
    if(!gfx)return;
    const sprite = new SpriteRhythm_AnimGfx(gfx);
    this.addChild(sprite);
    this._background = sprite;
}

SpriteRhythm_Score.prototype.createText = function(){
    const game_config = $gameTemp.rhythmGame();
    const score_sprite_config = game_config['Score Sprite Configuration'];
    if(!score_sprite_config)return;
    const text = new Sprite();
    text.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
    const text_bitmap = text.bitmap;
    text_bitmap.fontFace = score_sprite_config['Font Face'];
    text_bitmap.fontSize = eval(score_sprite_config['Font Size']);
    text_bitmap.textColor = score_sprite_config['Text Color'];
    text_bitmap.outlineColor = score_sprite_config['Text Outline Color'];
    text_bitmap.outlineWidth = eval(score_sprite_config['Text Outline Size']);
    this.addChild(text);
    this._text_sprite = text;
}

SpriteRhythm_Score.prototype.setPosition = function(){
    const game_config = $gameTemp.rhythmGame();
    const score_sprite_config = game_config['Score Sprite Configuration'];
    if(!score_sprite_config)return;
    const x = eval(score_sprite_config['Screen X']) || 0;
    const y = eval(score_sprite_config['Screen Y']) || 0;
    this.move(x, y);
}

SpriteRhythm_Score.prototype.update = function(){
    Sprite.prototype.update.call(this, ...arguments);
    this.updateTextPosition();
    this.updateText();
}

SpriteRhythm_Score.prototype.updateTextPosition = function(){
    if(this._background){
        const w = this._background.width;
        const h = this._background.height;
        this._text_sprite.x = -(w * 0.5);
        this._text_sprite.y = -(h * 0.5);
    }
}

SpriteRhythm_Score.prototype.updateText = function(){
    const game_config = $gameTemp.rhythmGame();
    const score_sprite_config = game_config['Score Sprite Configuration'];
    if(!score_sprite_config)return;
    const tx = eval(score_sprite_config['Text Offset X']);
    const ty = eval(score_sprite_config['Text Offset Y']);
    const var_id = Syn_Rhythm.SCORE_VAR_ID;
    const score = $gameVariables.value(var_id);
    if(this._score != score){
        const text = this._text_sprite.bitmap;
        text.clear();
        const tw = text.measureTextWidth(score) + 18;
        text.drawText(score, tx, ty, tw, 36);
    }
}

function SpriteRhythm_Controller(){
    this.initialize(...arguments);
}

SpriteRhythm_Controller.prototype = Object.create(Sprite.prototype);
SpriteRhythm_Controller.prototype.constructor = SpriteRhythm_Controller;

SpriteRhythm_Controller.prototype.initialize = function(){
    Sprite.prototype.initialize.call(this, ...arguments);
    $gameVariables.setValue(Syn_Rhythm.SCORE_VAR_ID, 0);
    this._game_time = 0;
    this.createRails();
    this.createAutoVisualizer();
    this.createScore();
    this.startBGM();
    Input.clear();
}

SpriteRhythm_Controller.prototype.createRails = function(){
    const controller = this;
    const game_config = $gameTemp.rhythmGame();
    const rail_configs = game_config['Button Rails'];
    const rails = [];
    rail_configs.forEach((config)=>{
        const rail_sprite = new SpriteRhythm_GameRail(config);
        controller.addChild(rail_sprite);
        rails.push(rail_sprite);
    })
    this._button_rails = rails;
}

SpriteRhythm_Controller.prototype.createAutoVisualizer = function(){
    const game_config = $gameTemp.rhythmGame();
    if(!game_config['Visualizer'])return;
    const visualizer = new SpriteRhythm_Visualizer();
    this.addChild(visualizer);
}

SpriteRhythm_Controller.prototype.createScore = function(){
    const score = new SpriteRhythm_Score();
    this.addChild(score);
    this._score = score;
}

SpriteRhythm_Controller.prototype.calculateAutoSpawnSeparation = function(){
    const game_config = $gameTemp.rhythmGame();
    const set_time = eval(game_config['Start Buffer']);
    if(set_time && !isNaN(set_time)){
        return set_time;
    }
    let rail_width = 0;
    this._button_rails.forEach((rail)=>{
        const w = rail.width;
        rail_width += w;
    })
    rail_width /= this._button_rails.length;
    rail_width = parseInt(rail_width);
    const spd = Math.max(1, eval(game_config['Game Speed']));
    const delay = rail_width / spd;
    return Math.round(delay) * 3;
}

SpriteRhythm_Controller.prototype.getControlAutoBGM = function(){
    const game_config = $gameTemp.rhythmGame();
    const bgm = game_config['BGM'];
    const bgm_name = bgm.name;
    const bgm_file_ext = AudioManager.audioFileExt();
    const source_file = `./audio/bgm/${bgm_name}${bgm_file_ext}`;
    const audio = new Audio(source_file);
    audio.loop = true;
    const audio_context = new (window.AudioContext || window.webkitAudioContext)();
    const source = audio_context.createMediaElementSource(audio);
    const analyzer = audio_context.createAnalyser();
    analyzer.fftSize = (eval(game_config['Auto FFT']) || 2048).clamp(32, 32768);
    source.connect(analyzer);
    audio.play();
    return analyzer;
}

SpriteRhythm_Controller.prototype.getAutoBGM = function(){
    const game_config = $gameTemp.rhythmGame();
    const bgm = game_config['BGM'];
    const bgm_name = bgm.name;
    const bgm_file_ext = AudioManager.audioFileExt();
    const source_file = `./audio/bgm/${bgm_name}${bgm_file_ext}`;
    const audio = new Audio(source_file);
    audio.loop = true;
    const audio_context = new (window.AudioContext || window.webkitAudioContext)();
    const source = audio_context.createMediaElementSource(audio);
    const analyzer = audio_context.createAnalyser();
    analyzer.fftSize = (eval(game_config['Auto FFT']) || 2048).clamp(32, 32768);
    source.connect(analyzer);
    analyzer.connect(audio_context.destination);
    this._display_analyzer = analyzer;
    return audio;
}

SpriteRhythm_Controller.prototype.startBGM = function(){
    const game_config = $gameTemp.rhythmGame();
    const bgm = game_config['BGM'];
    if(!bgm){
        this._duration = eval(game_config['Duration']);
        return;
    }
    this._saved_bgm = AudioManager.saveBgm();
    this._saved_bgs = AudioManager.saveBgs();
    if(eval(game_config['Auto Setup'])){
        this._auto_end_time = eval(game_config['Duration']);
        this._auto_mode = true;
        this._controller_analyzer = this.getControlAutoBGM();
        this._auto_audio = this.getAutoBGM();
        AudioManager.updateBgmParameters(bgm);
        this._game_bgm = buffer;
        this._auto_mode = true;
    }else{
        const buffer = AudioManager.createBuffer("bgm/", bgm.name);
        AudioManager.updateBgmParameters(bgm);
        buffer.play(true, 0);
        AudioManager.fadeOutBgm(1);
        this._game_bgm = buffer;
    }
}

SpriteRhythm_Controller.prototype.createButton = function(btn_data){
    if(!btn_data)return;
    const btn_id = btn_data['Identifier'];
    const rails = this._button_rails;
    const rail = rails.find((rail_sprite)=>{
        const data = rail_sprite._data;
        return data['Button'] == btn_id;
    })
    if(rail){
        rail.createButton(btn_data);
    }
}

SpriteRhythm_Controller.prototype.endGame = function(){
    const game_config = $gameTemp.rhythmGame();
    AudioManager.replayBgm(this._saved_bgm);
    AudioManager.replayBgs(this._saved_bgs);
}

SpriteRhythm_Controller.prototype.update = function(){
    Sprite.prototype.update.call(this, ...arguments);
    this.updateDuration();
    this.updateSpawn();
    this.updateInput();
    this.updateEnd();
}

SpriteRhythm_Controller.prototype.updateDuration = function(){
    if(!this._ended){
        if(this._auto_mode){
            if(this._auto_game_timer){
                this._game_time++;
            }
            return;
        }else{
            this._game_time++;
        }
    }
    if(!this._game_bgm){
        this._duration--;
        if(this._duration <= 0){
            this._ended = true;
        }
    }
}

SpriteRhythm_Controller.prototype.updateAutoSpawn = function(){
    if(this._ended)return;
    if(!this._btn_chks){
        this._btn_chks = {};
        this._amplitude_avgs = {};
    }
    if(!Array.isArray(this._auto_spawns)){
        this._auto_spawns = [];
    }
    const game_config = $gameTemp.rhythmGame();
    const threshold = eval(game_config['Auto Threshold']);
    const trigger_threshold = eval(game_config['Auto Trigger Threshold']);
    const press_threshold = eval(game_config['Auto Press Threshold']);
    const auto_threshold = eval(game_config['Auto Shift Spawn']);
    const decay = eval(game_config['Auto Shift Decay']) || 1;
    const auto_rail_configs = game_config['Auto Rail Setup'];
    const game_rails = this._button_rails;
    const num_rails = game_rails.length;
    const analyzer = this._controller_analyzer;
    const audio = this._auto_audio;
    if(!Array.isArray(this._auto_buttons_pressing)){
        this._auto_buttons_pressing = [];
    }
    if(!Array.isArray(this._auto_buttons_cooldown)){
        this._auto_buttons_cooldown = [];
    }
    if(isNaN(this._spawner_delay)){
        this._spawner_delay = 0;
        this._auto_spawn_time = 0;
        this._auto_threshold_minimum = [];
        this._auto_no_trigger_time = [];
        this._check_time = [];
        for(let x = 0; x < num_rails; x++){
            this._auto_threshold_minimum[x] = 0;
            this._auto_no_trigger_time[x] = 0;
            this._check_time[x] = 0;
            this._auto_buttons_pressing[x] = 0;
            this._auto_buttons_cooldown[x] = 0;
        }
        this._start_se_plays = eval(game_config['Start Buffer Play Count']);
        this._start_se = (game_config['Start Buffer SE'] || {}).name ? game_config['Start Buffer SE'] : null;
        if(this._start_se){
            this._spawn_seperator = 0;
        }else{
            this._spawn_seperator = this.calculateAutoSpawnSeparation();
        }
        const fade_time = this._spawn_seperator ? this._spawn_seperator / 60 : 1;
        AudioManager.fadeOutBgm(fade_time);
    }
    if(this._spawn_seperator < 0){
        this._spawner_delay = undefined;
        return;
    }
    const buffer_length = analyzer.frequencyBinCount;
    const data_array = new Uint8Array(buffer_length);
    analyzer.getByteFrequencyData(data_array);
    const div_val = Math.floor(buffer_length / num_rails);
    const btn_checks = [];
    let avg_amp = 0;
    for(let i = 0; i < num_rails; i++){
        const rail = game_rails[i];
        const rail_data = rail._data;
        const rail_input = rail_data['Button'];
        const auto_rail_config = auto_rail_configs.find((config)=>{
            return config['Rail Input'] == rail_input;
        })
        let val = 0;
        if(auto_rail_config){
            const ds = (i * div_val);
            const de = ((i * div_val) + div_val)
            const si = eval(auto_rail_config['Start Index']);
            const ei = eval(auto_rail_config['End Index']);
            const start = isNaN(si) ? ds : si;
            const end = ei || de;
            if(end <= start){
                console.error(`Bad auto rail setup for ${rail_input}. Ensure end is more than start.`);
                continue;
            }
            for(let q = start; q < end; q++){
                val += data_array[q] || 0;
            }
            avg_amp = val;
            val /= (end - start);
            btn_checks[i] = val;
        }else{
            const start = i * div_val;
            const end = start + div_val;
            for(let q = start; q < end; q++){
                val += data_array[q] || 0;
            }
            avg_amp = val;
            val /= div_val;
            btn_checks[i] = val;
        }
        const check_time = this._check_time[i];
        const time = this._spawner_delay;
        if(time < check_time && !isNaN(check_time))continue;
        if(this._auto_no_trigger_time[i] > 0){
            this._auto_no_trigger_time[i]--;
            continue;
        }
        if(this._auto_buttons_cooldown[i] > 0){
            this._auto_buttons_cooldown[i]--;
            continue;
        }
        const min_diff = this._auto_threshold_minimum[i] || 0;
        if(auto_threshold){
            const time = this._spawner_delay;
            const chk_amp = avg_amp / buffer_length;
            const diff = val - chk_amp;
            if(
                diff >= min_diff &&
                val >= (chk_amp + threshold)
            ){
                this._auto_buttons_pressing[i]++;
                this._auto_threshold_minimum[i] = diff;
            }else{
                if(this._auto_buttons_pressing[i] > 0 && this._auto_buttons_pressing[i] > trigger_threshold){
                    const is_trigger = this._auto_buttons_pressing[i] < press_threshold;
                    const spawn_data = {};
                    spawn_data['Identifier'] = rail_input;
                    spawn_data['Trigger Only'] = is_trigger;
                    spawn_data['Spawn Time'] = Math.max(0, (time - this._auto_buttons_pressing[i]));
                    spawn_data['Hold Time'] = JsonEx.makeDeepCopy(this._auto_buttons_pressing[i]);
                    this._auto_spawns.push(spawn_data);
                    this._auto_buttons_pressing[i] = 0;
                    this._auto_buttons_cooldown[i] = eval(game_config['Auto Spawn Cooldown']);
                }else{
                    this._auto_buttons_pressing[i] = 0;
                }
                this._auto_threshold_minimum[i] = (this._auto_threshold_minimum[i] - decay).clamp(0, Infinity);
            }
        }else{
            if(val >= threshold){
                this._auto_buttons_pressing[i]++;
            }else if(this._auto_buttons_pressing[i] > 0 && this._auto_buttons_pressing[i] > trigger_threshold){
                const is_trigger = this._auto_buttons_pressing[i] < press_threshold;
                const spawn_data = {};
                spawn_data['Identifier'] = rail_input;
                spawn_data['Trigger Only'] = is_trigger;
                spawn_data['Spawn Time'] = Math.max(0, (time - this._auto_buttons_pressing[i]));
                spawn_data['Hold Time'] = JsonEx.makeDeepCopy(this._auto_buttons_pressing[i]);
                this._auto_spawns.push(spawn_data);
                this._auto_buttons_pressing[i] = 0;
                this._auto_buttons_cooldown[i] = eval(game_config['Auto Spawn Cooldown']);
            }else if(press_time > 0){
                this._auto_buttons_pressing[i] = 0;
            }
        }
    }
    avg_amp /= buffer_length;
    this._btn_chks[this._spawner_delay] = btn_checks;
    this._amplitude_avgs[this._spawner_delay] = avg_amp;
    this._spawner_delay++;
    if(this._played_start_se){
        if(this._played_start_se.isPlaying())return;
    }
    if(this._start_se && this._start_se_plays > 0){
        if(!this._played_start_se){
            AudioManager.playSe(this._start_se);
            const audio_buffers = AudioManager._seBuffers;
            this._played_start_se = audio_buffers[audio_buffers.length - 1];
        }
        if(!this._played_start_se.isPlaying()){
            AudioManager.cleanupSe();
            AudioManager.playSe(this._start_se);
            const audio_buffers = AudioManager._seBuffers;
            this._played_start_se = audio_buffers[audio_buffers.length - 1];
            this._start_se_plays--;
        }
        return;
    }else if(this._start_se && !this._set_seperator_spawn_auto){
        this._spawn_seperator = JsonEx.makeDeepCopy(this._spawner_delay);
        this._set_seperator_spawn_auto = true;
    }
    if(this._spawner_delay >= this._spawn_seperator && !this._auto_play_bgm){
        audio.play();
        this._auto_play_bgm = true;
    }
    this._auto_spawn_time++;
    const offset_time = Math.ceil(this._spawn_seperator * 0.66);
    if(this._auto_spawn_time >= offset_time){
        this._auto_game_timer = true;
        // if(!Array.isArray(this._check_inputs)){
        //     this._check_inputs = [];
        // }
        // const auto_time = this._auto_spawn_time - offset_time;
        // const end_auto_time = auto_time + this._spawn_seperator;
        // for(let i = 0; i < num_rails; i++){
        //     const rail = game_rails[i];
        //     const rail_data = rail._data;
        //     const rail_input = rail_data['Button'];
        //     const threshold = eval(game_config['Auto Threshold']);
        //     const trigger_threshold = eval(game_config['Auto Trigger Threshold']);
        //     const press_threshold = eval(game_config['Auto Press Threshold']);
        //     const auto_threshold = eval(game_config['Auto Shift Spawn']);
        //     const decay = eval(game_config['Auto Shift Decay']) || 1;
        //     const check_time = this._check_time[i];
        //     if(auto_time < check_time)continue;
        //     let index = auto_time;
        //     let press_time = 0;
        //     let cooldown = 0;
        //     if(this._auto_no_trigger_time[i] > 0){
        //         this._auto_no_trigger_time[i]--;
        //         continue;
        //     }
        //     while(index < end_auto_time){
        //         if(cooldown > 0){
        //             cooldown--;
        //             if(cooldown < 0){
        //                 cooldown = 0;
        //             }
        //             continue;
        //         }
        //         const audio_value = this._btn_chks[index][i] || 0;
        //         const avg_amp = this._amplitude_avgs[index] || 0;
        //         const diff = audio_value - avg_amp;
        //         const min_diff = this._auto_threshold_minimum[i]
        //         console.log(`....................`)
        //         console.log(audio_value)
        //         console.log(avg_amp)
        //         console.log(diff)
        //         console.log(min_diff)
        //         console.log(threshold)
        //         console.log(diff >= this._auto_threshold_minimum[i])
        //         console.log(audio_value >= (avg_amp + threshold))
        //         if(auto_threshold){
        //             if(
        //                 diff >= min_diff &&
        //                 audio_value >= (avg_amp + threshold)
        //             ){
        //                 press_time++;
        //                 this._auto_threshold_minimum[i] = diff;
        //             }else{
        //                 if(press_time > 0 && press_time > trigger_threshold){
        //                     const is_trigger = press_time < press_threshold;
        //                     const spawn_data = {};
        //                     spawn_data['Identifier'] = rail_input;
        //                     spawn_data['Trigger Only'] = is_trigger;
        //                     spawn_data['Spawn Time'] = Math.max(0, (index - press_time));
        //                     spawn_data['Hold Time'] = JsonEx.makeDeepCopy(press_time);
        //                     this._auto_spawns.push(spawn_data);
        //                     press_time = 0;
        //                     cooldown = eval(game_config['Auto Spawn Cooldown']) + press_time;
        //                 }else{
        //                     press_time = 0;
        //                 }
        //                 this._auto_threshold_minimum[i] = (this._auto_threshold_minimum[i] - decay).clamp(0, Infinity);
        //             }
        //         }else{
        //             if(audio_value >= threshold){
        //                 press_time++;
        //             }else if(press_time > 0 && press_time > trigger_threshold){
        //                 const is_trigger = press_time < press_threshold;
        //                 const spawn_data = {};
        //                 spawn_data['Identifier'] = rail_input;
        //                 spawn_data['Trigger Only'] = is_trigger;
        //                 spawn_data['Spawn Time'] = Math.max(0, (index - press_time));
        //                 spawn_data['Hold Time'] = JsonEx.makeDeepCopy(press_time);
        //                 this._auto_spawns.push(spawn_data);
        //                 press_time = 0;
        //                 cooldown = eval(game_config['Auto Spawn Cooldown']) + press_time;
        //             }else if(press_time > 0){
        //                 press_time = 0;
        //             }
        //         }
        //         index++;
        //         if(index >= this._btn_chks.length && press_time > 0){
        //             while(press_time > 0){
        //                 if(cooldown > 0){
        //                     cooldown--;
        //                     if(cooldown < 0){
        //                         cooldown = 0;
        //                     }
        //                     continue;
        //                 }
        //                 if(this._btn_chks[index]){
        //                     const audio_value = this._btn_chks[index][i] || 0;
        //                     if(auto_threshold){
        //                         if(
        //                             audio_value >= this._auto_threshold_minimum[i] &&
        //                             audio_value >= threshold
        //                         ){
        //                             press_time++;
        //                             this._auto_threshold_minimum[i] = audio_value;
        //                         }else{
        //                             if(press_time > 0 && press_time > trigger_threshold){
        //                                 const is_trigger = press_time < press_threshold;
        //                                 const spawn_data = {};
        //                                 spawn_data['Identifier'] = rail_input;
        //                                 spawn_data['Trigger Only'] = is_trigger;
        //                                 spawn_data['Spawn Time'] = Math.max(0, (index - press_time));
        //                                 spawn_data['Hold Time'] = JsonEx.makeDeepCopy(press_time);
        //                                 this._auto_spawns.push(spawn_data);
        //                                 press_time = 0;
        //                                 cooldown = eval(game_config['Auto Spawn Cooldown']) + press_time;
        //                             }else{
        //                                 press_time = 0
        //                             }
        //                             this._auto_threshold_minimum[i] = (this._auto_threshold_minimum[i] - decay).clamp(0, Infinity);
        //                         }
        //                     }else{
        //                         if(audio_value >= threshold){
        //                             press_time++;
        //                         }else if(press_time > 0 && press_time > trigger_threshold){
        //                             const is_trigger = press_time < press_threshold;
        //                             const spawn_data = {};
        //                             spawn_data['Identifier'] = rail_input;
        //                             spawn_data['Trigger Only'] = is_trigger;
        //                             spawn_data['Spawn Time'] = Math.max(0, (index - press_time));
        //                             spawn_data['Hold Time'] = JsonEx.makeDeepCopy(press_time);
        //                             this._auto_spawns.push(spawn_data);
        //                             press_time = 0;
        //                             cooldown = eval(game_config['Auto Spawn Cooldown']) + press_time;
        //                         }else if(press_time > 0){
        //                             press_time = 0;
        //                         }
        //                     }
        //                     index++;
        //                 }else{
        //                     break;
        //                 }
        //             }
        //         }
        //     }
        //     this._auto_no_trigger_time[i] = cooldown;
        //     this._check_time[i] = index;
        // }
    }
}

SpriteRhythm_Controller.prototype.updateCreateAutoButton = function(index, time, pressed, value){}

SpriteRhythm_Controller.prototype.updateAutoButtons = function(){
    const game_time = this._game_time;
    const btn_spawns = this._auto_spawns;
    for(let i = 0; i < btn_spawns.length; i++){
        const spawn = btn_spawns[i];
        const spawn_time = spawn['Spawn Time'];
        if(game_time >= spawn_time){
            this.createButton(spawn);
            btn_spawns.splice(i, 1);
            i--;
        }
    }
}

SpriteRhythm_Controller.prototype.updateSpawn = function(){
    if(this._auto_mode){
        this.updateAutoSpawn();
        this.updateAutoButtons();
        return;
    }
    const game_time = this._game_time;
    const game_config = $gameTemp.rhythmGame();
    const btn_spawns = game_config['Button Spawn'];
    for(let i = 0; i < btn_spawns.length; i++){
        const spawn = btn_spawns[i];
        const spawn_time = eval(spawn['Spawn Time']);
        if(game_time >= spawn_time){
            this.createButton(spawn);
            btn_spawns.splice(i, 1);
            i--;
        }
    }
}

SpriteRhythm_Controller.prototype.updateInput = function(){}

SpriteRhythm_Controller.prototype.updateAutoEnd = function(){
    const game_time = this._game_time;
    const end_time = this._auto_end_time;
    if(game_time >= end_time){
        this._ended = true;
    }
    if(this._ended){
        const reserved_buttons = this._auto_spawns;
        if(reserved_buttons.length > 0){
            this._auto_spawns = [];
            return;
        }
        if(!this._audio_fade){
            this._audio_fade = true;
            this._fadeOut = 60;
            return;
        }
        const audio = this._auto_audio;
        if(this._fadeOut > 0){
            this._fadeOut--;
            this.alpha -= 1/60;
            audio.volume = Math.max(0, this.alpha);
            return;
        }
        this.endGame();
        $gameTemp.endRhythmGame();
    }
}

SpriteRhythm_Controller.prototype.updateEnd = function(){
    if(this._auto_mode){
        this.updateAutoEnd();
        return;
    }
    if(!this._ended){
        const game_config = $gameTemp.rhythmGame();
        const btn_spawns = game_config['Button Spawn'];
        if(btn_spawns.length <= 0){
            const rails = this._button_rails;
            if(
                !rails.some((rail)=>{
                    if(rail._held_button)return true;
                    return rail._buttons.length > 0;
                })
            ){
                this._ended = true;
            }
        }
        return;
    }
    if(!this._audio_fade){
        this._audio_fade = true;
        this._fadeOut = 60;
        this._game_bgm.fadeOut(1);
        return;
    }
    if(this._fadeOut > 0){
        this._fadeOut--;
        this.alpha -= 1/60;
        return;
    }
    this.endGame();
    $gameTemp.endRhythmGame();
}

Syn_Rhythm_WinBattLog_StrtActn = Window_BattleLog.prototype.startAction;
Window_BattleLog.prototype.startAction = function(subject, action, targets) {
    const data = action.item();
    if(DataManager.isSkill(data)){
        const skill_id = data.id;
        const skill_config = Syn_Rhythm.SKILL_CONFIGURATIONS.find((config)=>{
            return eval(config['Skill']) == skill_id;
        })
        if(!skill_config){
            Syn_Rhythm_WinBattLog_StrtActn.call(this, ...arguments);
            return;
        }
        const rhythmGame = skill_config['Rhythm Game'];
        if(!rhythmGame){
            Syn_Rhythm_WinBattLog_StrtActn.call(this, ...arguments);
            return;
        }
        this.push("performActionStart", subject, action);
        this.push("waitForMovement");
        this.push("performRhythmGame", subject, targets, rhythmGame);
        return;
    }
    Syn_Rhythm_WinBattLog_StrtActn.call(this, ...arguments);
}

Window_BattleLog.prototype.performRhythmGame = function(subject, targets, rhythmGame){
    $gameTemp.startRhythmGame(rhythmGame, subject, targets);
}

Syn_Rhythm_WinBattLog_IsBsy = Window_BattleLog.prototype.isBusy;
Window_BattleLog.prototype.isBusy = function() {
    return Syn_Rhythm_WinBattLog_IsBsy.call(this, ...arguments) || !!$gameTemp.rhythmGame();
}

Syn_Rhythm_WinBattLog_UpdtWait = Window_BattleLog.prototype.updateWait;
Window_BattleLog.prototype.updateWait = function() {
    return Syn_Rhythm_WinBattLog_UpdtWait.call(this, ...arguments) || !!$gameTemp.rhythmGame();
}

Syn_Rhythm_ScnBse_IsBusy = Scene_Base.prototype.isBusy;
Scene_Base.prototype.isBusy = function() {
    if(!$gameTemp){
        return Syn_Rhythm_ScnBse_IsBusy.call(this, ...arguments);
    }
    return Syn_Rhythm_ScnBse_IsBusy.call(this, ...arguments) || !!$gameTemp.rhythmGame();
}

Syn_Rhythm_ScnMap_IsMnuCalled = Scene_Map.prototype.isMenuCalled
Scene_Map.prototype.isMenuCalled = function() {
    return Syn_Rhythm_ScnMap_IsMnuCalled.call(this, ...arguments) && !$gameTemp.rhythmGame();
}