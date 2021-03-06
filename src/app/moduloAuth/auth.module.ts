// MÓDULOS ANGULAR
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// ELEMENTOS PROPIOS DEL MÓDULO

// Componentes
import { listaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { gestionUsuariosComponent } from './containers/gestionUsuarios/gestionUsuarios.component';
import { RegistroComponent } from './components/nuevo-editar-usuario/nuevo-editar-usuario.component';

// Routing
import { UsuariosRoutingModule } from './auth-routing.module';

// Relativos a ngrx
import { UsuariosEffects } from './store/usuarios/usuarios.effects';

// Servicios
import { AuthService } from './services/auth.service';

// MODULOS DE LA APLICACIÓN
import { HelperModule } from '../moduloHelpers/helper.module';

// MÓDULOS DE TERCEROS
import { ModalModule } from 'ngb-modal';
import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Github, Activity, Airplay, AlertCircle, AlertOctagon, AlertTriangle, AlignCenter, AlignJustify, AlignLeft, AlignRight, Anchor, Aperture, Archive, ArrowDown, ArrowDownCircle, ArrowDownLeft, ArrowDownRight, ArrowLeftCircle, ArrowLeft, ArrowRight, ArrowRightCircle, ArrowUp, ArrowUpCircle, ArrowUpLeft, ArrowUpRight, AtSign, Award, BarChart2, BarChart, BatteryCharging, Battery, BellOff, Bell, Bluetooth, Bold, BookOpen, Book, Bookmark, Box, Briefcase, Calendar, CameraOff, Cast, CheckCircle, CheckSquare, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsDown, ChevronsLeft, ChevronsRight, ChevronsUp, Chrome, Circle, Clipboard, Clock, CloudDrizzle, CloudLightning, CloudOff, CloudRain, Cloud, CloudSnow, Code, Codepen, Codesandbox, Coffee, Columns, Command, Compass, Copy, CornerDownLeft, CornerDownRight, CornerLeftDown, CornerLeftUp, CornerRightDown, CornerRightUp, CornerUpLeft, CornerUpRight, Cpu, CreditCard, Crop, Crosshair, Database, Delete, Disc, DollarSign, DownloadCloud, Download, Droplet, Edit, Edit2, Edit3, ExternalLink, EyeOff, Eye, Facebook, FastForward, Feather, Figma, FileMinus, FilePlus, FileText, File, Film, Filter, Flag, Folder, FolderMinus, FolderPlus, Framer, Frown, Gift, GitBranch, GitCommit, GitMerge, GitPullRequest, Gitlab, Globe, Grid, HardDrive, Hash, Headphones, HelpCircle, Hexagon, Home, MoreHorizontal, Image, Inbox, Info, Instagram, Italic, Key, Layers, Layout, LifeBuoy, Link, Link2, Linkedin, List, Loader, Lock, LogIn, LogOut, Mail, MapPin, Map, Maximize, Maximize2, Meh, Menu, MessageCircle, MessageSquare, Mic, MicOff, Minimize, Minimize2, MinusCircle, MinusSquare, Minus, Monitor, Moon, MoreVertical, MousePointer, Move, Music, Navigation, Navigation2, Octagon, Package, Paperclip, PauseCircle, Pause, PenTool, Percent, PhoneCall, PhoneForwarded, PhoneIncoming, PhoneMissed, Phone, PhoneOff, PhoneOutgoing, PieChart, Play, PlayCircle, Plus, PlusCircle, PlusSquare, Pocket, Power, Printer, Radio, RefreshCcw, RefreshCw, Repeat, Rewind, RotateCcw, RotateCw, Rss, Save, Scissors, Search, Send, Server, Settings, Share, Share2, Shield, ShieldOff, ShoppingBag, ShoppingCart, Shuffle, Sidebar, SkipBack, SkipForward, Slack, Slash, Sliders, Smartphone, Smile, Speaker, Square, Star, StopCircle, Sun, Sunrise, Sunset, Tablet, Tag, Target, Terminal, Thermometer, ThumbsDown, ThumbsUp, ToggleLeft, ToggleRight, Tool, Trash, Trash2, Trello, TrendingDown, TrendingUp, Triangle, Truck, Tv, Twitch, Twitter, Type, Umbrella, Underline, Unlock, Upload, UploadCloud, User, UserCheck, UserMinus, UserPlus, UserX, Users, Video, VideoOff, Voicemail, Volume, Volume1, Volume2, VolumeX, Watch, Wifi, WifiOff, Wind, XCircle, XOctagon, XSquare, X, Youtube, Zap, ZapOff, ZoomIn, ZoomOut } from 'angular-feather/icons';

// NGRX
import { StoreModule } from '@ngrx/store';
import { ModuloAuthFeaturekey, ModuloAuthReducers } from './store/index';
import { EffectsModule } from '@ngrx/effects'

// MÓDULOS FIREBASE
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';


@NgModule({
  declarations: [
    RegistroComponent,
    listaUsuariosComponent,
    gestionUsuariosComponent,
  ],
  imports: [
    HelperModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature(ModuloAuthFeaturekey, ModuloAuthReducers),
    EffectsModule.forFeature([UsuariosEffects]),
    FeatherModule,
    UsuariosRoutingModule,
    // Módulos relativos a firebase2
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ModalModule
  ],
  exports: [],
  providers: [AuthService]

})


export class AuthModule {

  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [AuthService]
    }

    }

}
