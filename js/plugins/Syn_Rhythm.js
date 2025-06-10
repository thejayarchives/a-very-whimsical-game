/*:
 * @author Synrec/Kylestclr
 * @plugindesc v1.0 A Rhythm game creator
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
 * Set the game parameters in the plugin parameters
 * 
 * @param Do Not Destroy
 * @desc Prevents button JS destruction
 * Useful for MV users
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
 * @param Input Buffer
 * @parent Game Speed
 * @desc Time granted for hold input before decay
 * @type text
 * @default 12
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

function GAME_PARSER_RHYTHM(obj){
    try{
        obj = JSON.parse(obj)
        obj['Score Sprite Configuration'] = SCORE_SPRITE_PARSER_RHYTHM(obj['Score Sprite Configuration']);
        obj['BGM'] = BGM_PARSER_RHYTHM(obj['BGM']);
        obj['Sound Popup'] = SOUND_POPUPS_PARSER_RHYTHM(obj['Sound Popup']);
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
};

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
    sprite.y = bh;
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
        const max_hld_dur = button._max_hold;
        console.log(max_hld_dur)
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
                console.log(score_ratio)
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
                console.log(score_ratio)
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
    const log_window = BattleManager._logWindow;
    if(!log_window)return;
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
    if(scale_ratio <= 0){
        log_window.performAction(battler, action);
        return;
    }
    const targets = $gameTemp.rhythmTargets();
    targets.forEach((target)=>{
        action.apply(target);
        target.startDamagePopup();
        target.refresh();
        log_window.displayAddedStates(target);
    })
    log_window.showAnimation(battler, targets, skill_data.animationId);
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

SpriteRhythm_Controller.prototype.createScore = function(){
    const score = new SpriteRhythm_Score();
    this.addChild(score);
    this._score = score;
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
    const buffer = AudioManager.createBuffer("bgm/", bgm.name);
    AudioManager.updateBgmParameters(bgm);
    buffer.play(true, 0);
    AudioManager.fadeOutBgm(1);
    this._game_bgm = buffer;
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
    if(!this._ended)this._game_time++;
    if(!this._game_bgm){
        this._duration--;
        if(this._duration <= 0){
            this._ended = true;
        }
    }
}

SpriteRhythm_Controller.prototype.updateSpawn = function(){
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

SpriteRhythm_Controller.prototype.updateEnd = function(){
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
    return Syn_Rhythm_ScnBse_IsBusy.call(this, ...arguments) || !!$gameTemp.rhythmGame();
}

Syn_Rhythm_ScnMap_IsMnuCalled = Scene_Map.prototype.isMenuCalled
Scene_Map.prototype.isMenuCalled = function() {
    return Syn_Rhythm_ScnMap_IsMnuCalled.call(this, ...arguments) && !$gameTemp.rhythmGame();
}