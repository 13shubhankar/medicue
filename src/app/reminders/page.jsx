'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, Clock, Plus, Edit3, Trash2, Power, 
  Smartphone, Mail, Volume2, Save, AlertCircle,
  Play, Pause
} from 'lucide-react';
import { Switch } from '@headlessui/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const SetRemindersPage = () => {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      medicationName: "Metformin",
      dosage: "500mg",
      times: ["08:00", "20:00"],
      enabled: true,
      frequency: "Twice daily",
      notifications: {
        push: true,
        email: false,
        sound: true
      },
      soundFile: "/sounds/pill-reminder.mp3",
      image: "/medications/metformin.jpg"
    },
    {
      id: 2,
      medicationName: "Lisinopril",
      dosage: "10mg",
      times: ["08:00"],
      enabled: true,
      frequency: "Once daily",
      notifications: {
        push: true,
        email: true,
        sound: true
      },
      soundFile: "/sounds/gentle-chime.mp3",
      image: "/medications/lisinopril.jpg"
    },
    {
      id: 3,
      medicationName: "Aspirin",
      dosage: "81mg",
      times: ["20:00"],
      enabled: false,
      frequency: "Once daily",
      notifications: {
        push: true,
        email: false,
        sound: false
      },
      soundFile: "/sounds/alert-tone.mp3",
      image: "/medications/aspirin.jpg"
    }
  ]);

  const [currentTime, setCurrentTime] = useState('');
  const [nextReminder, setNextReminder] = useState(null);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);
  const activeAudioContext = useRef(null);

  // Real-time clock and reminder checking
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(timeString);
      
      // Check for due reminders
      checkReminders(now);
      
      // Find next upcoming reminder
      findNextReminder(now);
    };

    // Update every second
    intervalRef.current = setInterval(updateTime, 1000);
    updateTime(); // Initial call

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Cleanup any active audio context
      if (activeAudioContext.current) {
        activeAudioContext.current.close();
      }
    };
  }, [reminders]);

  const checkReminders = (now) => {
    const currentTimeString = now.toTimeString().substr(0, 5); // HH:MM format
    
    reminders.forEach(reminder => {
      if (!reminder.enabled) return;
      
      reminder.times.forEach(time => {
        if (time === currentTimeString && now.getSeconds() === 0) {
          // Exact match - trigger notification
          triggerMedicationReminder(reminder);
        }
      });
    });
  };

  const findNextReminder = (now) => {
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    let nextReminderInfo = null;
    let shortestTimeDiff = Infinity;

    reminders.forEach(reminder => {
      if (!reminder.enabled) return;
      
      reminder.times.forEach(time => {
        const [hours, minutes] = time.split(':').map(Number);
        const reminderMinutes = hours * 60 + minutes;
        
        let timeDiff;
        if (reminderMinutes > currentMinutes) {
          // Today
          timeDiff = reminderMinutes - currentMinutes;
        } else {
          // Tomorrow
          timeDiff = (24 * 60) - currentMinutes + reminderMinutes;
        }
        
        if (timeDiff < shortestTimeDiff) {
          shortestTimeDiff = timeDiff;
          nextReminderInfo = {
            medication: reminder.medicationName,
            time: time,
            minutesAway: timeDiff
          };
        }
      });
    });
    
    setNextReminder(nextReminderInfo);
  };

  // ============ ENHANCED SOUND FUNCTIONS ============
  
  const playNotificationSound = (soundFile) => {
    console.log('🔊 Starting LOUD 10-second notification sound...');
    
    try {
      // Try custom sound file first with maximum volume and looping
      const audio = new Audio(soundFile);
      audio.volume = 1.0; // Maximum volume
      audio.loop = false;
      
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Custom sound started successfully');
            // Play the sound multiple times over 10 seconds
            playRepeatingCustomSound(soundFile);
          })
          .catch(error => {
            console.log('Custom sound failed, falling back to loud beep:', error);
            playLoudRepeatingBeep();
          });
      }
    } catch (error) {
      console.error('Error with custom sound, using loud beep:', error);
      playLoudRepeatingBeep();
    }
  };

  const playRepeatingCustomSound = (soundFile) => {
    let playCount = 0;
    const maxPlays = 6; // Play 6 times over ~10 seconds
    const interval = 1700; // 1.7 seconds between each play

    const playNext = () => {
      if (playCount < maxPlays) {
        try {
          const audio = new Audio(soundFile);
          audio.volume = 1.0;
          audio.play().catch(() => {
            // If custom sound fails, switch to beep
            playLoudRepeatingBeep();
            return;
          });
          playCount++;
          setTimeout(playNext, interval);
        } catch (error) {
          playLoudRepeatingBeep();
        }
      }
    };

    playNext();
  };

  const playLoudRepeatingBeep = () => {
    try {
      console.log('🚨 Playing LOUD 10-second alarm sequence...');
      
      // Create a loud, attention-grabbing beep that repeats for 10 seconds
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      activeAudioContext.current = audioContext;
      
      const duration = 10; // 10 seconds total
      const beepDuration = 0.8; // Each beep lasts 0.8 seconds
      const pauseDuration = 0.3; // 0.3 second pause between beeps
      const frequency1 = 1200; // High frequency for attention
      const frequency2 = 900;  // Slightly lower frequency for variation
      
      let startTime = audioContext.currentTime;
      let currentTime = startTime;
      let beepCount = 0;
      
      // Create multiple beeps over 10 seconds
      while (currentTime < startTime + duration) {
        // Create alternating high and low frequency beeps for more attention
        const frequency = beepCount % 2 === 0 ? frequency1 : frequency2;
        
        // Create oscillator for this beep
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Set frequency and type
        oscillator.frequency.setValueAtTime(frequency, currentTime);
        oscillator.type = 'square'; // Square wave is louder and more attention-grabbing
        
        // Set volume envelope - start loud, maintain loudness
        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(0.9, currentTime + 0.05); // Quick attack to max volume
        gainNode.gain.exponentialRampToValueAtTime(0.7, currentTime + beepDuration * 0.8);
        gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + beepDuration);
        
        // Start and stop the beep
        oscillator.start(currentTime);
        oscillator.stop(currentTime + beepDuration);
        
        // Move to next beep time
        currentTime += beepDuration + pauseDuration;
        beepCount++;
      }
      
      console.log(`🔊 Started ${beepCount} loud beeps over 10 seconds`);
      
      // Add a final dramatic beep at the end
      setTimeout(() => {
        playFinalAlarmBeep(audioContext);
      }, 9000); // After 9 seconds, play final beep
      
    } catch (error) {
      console.error('Web Audio API failed, trying HTML5 audio fallback:', error);
      playHTML5LoudBeep();
    }
  };

  const playFinalAlarmBeep = (audioContext) => {
    try {
      // Final long, loud beep
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(1500, audioContext.currentTime); // Very high pitch
      oscillator.type = 'sawtooth'; // Harsh sound for final alert
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(1.0, audioContext.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1.5);
      
      console.log('🚨 Final alarm beep played');
    } catch (error) {
      console.log('Final beep failed:', error);
    }
  };

  const playHTML5LoudBeep = () => {
    console.log('🔊 Playing HTML5 fallback loud beeps...');
    
    // Fallback: Create multiple HTML5 audio beeps
    const beepCount = 10; // 10 beeps over ~10 seconds
    const interval = 1000; // 1 second between beeps
    
    for (let i = 0; i < beepCount; i++) {
      setTimeout(() => {
        try {
          // Use data URL for a beep sound - this creates a loud beep
          const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFA==");
          audio.volume = 1.0; // Maximum volume
          audio.play();
        } catch (e) {
          console.log('HTML5 beep failed:', e);
        }
      }, i * interval);
    }
  };

  // ============ ENHANCED ALERT FUNCTIONS ============

  const triggerMedicationReminder = async (reminder) => {
    console.log(`🚨 LOUD REMINDER: Time for ${reminder.medicationName}!`);
    
    // Play loud 10-second sound if enabled
    if (reminder.notifications.sound) {
      if (reminder.soundFile) {
        playNotificationSound(reminder.soundFile);
      } else {
        playLoudRepeatingBeep();
      }
    }
    
    // Show browser notification if enabled
    if (reminder.notifications.push) {
      await showBrowserNotification(reminder);
    }
    
    // Show prominent in-page alert that stays for 10 seconds
    showLoudInPageAlert(reminder);
    
    // Trigger email (would be handled by backend)
    if (reminder.notifications.email) {
      console.log(`📧 Email reminder sent for ${reminder.medicationName}`);
    }
  };

  const showLoudInPageAlert = (reminder) => {
    // Remove any existing alerts first
    const existingAlerts = document.querySelectorAll('.medication-alert');
    existingAlerts.forEach(alert => alert.remove());

    // Create a prominent full-screen alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'medication-alert fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-pulse';
    alertDiv.innerHTML = `
      <div class="bg-red-600 text-white p-12 rounded-3xl shadow-2xl max-w-lg mx-4 text-center border-4 border-white transform scale-110">
        <div class="text-6xl mb-4 animate-bounce">🚨💊</div>
        <div class="text-3xl font-black mb-3 text-yellow-300">MEDICATION TIME!</div>
        <div class="text-2xl font-bold mb-2">${reminder.medicationName}</div>
        <div class="text-xl text-red-100 mb-6">${reminder.dosage} - ${reminder.frequency}</div>
        <button 
          class="bg-yellow-400 text-red-800 px-8 py-4 rounded-2xl font-black text-lg hover:bg-yellow-300 transition-colors shadow-lg transform hover:scale-105"
          onclick="this.closest('.medication-alert').remove(); console.log('Medication alert dismissed');"
        >
          ✅ I'VE TAKEN IT!
        </button>
        <div class="text-sm text-red-200 mt-4 animate-pulse">This alert will disappear in 10 seconds</div>
        <div class="mt-2 text-xs text-red-300">🔊 Sound will continue for 10 seconds</div>
      </div>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Make the entire page flash red briefly for extra attention
    document.body.style.transition = 'background-color 0.3s';
    document.body.style.backgroundColor = '#dc2626';
    setTimeout(() => {
      document.body.style.backgroundColor = '';
    }, 800);
    
    // Auto-remove after 10 seconds (same as sound duration)
    setTimeout(() => {
      if (alertDiv.parentElement) {
        alertDiv.remove();
      }
    }, 10000);
  };

  const showBrowserNotification = async (reminder) => {
    if ('Notification' in window) {
      let permission = Notification.permission;
      
      if (permission === 'default') {
        permission = await Notification.requestPermission();
      }
      
      if (permission === 'granted') {
        const notification = new Notification(`🚨💊 URGENT: Time for ${reminder.medicationName}`, {
          body: `Take ${reminder.dosage} - ${reminder.frequency}\n🔊 Sound alert is active for 10 seconds`,
          icon: '/icon-192.png',
          badge: '/icon-192.png',
          requireInteraction: true,
          tag: 'medication-reminder', // Prevents multiple notifications
          vibrate: [200, 100, 200, 100, 200], // Vibration pattern for mobile
          actions: [
            { action: 'taken', title: '✅ Mark as Taken' },
            { action: 'snooze', title: '⏰ Snooze 5 min' }
          ]
        });
        
        notification.onclick = () => {
          window.focus();
          notification.close();
        };
        
        // Auto-close after 10 seconds
        setTimeout(() => notification.close(), 10000);
      }
    }
  };

  // ============ TEST FUNCTIONS ============

  const testSound = (soundFile) => {
    console.log('🔊 Testing LOUD 10-second sound...');
    playNotificationSound(soundFile);
  };

  const testReminder = (reminder) => {
    console.log('🚨 Testing FULL LOUD reminder...');
    triggerMedicationReminder(reminder);
  };

  // ============ REMINDER MANAGEMENT FUNCTIONS ============

  const toggleReminder = (id) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
    ));
  };

  const updateReminderTime = (id, timeIndex, newTime) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id ? {
        ...reminder,
        times: reminder.times.map((time, index) => 
          index === timeIndex ? newTime : time
        )
      } : reminder
    ));
  };

  const addTimeSlot = (id) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id ? {
        ...reminder,
        times: [...reminder.times, "12:00"]
      } : reminder
    ));
  };

  const removeTimeSlot = (id, timeIndex) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id ? {
        ...reminder,
        times: reminder.times.filter((_, index) => index !== timeIndex)
      } : reminder
    ));
  };

  const saveAllReminders = () => {
    alert('✅ All reminders saved successfully! 🎉\n🔴 LOUD scheduling is now ACTIVE.\n🔊 10-second sound alerts will trigger automatically.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-green-50/30 to-green-100">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header with Real-time Clock */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Set Medication <span className="text-green-600">Reminders</span> ⏰
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
  Configure personalized reminders with 
  <span className="font-bold mr-2 text-green-700"> clear sound alerts</span>, 
  real-time notifications, and multiple alert channels.
</p>

            
            {/* Real-time Status */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100">
                <div className="text-sm text-gray-600 mb-1">Current Time</div>
                <div className="text-2xl font-mono font-bold text-green-600">{currentTime}</div>
              </div>
              
              {nextReminder && (
                <div className="bg-blue-50 rounded-2xl p-4 shadow-lg border border-blue-200">
                  <div className="text-sm text-blue-600 mb-1">Next LOUD Reminder</div>
                  <div className="text-lg font-bold text-blue-800">
                    {nextReminder.medication} at {nextReminder.time}
                  </div>
                  <div className="text-sm text-blue-600">
                    in {Math.floor(nextReminder.minutesAway / 60)}h {nextReminder.minutesAway % 60}m
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Live Status Banner */}
         

          {/* Reminder Cards */}
          <div className="space-y-6 mb-8">
            {reminders.map((reminder, index) => (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                      reminder.enabled ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <Bell className={`${reminder.enabled ? 'text-green-600' : 'text-gray-400'}`} size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{reminder.medicationName}</h3>
                      <p className="text-green-600 font-medium">{reminder.dosage} • {reminder.frequency}</p>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                        reminder.enabled 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          reminder.enabled ? 'bg-red-500 animate-pulse' : 'bg-gray-400'
                        }`}></div>
                        {reminder.enabled ? '🔔 Reminder On' : 'Reminder Off'}

                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={reminder.enabled}
                      onChange={() => toggleReminder(reminder.id)}
                      className={`${reminder.enabled ? 'bg-green-600' : 'bg-gray-300'} 
                        relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                        transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                      <span
                        className={`${reminder.enabled ? 'translate-x-6' : 'translate-x-0'} 
                          pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 
                          transition duration-200 ease-in-out`}
                      />
                    </Switch>
                    
                    <button
                      onClick={() => testSound(reminder.soundFile)}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors bg-purple-100"
                      title="Test LOUD 10-Second Sound"
                    >
                      <Volume2 size={20} />
                    </button>
                    
                    <button
                      onClick={() => testReminder(reminder)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors bg-red-100"
                      title="Test FULL LOUD Reminder"
                    >
                      <Bell size={20} />
                    </button>
                  </div>
                </div>

                {/* Time Slots */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="text-green-600" size={20} />
                    Reminder Times
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reminder.times.map((time, timeIndex) => (
                      <div key={timeIndex} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border">
                        <input
                          type="time"
                          value={time}
                          onChange={(e) => updateReminderTime(reminder.id, timeIndex, e.target.value)}
                          className="flex-1 bg-transparent border-none text-gray-900 font-medium focus:outline-none"
                        />
                        {reminder.times.length > 1 && (
                          <button
                            onClick={() => removeTimeSlot(reminder.id, timeIndex)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <button
                      onClick={() => addTimeSlot(reminder.id)}
                      className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-green-300 
                        text-green-600 hover:bg-green-50 rounded-xl transition-colors"
                    >
                      <Plus size={16} />
                      Add Time
                    </button>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Smartphone className="text-blue-600" size={20} />
                        <span className="font-medium text-gray-900">Push Notifications</span>
                      </div>
                      <Switch
                        checked={reminder.notifications.push}
                        onChange={(checked) => {
                          setReminders(prev => prev.map(r => 
                            r.id === reminder.id ? {
                              ...r,
                              notifications: { ...r.notifications, push: checked }
                            } : r
                          ));
                        }}
                        className={`${reminder.notifications.push ? 'bg-blue-600' : 'bg-gray-300'} 
                          relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                          transition-colors duration-200 ease-in-out focus:outline-none`}
                      >
                        <span
                          className={`${reminder.notifications.push ? 'translate-x-5' : 'translate-x-0'} 
                            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
                            transition duration-200 ease-in-out`}
                        />
                      </Switch>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Mail className="text-green-600" size={20} />
                        <span className="font-medium text-gray-900">Email Alerts</span>
                      </div>
                      <Switch
                        checked={reminder.notifications.email}
                        onChange={(checked) => {
                          setReminders(prev => prev.map(r => 
                            r.id === reminder.id ? {
                              ...r,
                              notifications: { ...r.notifications, email: checked }
                            } : r
                          ));
                        }}
                        className={`${reminder.notifications.email ? 'bg-green-600' : 'bg-gray-300'} 
                          relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                          transition-colors duration-200 ease-in-out focus:outline-none`}
                      >
                        <span
                          className={`${reminder.notifications.email ? 'translate-x-5' : 'translate-x-0'} 
                            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
                            transition duration-200 ease-in-out`}
                        />
                      </Switch>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200">
                      <div className="flex items-center gap-3">
                        <Volume2 className="text-red-600" size={20} />
                        <span className="font-medium text-gray-900">🔊 LOUD Sound</span>
                      </div>
                      <Switch
                        checked={reminder.notifications.sound}
                        onChange={(checked) => {
                          setReminders(prev => prev.map(r => 
                            r.id === reminder.id ? {
                              ...r,
                              notifications: { ...r.notifications, sound: checked }
                            } : r
                          ));
                        }}
                        className={`${reminder.notifications.sound ? 'bg-red-600' : 'bg-gray-300'} 
                          relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                          transition-colors duration-200 ease-in-out focus:outline-none`}
                      >
                        <span
                          className={`${reminder.notifications.sound ? 'translate-x-5' : 'translate-x-0'} 
                            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
                            transition duration-200 ease-in-out`}
                        />
                      </Switch>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={saveAllReminders}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 
                text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Save size={24} />
              Save LOUD Reminders
            </button>
          </motion.div>

          {/* Enhanced Instructions */}
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SetRemindersPage;
